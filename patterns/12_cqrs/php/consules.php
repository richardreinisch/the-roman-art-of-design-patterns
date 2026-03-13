<?php
/**
 * CQRS PATTERN — The Two Consuls
 * Run: php consules.php
 */
declare(strict_types=1);

class Legion {
    public function __construct(
        public string $id, public string $name,
        public string $province, public int $strength,
        public bool $active = true
    ) {}
}
class Event_ {
    public function __construct(
        public string $type, public string $legionId="",
        public string $name="", public string $province="", public int $strength=0
    ) {}
}
class WriteStore {
    public array $legions=[]; public array $events=[];
    public function apply(Event_ $e, ?Legion $l=null): void {
        $this->events[]=$e;
        if($e->type==="ENROLL"&&$l) $this->legions[$l->id]=$l;
        if($e->type==="DEPLOY"&&isset($this->legions[$e->legionId]))
            $this->legions[$e->legionId]->province=$e->province;
    }
}
class ReadStore {
    public array $views=[];
    public function project(Event_ $e, ?Legion $l=null): void {
        if($e->type==="ENROLL"&&$l) $this->views[$l->id]=$l;
        if($e->type==="DEPLOY"&&isset($this->views[$e->legionId]))
            $this->views[$e->legionId]->province=$e->province;
    }
    public function query(string $province=""): array {
        $all = array_filter($this->views, fn($l)=>$l->active);
        return $province ? array_filter($all,fn($l)=>$l->province===$province) : array_values($all);
    }
}
class CommandConsul {
    private int $id=0;
    public function __construct(private WriteStore $w, private ReadStore $r){}
    public function enroll(string $name, string $province, int $str): string {
        $lid="leg-".(++$this->id);
        $l=new Legion($lid,$name,$province,$str);
        $e=new Event_("ENROLL",$lid,$name,$province,$str);
        $this->w->apply($e,$l); $this->r->project($e,$l);
        echo "  ⚔  ENROLLED: {$name} [{$lid}]\n";
        return $lid;
    }
    public function deploy(string $lid, string $province): void {
        $e=new Event_("DEPLOY",$lid,"",$province);
        $this->w->apply($e); $this->r->project($e);
        echo "  ⚔  DEPLOYED: {$lid} → {$province}\n";
    }
}
class QueryConsul {
    public function __construct(private ReadStore $r){}
    public function listActive(string $province=""): void {
        $label = $province ?: "all provinces";
        echo "  📖 QUERY: Active legions in {$label}:\n";
        foreach ($this->r->query($province) as $l)
            echo "    🦅 {$l->name} [{$l->id}] in {$l->province} ({$l->strength} soldiers)\n";
    }
}

echo "╔═══════════════════════════════════════════════╗\n";
echo "║   CQRS PATTERN — PHP                          ║\n";
echo "║   The Two Consuls                             ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";
$ws=new WriteStore(); $rs=new ReadStore();
$cmd=new CommandConsul($ws,$rs); $query=new QueryConsul($rs);
echo "── COMMANDING CONSUL (Write Side) ──────────────\n";
$id1=$cmd->enroll("Legio I Germanica",   "Gallia",   5000);
$id2=$cmd->enroll("Legio X Gemina",      "Hispania", 4800);
$cmd->enroll("Legio XII Fulminata", "Gallia", 4200);
$cmd->deploy($id1,"Germania");
echo "\n── READING CONSUL (Query Side) ─────────────────\n";
$query->listActive();
echo "\n"; $query->listActive("Germania");
echo "\n\"Qui legit non scribit; qui scribit non legit!\"\n";

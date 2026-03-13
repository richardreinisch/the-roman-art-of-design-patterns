<?php
/**
 * MVC/MVCS PATTERN — The Roman Republic
 * Run: php res_publica.php
 */
declare(strict_types=1);

class Legion {
    public function __construct(
        public int $id, public string $name,
        public string $province, public int $strength
    ) {}
}
class LegionModel {
    private array $legions = []; private int $nextId = 1;
    public function add(string $n, int $s, string $p): Legion {
        $l = new Legion($this->nextId++, $n, $p, $s);
        $this->legions[$l->id] = $l; return $l;
    }
    public function getAll(): array { return array_values($this->legions); }
    public function getByProvince(string $p): array {
        return array_values(array_filter($this->legions, fn($l)=>$l->province===$p));
    }
    public function updateStrength(int $id, int $s): void {
        if (isset($this->legions[$id])) $this->legions[$id]->strength = $s;
    }
    public function totalStrength(): int {
        return array_sum(array_map(fn($l)=>$l->strength, $this->legions));
    }
}
class LegionView {
    public function renderList(array $legs): void {
        echo "\n  ╔══ IMPERIAL LEGION REGISTRY (SPQR) ══╗\n";
        foreach ($legs as $l)
            echo "  ║ [{$l->id}] {$l->name} | {$l->province} | {$l->strength} ║\n";
        echo "  ╚══════════════════════════════════════╝\n";
    }
    public function showMsg(string $m): void   { echo "  📢 {$m}\n"; }
    public function showStrength(int $n): void { echo "  ⚔  Total: " . number_format($n) . " soldiers\n"; }
}
class LegionService {
    public function __construct(private LegionModel $m) {}
    public function reinforce(string $province, int $troops): string {
        $legs = $this->m->getByProvince($province);
        if (!$legs) return "No legions in {$province}";
        $per = intdiv($troops, count($legs));
        foreach ($legs as $l) $this->m->updateStrength($l->id, $l->strength+$per);
        return "+{$troops} troops to ".count($legs)." legion(s) in {$province}";
    }
}
class LegionController {
    public function __construct(
        private LegionModel $m, private LegionView $v, private LegionService $s
    ) {}
    public function addLegion(string $n, int $s, string $p): void {
        $this->m->add($n,$s,$p); $this->v->showMsg("Legion '{$n}' enrolled");
        $this->v->renderList($this->m->getAll());
    }
    public function reinforce(string $p, int $count): void {
        $this->v->showMsg($this->s->reinforce($p,$count));
        $this->v->renderList($this->m->getAll());
    }
    public function showStrength(): void { $this->v->showStrength($this->m->totalStrength()); }
}

echo "╔═══════════════════════════════════════════════╗\n";
echo "║   MVC/MVCS PATTERN — PHP                      ║\n";
echo "║   The Roman Republic                          ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";
$m = new LegionModel(); $v = new LegionView(); $s = new LegionService($m);
$ctrl = new LegionController($m,$v,$s);
$ctrl->addLegion("Legio I Germanica",   5000, "Germania");
$ctrl->addLegion("Legio X Gemina",      4800, "Hispania");
$ctrl->addLegion("Legio XII Fulminata", 4200, "Germania");
echo "\n── REINFORCE GERMANIA ──────────────────────────\n";
$ctrl->reinforce("Germania", 3000);
$ctrl->showStrength();
echo "\n\"Divide et impera!\"\n";

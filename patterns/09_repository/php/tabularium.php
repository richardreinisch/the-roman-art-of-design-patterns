<?php
/**
 * REPOSITORY PATTERN — The Imperial Archive (Tabularium)
 * Run: php tabularium.php
 */
declare(strict_types=1);

class Centurion {
    public string $id;
    public function __construct(
        public string $name, public string $legion,
        public string $rank, public int $battlesWon
    ) { $this->id = substr(uniqid(), -6); }
}
interface ICenturionRepository {
    public function findById(string $id): ?Centurion;
    public function findByLegion(string $l): array;
    public function findAll(): array;
    public function save(Centurion $c): Centurion;
    public function delete(string $id): bool;
}
class InMemoryCenturionRepository implements ICenturionRepository {
    private array $store = [];
    public function findById(string $id): ?Centurion { return $this->store[$id] ?? null; }
    public function findByLegion(string $l): array {
        return array_values(array_filter($this->store, fn($c)=>$c->legion===$l));
    }
    public function findAll(): array { return array_values($this->store); }
    public function save(Centurion $c): Centurion {
        $this->store[$c->id] = $c;
        echo "  📚 Saved: {$c->name} ({$c->rank}) [{$c->id}]\n";
        return $c;
    }
    public function delete(string $id): bool {
        $e = isset($this->store[$id]); unset($this->store[$id]); return $e;
    }
}
class CenturionService {
    public function __construct(private ICenturionRepository $repo) {}
    public function promoteBest(string $legion): string {
        $all = $this->repo->findByLegion($legion);
        if (!$all) return "No centurions in {$legion}";
        usort($all, fn($a,$b)=>$b->battlesWon-$a->battlesWon);
        $best = $all[0]; $best->rank = "Primus Pilus";
        $this->repo->save($best);
        return "🎖  {$best->name} promoted to Primus Pilus! ({$best->battlesWon} battles)";
    }
}

echo "╔═══════════════════════════════════════════════╗\n";
echo "║   REPOSITORY PATTERN — PHP                    ║\n";
echo "║   The Imperial Archive (Tabularium)           ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";
$repo = new InMemoryCenturionRepository();
$repo->save(new Centurion("Marcus Aurelius",   "Legio X",  "Centurion", 15));
$repo->save(new Centurion("Gaius Petronius",   "Legio X",  "Centurion", 23));
$repo->save(new Centurion("Titus Labienus",    "Legio X",  "Centurion", 31));
$repo->save(new Centurion("Publius Quinctius", "Legio XII","Centurion",  7));
echo "\n── QUERY: All Legio X Centurions ───────────────\n";
foreach ($repo->findByLegion("Legio X") as $c)
    echo "  {$c->name} — {$c->battlesWon} battles\n";
echo "\n── SERVICE: Promote Best ────────────────────────\n";
echo "  " . (new CenturionService($repo))->promoteBest("Legio X") . "\n";
echo "\n\"Ubi data est? Tabularius scit!\"\n";

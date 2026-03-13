<?php
/**
 * STRATEGY PATTERN — Roman Battle Formations
 * Run: php ars_bellica.php
 */
declare(strict_types=1);

interface BattleStrategy {
    public function strategyName(): string;
    public function execute(array $s): string;
}
class Testudo implements BattleStrategy {
    public function strategyName(): string { return "TESTUDO (Tortoise)"; }
    public function execute(array $s): string {
        return "🐢 Shields locked! vs {$s['enemies']} on {$s['terrain']}. Casualties -60%!";
    }
}
class Cuneus implements BattleStrategy {
    public function strategyName(): string { return "CUNEUS (Wedge)"; }
    public function execute(array $s): string {
        return "🔺 CHARGE! Wedge pierces {$s['enemies']} on {$s['terrain']}!";
    }
}
class Orbis implements BattleStrategy {
    public function strategyName(): string { return "ORBIS (Circle)"; }
    public function execute(array $s): string {
        return "⭕ 360° defence! Morale {$s['morale']}/10. Holding!";
    }
}
class RomanLegion {
    public function __construct(private string $name, private BattleStrategy $strategy) {}
    public function setStrategy(BattleStrategy $s): void {
        echo "  ⚙  {$this->name}: {$this->strategy->strategyName()} → {$s->strategyName()}\n";
        $this->strategy = $s;
    }
    public function engage(array $s): void {
        echo "\n  🦅 {$this->name} [{$this->strategy->strategyName()}]\n";
        echo "     " . $this->strategy->execute($s) . "\n";
    }
}

echo "╔═══════════════════════════════════════════════╗\n";
echo "║   STRATEGY PATTERN — PHP                      ║\n";
echo "║   Roman Battle Formations                     ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";
$legion = new RomanLegion("Legio X Gemina", new Testudo());
$legion->engage(['enemies'=>500, 'terrain'=>'open field', 'morale'=>8]);
echo "\n── SCIPIO ADAPTS ────────────────────────────────\n";
$legion->setStrategy(new Cuneus());
$legion->engage(['enemies'=>200, 'terrain'=>'open field', 'morale'=>9]);
$legion->setStrategy(new Orbis());
$legion->engage(['enemies'=>5000, 'terrain'=>'valley', 'morale'=>4]);
echo "\n\"Non una via vincimus!\"\n";

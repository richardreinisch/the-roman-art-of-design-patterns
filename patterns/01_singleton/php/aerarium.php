<?php
/**
 * SINGLETON PATTERN — The Roman Treasury (Aerarium Saturni)
 * "Unus et idem" — One and the same
 *
 * Run: php aerarium.php
 */

declare(strict_types=1);

// ─── SINGLETON CLASS ─────────────────────────────────────────
final class AerariumSaturni
{
    private static ?self $instance = null;
    private int $goldReserves;

    // Private constructor — no rival emperors!
    private function __construct()
    {
        $this->goldReserves = 100_000;
        echo "🏛  Aerarium Saturni founded beneath the Temple of Saturn!\n";
        echo "    Initial reserves: " . number_format($this->goldReserves) . " aurei\n\n";
    }

    // Prevent cloning — duplicates are TREASON
    private function __clone() {}

    // Prevent unserialization — no summoning ghosts of the treasury!
    public function __wakeup(): void
    {
        throw new \RuntimeException("Cannot unserialize the sacred Aerarium!");
    }

    public static function getInstance(): static
    {
        if (static::$instance === null) {
            static::$instance = new static();
        }
        return static::$instance;
    }

    public function deposit(int $amount, string $citizen): void
    {
        $this->goldReserves += $amount;
        echo "  ✓ {$citizen} deposits " . number_format($amount) . " aurei. "
           . "Total: " . number_format($this->goldReserves) . "\n";
    }

    public function withdraw(int $amount, string $citizen): void
    {
        if ($amount > $this->goldReserves) {
            echo "  ✗ DENIED — Non est pecunia! {$citizen} requests "
               . number_format($amount) . " but only "
               . number_format($this->goldReserves) . " available!\n";
            return;
        }
        $this->goldReserves -= $amount;
        echo "  ✓ {$citizen} withdraws " . number_format($amount) . " aurei. "
           . "Remaining: " . number_format($this->goldReserves) . "\n";
    }

    public function getBalance(): int
    {
        return $this->goldReserves;
    }

    public function showStatus(): void
    {
        echo "\n  📊 AERARIUM STATUS: " . number_format($this->goldReserves) . " aurei secured\n";
    }
}


// ─── DEMONSTRATION ───────────────────────────────────────────
echo "╔═══════════════════════════════════════════════╗\n";
echo "║      SINGLETON PATTERN — PHP                  ║\n";
echo "║   The Roman Treasury (Aerarium Saturni)       ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";

// Multiple citizens try to access "their own" treasury...
$caesarsTreasury = AerariumSaturni::getInstance();
$cicerosTreasury = AerariumSaturni::getInstance();
$brutusTreasury  = AerariumSaturni::getInstance();

// Prove it's the same instance
echo "Are all references the same instance?\n";
echo "  Caesar  === Cicero: " . ($caesarsTreasury === $cicerosTreasury ? "YES ✓" : "NO") . "\n";
echo "  Cicero  === Brutus: " . ($cicerosTreasury === $brutusTreasury  ? "YES ✓" : "NO") . "\n";
echo "  (Same spl_object_id: " . spl_object_id($caesarsTreasury) . ")\n\n";

// All transactions go to the SAME vault
echo "── TRANSACTIONS ────────────────────────────────\n";
$caesarsTreasury->deposit(50_000, "Caesar (war spoils from Gaul)");
$cicerosTreasury->deposit(10_000, "Cicero (legal fees)");
$cicerosTreasury->withdraw(30_000, "Cicero (bribed a juror)");
$brutusTreasury->withdraw(5_000,  "Brutus (bought a new dagger)");
$brutusTreasury->withdraw(200_000, "Brutus (tried to steal it all)"); // will fail

$caesarsTreasury->showStatus();

echo "\n── KEY INSIGHT ─────────────────────────────────\n";
echo "All three 'different' treasuries share the same\n";
echo "balance because they ARE the same object.\n";
echo "\"Unum tesaurum habemus!\" — We have ONE treasury!\n";

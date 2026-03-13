<?php
/**
 * DECORATOR PATTERN — The Triumphator's Dressing Room
 * "Miles ornatur, non mutatur" — The soldier is adorned, not changed
 *
 * Run: php triumphator.php
 */

declare(strict_types=1);

// ─── COMPONENT INTERFACE ─────────────────────────────────────
interface Soldier
{
    public function describe():    string;
    public function combatPower(): int;
    public function status():      string;
}

// ─── CONCRETE COMPONENT ──────────────────────────────────────
class BareSoldier implements Soldier
{
    public function describe():    string { return "👤 Tiro (Recruit) — tunica, caligae sandals"; }
    public function combatPower(): int    { return 5; }
    public function status():      string { return "Recruit"; }
}

// ─── BASE DECORATOR ──────────────────────────────────────────
abstract class SoldierDecorator implements Soldier
{
    public function __construct(protected Soldier $soldier) {}
    public function describe():    string { return $this->soldier->describe(); }
    public function combatPower(): int    { return $this->soldier->combatPower(); }
    public function status():      string { return $this->soldier->status(); }
}

// ─── CONCRETE DECORATORS ─────────────────────────────────────
class LoricaSegmentata extends SoldierDecorator
{
    public function describe(): string {
        return $this->soldier->describe() . "\n              + 🛡  Lorica Segmentata (plate armour)";
    }
    public function combatPower(): int    { return $this->soldier->combatPower() + 30; }
    public function status():      string { return "Armoured " . $this->soldier->status(); }
}

class GallicHelmet extends SoldierDecorator
{
    public function describe(): string {
        return $this->soldier->describe() . "\n              + ⛑  Galic Helmet (bronze, cheek guards)";
    }
    public function combatPower(): int { return $this->soldier->combatPower() + 15; }
}

class PaludamentumCloak extends SoldierDecorator
{
    public function describe(): string {
        return $this->soldier->describe() . "\n              + 🟥 Paludamentum (general's red cloak)";
    }
    public function combatPower(): int    { return $this->soldier->combatPower() + 20; }
    public function status():      string { return "General " . $this->soldier->status(); }
}

class LaurelWreath extends SoldierDecorator
{
    public function describe(): string {
        return $this->soldier->describe() . "\n              + 🌿 LAUREL WREATH OF TRIUMPH!";
    }
    public function combatPower(): int    { return $this->soldier->combatPower() + 50; }
    public function status():      string { return "TRIUMPHATOR"; }
    public function shout():       string { return "IO TRIUMPHE! IO TRIUMPHE! IO TRIUMPHE!"; }
}

// ─── HELPER ──────────────────────────────────────────────────
function showSoldier(Soldier $s): void
{
    echo "  Status : " . $s->status()      . "\n";
    echo "  Outfit : " . $s->describe()    . "\n";
    echo "  Power  : " . $s->combatPower() . " points\n";
}


// ─── DEMONSTRATION ───────────────────────────────────────────
echo "╔═══════════════════════════════════════════════╗\n";
echo "║   DECORATOR PATTERN — PHP                     ║\n";
echo "║   The Triumphator's Dressing Room             ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";

echo "── STEP 1: The Bare Recruit ────────────────────\n";
$soldier = new BareSoldier();
showSoldier($soldier);

echo "\n── STEP 2: Add Lorica Segmentata ───────────────\n";
$soldier = new LoricaSegmentata($soldier);
showSoldier($soldier);

echo "\n── STEP 3: Add Gallic Helmet ───────────────────\n";
$soldier = new GallicHelmet($soldier);
showSoldier($soldier);

echo "\n── STEP 4: Promotion — Add General's Cloak ────\n";
$soldier = new PaludamentumCloak($soldier);
showSoldier($soldier);

echo "\n── STEP 5: TRIUMPH! ────────────────────────────\n";
$triumphator = new LaurelWreath($soldier);
showSoldier($triumphator);
echo "\n  🎺 " . $triumphator->shout() . "\n";

echo "\n── KEY INSIGHT ─────────────────────────────────\n";
echo "At every step the type remains Soldier (interface).\n";
echo "We WRAPPED it without modifying the original class.\n";
echo "\"Miles ornatur, non mutatur!\"\n";

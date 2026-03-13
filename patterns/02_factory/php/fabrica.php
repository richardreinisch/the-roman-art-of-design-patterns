<?php
/**
 * FACTORY METHOD PATTERN — Imperial Weaponry Workshop
 * "Fabrica dat, miles accipit" — The factory gives, the soldier receives
 *
 * Run: php fabrica.php
 */

declare(strict_types=1);

// ─── PRODUCT INTERFACE ───────────────────────────────────────
interface Weapon
{
    public function describe(): string;
    public function attack():   string;
    public function damage():   int;
}

// ─── CONCRETE PRODUCTS ───────────────────────────────────────
class Gladius implements Weapon
{
    public function describe(): string { return "⚔  Gladius — short stabbing sword, 60cm blade"; }
    public function attack():   string { return "STAB forward! Enemy pierced through the shield gap!"; }
    public function damage():   int    { return 45; }
}

class Pilum implements Weapon
{
    public function describe(): string { return "🏹 Pilum — heavy javelin with soft iron shank"; }
    public function attack():   string { return "THROW! Iron bends on impact — enemy shield useless!"; }
    public function damage():   int    { return 60; }
}

class Ballista implements Weapon
{
    public function describe(): string { return "💥 Ballista — torsion siege weapon, 2-talent bolts"; }
    public function attack():   string { return "FIRE! Bolt penetrates 3 ranks of soldiers!"; }
    public function damage():   int    { return 150; }
}

class Scutum implements Weapon
{
    public function describe(): string { return "🛡  Scutum — curved rectangular legionary shield"; }
    public function attack():   string { return "PUSH! Shield bash breaks enemy formation!"; }
    public function damage():   int    { return 20; }
}

// ─── CREATOR (FACTORY) BASE CLASS ────────────────────────────
abstract class WeaponFactory
{
    // The factory method — subclasses override this
    abstract public function createWeapon(): Weapon;

    // Template method using the factory method
    public function armSoldier(): void
    {
        $weapon = $this->createWeapon();
        echo "  Weapon issued : " . $weapon->describe() . "\n";
        echo "  Combat result : " . $weapon->attack()   . "\n";
        echo "  Damage rating : " . $weapon->damage()   . " points\n";
    }
}

// ─── CONCRETE CREATORS ───────────────────────────────────────
class InfantryFactory extends WeaponFactory
{
    public function createWeapon(): Weapon { return new Gladius(); }
}

class ArcherFactory extends WeaponFactory
{
    public function createWeapon(): Weapon { return new Pilum(); }
}

class SiegeFactory extends WeaponFactory
{
    public function createWeapon(): Weapon { return new Ballista(); }
}

class ShieldBearerFactory extends WeaponFactory
{
    public function createWeapon(): Weapon { return new Scutum(); }
}

// ─── CLIENT FUNCTION ─────────────────────────────────────────
function equipUnit(string $unitName, WeaponFactory $factory): void
{
    echo "\n[{$unitName}]\n";
    $factory->armSoldier();
}


// ─── DEMONSTRATION ───────────────────────────────────────────
echo "╔═══════════════════════════════════════════════╗\n";
echo "║   FACTORY METHOD PATTERN — PHP                ║\n";
echo "║   Imperial Weaponry Workshop, Carnuntum       ║\n";
echo "╚═══════════════════════════════════════════════╝\n";
echo "\n📋 IMPERIAL FABRICATION ORDER — LEGIO X GEMINA\n";
echo "────────────────────────────────────────────────\n";

equipUnit("1st Infantry Cohort", new InfantryFactory());
equipUnit("Archer Auxilia",      new ArcherFactory());
equipUnit("Siege Engineering",   new SiegeFactory());
equipUnit("Testudo Shield Wall", new ShieldBearerFactory());

echo "\n────────────────────────────────────────────────\n";
echo "KEY INSIGHT: equipUnit() calls armSoldier()\n";
echo "without knowing Gladius, Pilum, or Ballista exists.\n";
echo "The factory decides. Completely decoupled!\n";
echo "\"Fabrica dat, miles accipit!\"\n";

// BONUS: Dynamic factory selection
echo "\n── BONUS: Dynamic Factory via Registry ─────────\n";
$registry = [
    'infantry' => new InfantryFactory(),
    'archers'  => new ArcherFactory(),
    'siege'    => new SiegeFactory(),
];

$order = ['siege', 'infantry', 'archers'];
foreach ($order as $type) {
    $weapon = $registry[$type]->createWeapon();
    echo "  {$type}: " . $weapon->describe() . " | DMG: " . $weapon->damage() . "\n";
}

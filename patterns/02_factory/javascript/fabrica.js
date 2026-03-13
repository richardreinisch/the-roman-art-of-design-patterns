// ============================================================
//  FACTORY METHOD — Imperial Weaponry Workshop
//  Run: node fabrica.js
// ============================================================

class Gladius  { describe(){ return "⚔  Gladius — short stabbing sword, 60cm blade"; } attack(){ return "STAB forward!"; } damage(){ return 45; } }
class Pilum    { describe(){ return "🏹 Pilum — heavy javelin with soft iron shank";  } attack(){ return "THROW! Iron bends on impact!"; } damage(){ return 60; } }
class Ballista { describe(){ return "💥 Ballista — torsion siege weapon";              } attack(){ return "FIRE! Bolt penetrates 3 ranks!"; } damage(){ return 150; } }
class Scutum   { describe(){ return "🛡  Scutum — curved rectangular legionary shield"; } attack(){ return "PUSH! Shield bash!"; } damage(){ return 20; } }

class WeaponFactory {
  createWeapon() { throw new Error("Override createWeapon()"); }
  armSoldier() {
    const w = this.createWeapon();
    console.log(`  Weapon issued : ${w.describe()}`);
    console.log(`  Combat result : ${w.attack()}`);
    console.log(`  Damage rating : ${w.damage()} points`);
  }
}
class InfantryFactory     extends WeaponFactory { createWeapon() { return new Gladius();  } }
class ArcherFactory       extends WeaponFactory { createWeapon() { return new Pilum();    } }
class SiegeFactory        extends WeaponFactory { createWeapon() { return new Ballista(); } }
class ShieldBearerFactory extends WeaponFactory { createWeapon() { return new Scutum();   } }

function equipUnit(unitName, factory) {
  console.log(`\n[${unitName}]`);
  factory.armSoldier();
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   FACTORY METHOD PATTERN — JavaScript         ║");
console.log("╚═══════════════════════════════════════════════╝");
console.log("\n📋 IMPERIAL FABRICATION ORDER");
console.log("────────────────────────────────────────────────");
equipUnit("1st Infantry Cohort",  new InfantryFactory());
equipUnit("Archer Auxilia",       new ArcherFactory());
equipUnit("Siege Engineering",    new SiegeFactory());
equipUnit("Testudo Shield Wall",  new ShieldBearerFactory());
console.log('\n"Fabrica dat, miles accipit!"');

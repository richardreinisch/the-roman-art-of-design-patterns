// ============================================================
//  FACTORY METHOD — Imperial Weaponry Workshop
//  Run: npx ts-node fabrica.ts
// ============================================================

interface Weapon {
  describe(): string;
  attack():   string;
  damage():   number;
}

class Gladius  implements Weapon {
  describe() { return "⚔  Gladius — short stabbing sword, 60cm blade"; }
  attack()   { return "STAB forward! Enemy pierced through the shield gap!"; }
  damage()   { return 45; }
}
class Pilum    implements Weapon {
  describe() { return "🏹 Pilum — heavy javelin with soft iron shank"; }
  attack()   { return "THROW! Iron bends on impact — enemy shield useless!"; }
  damage()   { return 60; }
}
class Ballista implements Weapon {
  describe() { return "💥 Ballista — torsion siege weapon, 2-talent bolts"; }
  attack()   { return "FIRE! Bolt penetrates 3 ranks of soldiers!"; }
  damage()   { return 150; }
}
class Scutum   implements Weapon {
  describe() { return "🛡  Scutum — curved rectangular legionary shield"; }
  attack()   { return "PUSH! Shield bash breaks enemy formation!"; }
  damage()   { return 20; }
}

abstract class WeaponFactory {
  abstract createWeapon(): Weapon;

  armSoldier(): void {
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

function equipUnit(unitName: string, factory: WeaponFactory): void {
  console.log(`\n[${unitName}]`);
  factory.armSoldier();
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   FACTORY METHOD PATTERN — TypeScript         ║");
console.log("║   Imperial Weaponry Workshop, Carnuntum       ║");
console.log("╚═══════════════════════════════════════════════╝");
console.log("\n📋 IMPERIAL FABRICATION ORDER — LEGIO X GEMINA");
console.log("────────────────────────────────────────────────");

equipUnit("1st Infantry Cohort",  new InfantryFactory());
equipUnit("Archer Auxilia",       new ArcherFactory());
equipUnit("Siege Engineering",    new SiegeFactory());
equipUnit("Testudo Shield Wall",  new ShieldBearerFactory());

console.log('\n"Fabrica dat, miles accipit!"');

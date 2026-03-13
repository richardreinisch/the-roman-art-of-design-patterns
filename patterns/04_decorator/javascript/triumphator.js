// ============================================================
//  DECORATOR PATTERN — The Triumphator's Dressing Room
//  Run: node triumphator.js
// ============================================================

class BareSoldier {
  describe()    { return "👤 Tiro (Recruit) — tunica, caligae sandals"; }
  combatPower() { return 5; }
  status()      { return "Recruit"; }
}
class SoldierDecorator {
  constructor(soldier) { this.soldier = soldier; }
  describe()    { return this.soldier.describe(); }
  combatPower() { return this.soldier.combatPower(); }
  status()      { return this.soldier.status(); }
}
class LoricaSegmentata extends SoldierDecorator {
  describe()    { return this.soldier.describe() + "\n              + 🛡  Lorica Segmentata"; }
  combatPower() { return this.soldier.combatPower() + 30; }
  status()      { return `Armoured ${this.soldier.status()}`; }
}
class GallicHelmet extends SoldierDecorator {
  describe()    { return this.soldier.describe() + "\n              + ⛑  Gallic Helmet"; }
  combatPower() { return this.soldier.combatPower() + 15; }
}
class PaludamentumCloak extends SoldierDecorator {
  describe()    { return this.soldier.describe() + "\n              + 🟥 Paludamentum Cloak"; }
  combatPower() { return this.soldier.combatPower() + 20; }
  status()      { return `General ${this.soldier.status()}`; }
}
class LaurelWreath extends SoldierDecorator {
  describe()    { return this.soldier.describe() + "\n              + 🌿 LAUREL WREATH OF TRIUMPH!"; }
  combatPower() { return this.soldier.combatPower() + 50; }
  status()      { return "TRIUMPHATOR"; }
  shout()       { return "IO TRIUMPHE! IO TRIUMPHE! IO TRIUMPHE!"; }
}

const show = s => {
  console.log(`  Status : ${s.status()}`);
  console.log(`  Outfit : ${s.describe()}`);
  console.log(`  Power  : ${s.combatPower()} points`);
};

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   DECORATOR PATTERN — JavaScript              ║");
console.log("╚═══════════════════════════════════════════════╝\n");

let s = new BareSoldier();
console.log("── STEP 1:"); show(s);
s = new LoricaSegmentata(s);
console.log("\n── STEP 2: + Lorica"); show(s);
s = new GallicHelmet(s);
console.log("\n── STEP 3: + Helmet"); show(s);
s = new PaludamentumCloak(s);
console.log("\n── STEP 4: + General's Cloak"); show(s);
const t = new LaurelWreath(s);
console.log("\n── STEP 5: TRIUMPH!"); show(t);
console.log(`\n  🎺 ${t.shout()}`);
console.log('\n"Miles ornatur, non mutatur!"');

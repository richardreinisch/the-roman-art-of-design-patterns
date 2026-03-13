// ============================================================
//  STRATEGY PATTERN — Roman Battle Formations
//  Run: npx ts-node ars_bellica.ts
// ============================================================

interface Battle { enemies: number; terrain: string; morale: number; }

interface BattleStrategy {
  strategyName(): string;
  execute(b: Battle): string;
}

class Testudo     implements BattleStrategy {
  strategyName() { return "TESTUDO (Tortoise)"; }
  execute(b: Battle) { return `🐢 Shields locked! vs ${b.enemies} on ${b.terrain}. Casualties -60%!`; }
}
class Cuneus      implements BattleStrategy {
  strategyName() { return "CUNEUS (Wedge)"; }
  execute(b: Battle) { return `🔺 CHARGE! Wedge pierces ${b.enemies} on ${b.terrain}!`; }
}
class Orbis       implements BattleStrategy {
  strategyName() { return "ORBIS (Circle)"; }
  execute(b: Battle) { return `⭕ 360° defence! Morale ${b.morale}/10. Holding!`; }
}
class FugaTactica implements BattleStrategy {
  strategyName() { return "FUGA TACTICA"; }
  execute(b: Battle) { return `🏃 Tactical retreat from ${b.enemies} enemies!`; }
}

class RomanLegion {
  constructor(private name: string, private strategy: BattleStrategy) {}
  setStrategy(s: BattleStrategy) {
    console.log(`  ⚙  ${this.name}: ${this.strategy.strategyName()} → ${s.strategyName()}`);
    this.strategy = s;
  }
  engage(b: Battle) {
    console.log(`\n  🦅 ${this.name} [${this.strategy.strategyName()}]`);
    console.log(`     ${this.strategy.execute(b)}`);
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   STRATEGY PATTERN — TypeScript               ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const legion = new RomanLegion("Legio X Gemina", new Testudo());
legion.engage({ enemies: 500,   terrain: "open field",         morale: 8 });
console.log("\n── SCIPIO ADAPTS ────────────────────────────────");
legion.setStrategy(new Cuneus());
legion.engage({ enemies: 200,   terrain: "open field",         morale: 9 });
legion.setStrategy(new Orbis());
legion.engage({ enemies: 5000,  terrain: "surrounded valley",  morale: 4 });
legion.setStrategy(new FugaTactica());
legion.engage({ enemies: 10000, terrain: "ambush",             morale: 2 });
console.log('\n"Non una via vincimus!"');

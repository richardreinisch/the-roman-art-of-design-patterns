// ============================================================
//  STRATEGY PATTERN — Roman Battle Formations
//  Run: node ars_bellica.js
// ============================================================

class Testudo     { strategyName(){ return "TESTUDO (Tortoise)"; }  execute(b){ return `🐢 Shields locked! vs ${b.enemies} on ${b.terrain}. -60% casualties!`; } }
class Cuneus      { strategyName(){ return "CUNEUS (Wedge)";     }  execute(b){ return `🔺 CHARGE! Wedge pierces ${b.enemies} on ${b.terrain}!`; } }
class Orbis       { strategyName(){ return "ORBIS (Circle)";     }  execute(b){ return `⭕ 360° defence! Morale ${b.morale}/10.`; } }
class FugaTactica { strategyName(){ return "FUGA TACTICA";       }  execute(b){ return `🏃 Retreat from ${b.enemies} enemies!`; } }

class RomanLegion {
  constructor(name, strategy) { this.name = name; this.strategy = strategy; }
  setStrategy(s) {
    console.log(`  ⚙  ${this.name}: ${this.strategy.strategyName()} → ${s.strategyName()}`);
    this.strategy = s;
  }
  engage(b) {
    console.log(`\n  🦅 ${this.name} [${this.strategy.strategyName()}]`);
    console.log(`     ${this.strategy.execute(b)}`);
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   STRATEGY PATTERN — JavaScript               ║");
console.log("╚═══════════════════════════════════════════════╝\n");
const legion = new RomanLegion("Legio X Gemina", new Testudo());
legion.engage({ enemies: 500,  terrain: "open field", morale: 8 });
console.log("\n── SCIPIO ADAPTS ────────────────────────────────");
legion.setStrategy(new Cuneus());  legion.engage({ enemies: 200, terrain: "open field", morale: 9 });
legion.setStrategy(new Orbis());   legion.engage({ enemies: 5000, terrain: "valley", morale: 4 });
legion.setStrategy(new FugaTactica()); legion.engage({ enemies: 10000, terrain: "ambush", morale: 2 });
console.log('\n"Non una via vincimus!"');

// ============================================================
//  SINGLETON PATTERN — The Roman Treasury (Aerarium Saturni)
//  "Unus et idem" — One and the same
//
//  Run: node aerarium.js
// ============================================================

class AerariumSaturni {
  static #instance = null;
  #goldReserves;

  constructor() {
    if (AerariumSaturni.#instance) {
      throw new Error("TREASON! Use AerariumSaturni.getInstance() — duplicates forbidden!");
    }
    this.#goldReserves = 100_000;
    console.log("🏛  Aerarium Saturni founded beneath the Temple of Saturn!");
    console.log(`    Initial reserves: ${this.#goldReserves.toLocaleString()} aurei\n`);
  }

  static getInstance() {
    if (!AerariumSaturni.#instance) {
      AerariumSaturni.#instance = new AerariumSaturni();
    }
    return AerariumSaturni.#instance;
  }

  deposit(amount, citizen) {
    this.#goldReserves += amount;
    console.log(`  ✓ ${citizen} deposits ${amount.toLocaleString()} aurei. Total: ${this.#goldReserves.toLocaleString()}`);
  }

  withdraw(amount, citizen) {
    if (amount > this.#goldReserves) {
      console.log(`  ✗ DENIED — Non est pecunia! ${citizen} requests ${amount.toLocaleString()} but only ${this.#goldReserves.toLocaleString()} available!`);
      return;
    }
    this.#goldReserves -= amount;
    console.log(`  ✓ ${citizen} withdraws ${amount.toLocaleString()} aurei. Remaining: ${this.#goldReserves.toLocaleString()}`);
  }

  showStatus() {
    console.log(`\n  📊 AERARIUM STATUS: ${this.#goldReserves.toLocaleString()} aurei secured`);
  }
}

// ─── DEMONSTRATION ────────────────────────────────────────
console.log("╔═══════════════════════════════════════════════╗");
console.log("║      SINGLETON PATTERN — JavaScript           ║");
console.log("║   The Roman Treasury (Aerarium Saturni)       ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const caesarsTreasury  = AerariumSaturni.getInstance();
const cicerosTreasury  = AerariumSaturni.getInstance();
const brutusTreasury   = AerariumSaturni.getInstance();

console.log("Are all references the same instance?");
console.log(`  Caesar  === Cicero: ${caesarsTreasury === cicerosTreasury ? "YES ✓" : "NO"}`);
console.log(`  Cicero  === Brutus: ${cicerosTreasury === brutusTreasury  ? "YES ✓" : "NO"}\n`);

console.log("── TRANSACTIONS ────────────────────────────────");
caesarsTreasury.deposit(50_000, "Caesar (war spoils from Gaul)");
cicerosTreasury.deposit(10_000, "Cicero (legal fees)");
cicerosTreasury.withdraw(30_000, "Cicero (bribed a juror)");
brutusTreasury.withdraw(5_000,  "Brutus (bought a new dagger)");
brutusTreasury.withdraw(200_000, "Brutus (tried to steal it all)");

caesarsTreasury.showStatus();
console.log('\n"Unum tesaurum habemus!" — We have ONE treasury!');

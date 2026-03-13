// ============================================================
//  SINGLETON PATTERN — The Roman Treasury (Aerarium Saturni)
//  "Unus et idem" — One and the same
//
//  Run: npx ts-node aerarium.ts
//   Or: tsc aerarium.ts && node aerarium.js
// ============================================================

class AerariumSaturni {
  private static instance: AerariumSaturni | null = null;
  private goldReserves: number;

  private constructor() {
    this.goldReserves = 100_000;
    console.log("🏛  Aerarium Saturni founded beneath the Temple of Saturn!");
    console.log(`    Initial reserves: ${this.goldReserves.toLocaleString()} aurei\n`);
  }

  // No copy / clone — only getInstance()
  public static getInstance(): AerariumSaturni {
    if (!AerariumSaturni.instance) {
      AerariumSaturni.instance = new AerariumSaturni();
    }
    return AerariumSaturni.instance;
  }

  public deposit(amount: number, citizen: string): void {
    this.goldReserves += amount;
    console.log(`  ✓ ${citizen} deposits ${amount.toLocaleString()} aurei. Total: ${this.goldReserves.toLocaleString()}`);
  }

  public withdraw(amount: number, citizen: string): void {
    if (amount > this.goldReserves) {
      console.log(`  ✗ DENIED — Non est pecunia! ${citizen} requests ${amount.toLocaleString()} but only ${this.goldReserves.toLocaleString()} available!`);
      return;
    }
    this.goldReserves -= amount;
    console.log(`  ✓ ${citizen} withdraws ${amount.toLocaleString()} aurei. Remaining: ${this.goldReserves.toLocaleString()}`);
  }

  public showStatus(): void {
    console.log(`\n  📊 AERARIUM STATUS: ${this.goldReserves.toLocaleString()} aurei secured`);
  }
}

// ─── DEMONSTRATION ────────────────────────────────────────
console.log("╔═══════════════════════════════════════════════╗");
console.log("║      SINGLETON PATTERN — TypeScript           ║");
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

// ============================================================
//  ADAPTER PATTERN — The Roman Interpreter
//  Run: npx ts-node interpres.ts
// ============================================================

// Adaptee
class BarbarianPaymentSystem {
  private torcs = 500;
  payInCelticCoins(goldTorcs: number): string {
    if (goldTorcs > this.torcs) throw new Error("Non satis torc!");
    this.torcs -= goldTorcs;
    return `Celtic transfer: ${goldTorcs.toFixed(2)} gold torcs sent`;
  }
  getExchangeRate(): number { return 3.7; }
  getTorcBalance():  number { return this.torcs; }
}

// Target interface
interface RomanPaymentInterface {
  payInDenarii(denarii: number, payer: string): string;
  getBalance(): number;
}

// Adapter
class BarbarianToRomanAdapter implements RomanPaymentInterface {
  private balance = 5000;
  constructor(private barbarian: BarbarianPaymentSystem) {}
  payInDenarii(denarii: number, payer: string): string {
    const torcs  = denarii / this.barbarian.getExchangeRate();
    const result = this.barbarian.payInCelticCoins(torcs);
    this.balance -= denarii;
    return `[ADAPTER] ${payer} pays ${denarii} den → ${torcs.toFixed(2)} torcs | ${result}`;
  }
  getBalance(): number { return this.balance; }
}

function romanTransaction(p: RomanPaymentInterface, payer: string, amount: number): void {
  console.log(p.payInDenarii(amount, payer));
  console.log(`  Balance: ${p.getBalance()} denarii`);
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   ADAPTER PATTERN — TypeScript                ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const bank    = new BarbarianPaymentSystem();
const adapter = new BarbarianToRomanAdapter(bank);

console.log("── ROMAN MERCHANT USING ADAPTER ────────────────");
romanTransaction(adapter, "Marcus Aurelius", 370);
romanTransaction(adapter, "Gaius Petronius", 185);
console.log(`\nCeltic torcs remaining: ${bank.getTorcBalance().toFixed(2)}`);
console.log('"Interpres pontem verborum aedificat!"');

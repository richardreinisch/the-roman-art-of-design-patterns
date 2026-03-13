// ============================================================
//  ADAPTER PATTERN — The Roman Interpreter
//  Run: node interpres.js
// ============================================================

class BarbarianPaymentSystem {
  constructor() { this.torcs = 500; }
  payInCelticCoins(goldTorcs) {
    if (goldTorcs > this.torcs) throw new Error("Non satis torc!");
    this.torcs -= goldTorcs;
    return `Celtic transfer: ${goldTorcs.toFixed(2)} gold torcs sent`;
  }
  getExchangeRate() { return 3.7; }
  getTorcBalance()  { return this.torcs; }
}

class BarbarianToRomanAdapter {
  #balance = 5000;
  constructor(barbarian) { this.barbarian = barbarian; }
  payInDenarii(denarii, payer) {
    const torcs  = denarii / this.barbarian.getExchangeRate();
    const result = this.barbarian.payInCelticCoins(torcs);
    this.#balance -= denarii;
    return `[ADAPTER] ${payer} pays ${denarii} den → ${torcs.toFixed(2)} torcs | ${result}`;
  }
  getBalance() { return this.#balance; }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   ADAPTER PATTERN — JavaScript                ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const bank    = new BarbarianPaymentSystem();
const adapter = new BarbarianToRomanAdapter(bank);

console.log(adapter.payInDenarii(370, "Marcus Aurelius"));
console.log(`  Balance: ${adapter.getBalance()} denarii`);
console.log(adapter.payInDenarii(185, "Gaius Petronius"));
console.log(`  Balance: ${adapter.getBalance()} denarii`);
console.log(`\nCeltic torcs remaining: ${bank.getTorcBalance().toFixed(2)}`);
console.log('"Interpres pontem verborum aedificat!"');

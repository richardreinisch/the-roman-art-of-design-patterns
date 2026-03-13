// ============================================================
//  DEPENDENCY INJECTION — The Praetorian Quartermaster
//  Run: node officium.js
// ============================================================

class ScrollMessenger { send(to, msg) { console.log(`  📜 Scroll to ${to}: '${msg}'`); } }
class MockMessenger {
  constructor() { this.sent = []; }
  send(to, msg) { this.sent.push([to, msg]); console.log(`  🧪 MOCK: to=${to} msg='${msg}'`); }
}
class ConsoleLogger { log(e) { console.log(`  [LOG] ${e}`); } }

class MilitaryCampaign {
  constructor(messenger, logger) { this.messenger = messenger; this.logger = logger; }
  launchAttack(target) {
    this.logger.log(`Campaign against ${target}`);
    this.messenger.send("Praetorian Guard", `ADVANCE on ${target}!`);
    this.messenger.send("Supply Corps",     `Provisions to ${target}`);
    this.logger.log("Orders dispatched");
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   DEPENDENCY INJECTION — JavaScript           ║");
console.log("╚═══════════════════════════════════════════════╝\n");

console.log("── PRODUCTION ───────────────────────────────────");
new MilitaryCampaign(new ScrollMessenger(), new ConsoleLogger()).launchAttack("Gaul");

console.log("\n── TESTING (mock) ───────────────────────────────");
const mock = new MockMessenger();
new MilitaryCampaign(mock, new ConsoleLogger()).launchAttack("Britannia");
console.log(`  Mock captured: ${mock.sent.length} messages ✓`);
console.log('\n"Non ipse quaerit, accipit!"');

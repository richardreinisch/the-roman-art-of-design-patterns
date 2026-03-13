// ============================================================
//  DEPENDENCY INJECTION — The Praetorian Quartermaster
//  Run: npx ts-node officium.ts
// ============================================================

interface IMessenger { send(to: string, msg: string): void; }
interface ILogger    { log(event: string): void; }

class ScrollMessenger implements IMessenger {
  send(to: string, msg: string) { console.log(`  📜 Scroll to ${to}: '${msg}'`); }
}
class MockMessenger implements IMessenger {
  sent: Array<[string, string]> = [];
  send(to: string, msg: string) {
    this.sent.push([to, msg]);
    console.log(`  🧪 MOCK: to=${to} msg='${msg}'`);
  }
}
class ConsoleLogger implements ILogger {
  log(event: string) { console.log(`  [LOG] ${event}`); }
}

class MilitaryCampaign {
  constructor(private messenger: IMessenger, private logger: ILogger) {}
  launchAttack(target: string): void {
    this.logger.log(`Campaign launched against ${target}`);
    this.messenger.send("Praetorian Guard", `ADVANCE on ${target}!`);
    this.messenger.send("Supply Corps",     `Provisions to ${target}`);
    this.logger.log("Orders dispatched");
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   DEPENDENCY INJECTION — TypeScript           ║");
console.log("╚═══════════════════════════════════════════════╝\n");

console.log("── PRODUCTION ───────────────────────────────────");
new MilitaryCampaign(new ScrollMessenger(), new ConsoleLogger()).launchAttack("Gaul");

console.log("\n── TESTING (mock) ───────────────────────────────");
const mock = new MockMessenger();
new MilitaryCampaign(mock, new ConsoleLogger()).launchAttack("Britannia");
console.log(`  Mock captured: ${mock.sent.length} messages ✓`);
console.log('\n"Non ipse quaerit, accipit!"');

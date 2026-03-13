// ============================================================
//  OBSERVER PATTERN — Roman Fire-Signal Network
//  Run: npx ts-node speculae.ts  OR  tsc && node speculae.js
// ============================================================

interface SignalObserver {
  onSignal(message: string, urgency: number): void;
  observerName: string;
}

class RomanLegate implements SignalObserver {
  observerName: string;
  private legion: string;
  constructor(name: string, legion: string) { this.observerName = name; this.legion = legion; }
  onSignal(msg: string, urgency: number): void {
    if      (urgency >= 4) console.log(`  ⚔  LEGATE ${this.observerName} (${this.legion}): FULL MOBILIZATION! '${msg}'`);
    else if (urgency >= 2) console.log(`  📜 LEGATE ${this.observerName}: Prepare forces. '${msg}'`);
    else                   console.log(`  📜 LEGATE ${this.observerName}: Noted. '${msg}'`);
  }
}

class EmperorInRome implements SignalObserver {
  observerName = "Emperor Hadrian";
  onSignal(msg: string, urgency: number): void {
    if      (urgency >= 5) console.log(`  👑 EMPEROR: BY JUPITER! '${msg}'`);
    else if (urgency >= 3) console.log(`  👑 EMPEROR: Dispatch legions. '${msg}'`);
    else                   console.log(`  👑 EMPEROR: Send a letter. '${msg}'`);
  }
}

class ChroniclerAnnales implements SignalObserver {
  observerName = "Chronicler Annales";
  private _count = 0;
  get count() { return this._count; }
  onSignal(msg: string, urgency: number): void {
    console.log(`  📖 CHRONICLER [#${++this._count}]: '${msg}' (urgency=${urgency})`);
  }
}

class SignalTower {
  private observers: SignalObserver[] = [];
  constructor(private location: string) {}
  subscribe(o: SignalObserver): void   { this.observers.push(o); console.log(`  + ${o.observerName} subscribed`); }
  unsubscribe(o: SignalObserver): void { this.observers = this.observers.filter(x => x !== o); console.log(`  - ${o.observerName} unsubscribed`); }
  fireSignal(msg: string, urgency: number): void {
    console.log(`\n🔥 SIGNAL from ${this.location} [URGENCY=${urgency}/5]: ${msg}`);
    this.observers.forEach(o => o.onSignal(msg, urgency));
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   OBSERVER PATTERN — TypeScript               ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const tower      = new SignalTower("Hadrian's Wall — Milecastle 39");
const legate     = new RomanLegate("Gnaeus Pompeius Julius", "Legio XX");
const emperor    = new EmperorInRome();
const chronicler = new ChroniclerAnnales();

tower.subscribe(legate); tower.subscribe(emperor); tower.subscribe(chronicler);
tower.fireSignal("Small Pictish hunting party spotted", 1);
tower.fireSignal("200 armed Picts approaching!", 3);
tower.fireSignal("FULL TRIBAL INVASION! 10,000 warriors!", 5);
tower.unsubscribe(emperor);
tower.fireSignal("Picts retreated", 1);
console.log(`\nTotal events chronicled: ${chronicler.count}`);
console.log('"Una specula ardet, omnes vident!"');

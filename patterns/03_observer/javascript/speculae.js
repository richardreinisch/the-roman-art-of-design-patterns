// ============================================================
//  OBSERVER PATTERN — Roman Fire-Signal Network
//  Run: node speculae.js
// ============================================================

class RomanLegate {
  constructor(name, legion) { this.observerName = name; this.legion = legion; }
  onSignal(msg, urgency) {
    if      (urgency >= 4) console.log(`  ⚔  LEGATE ${this.observerName} (${this.legion}): FULL MOBILIZATION! '${msg}'`);
    else if (urgency >= 2) console.log(`  📜 LEGATE ${this.observerName}: Prepare forces. '${msg}'`);
    else                   console.log(`  📜 LEGATE ${this.observerName}: Noted. '${msg}'`);
  }
}
class EmperorInRome {
  constructor() { this.observerName = "Emperor Hadrian"; }
  onSignal(msg, urgency) {
    if      (urgency >= 5) console.log(`  👑 EMPEROR: BY JUPITER! '${msg}'`);
    else if (urgency >= 3) console.log(`  👑 EMPEROR: Dispatch legions. '${msg}'`);
    else                   console.log(`  👑 EMPEROR: Send a letter. '${msg}'`);
  }
}
class ChroniclerAnnales {
  constructor() { this.observerName = "Chronicler"; this._count = 0; }
  get count() { return this._count; }
  onSignal(msg, urgency) {
    console.log(`  📖 CHRONICLER [#${++this._count}]: '${msg}' (urgency=${urgency})`);
  }
}
class SignalTower {
  constructor(location) { this.location = location; this.observers = []; }
  subscribe(o)   { this.observers.push(o);                           console.log(`  + ${o.observerName} subscribed`); }
  unsubscribe(o) { this.observers = this.observers.filter(x=>x!==o); console.log(`  - ${o.observerName} unsubscribed`); }
  fireSignal(msg, urgency) {
    console.log(`\n🔥 SIGNAL [URGENCY=${urgency}/5]: ${msg}`);
    this.observers.forEach(o => o.onSignal(msg, urgency));
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   OBSERVER PATTERN — JavaScript               ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const tower      = new SignalTower("Hadrian's Wall");
const legate     = new RomanLegate("Gnaeus Pompeius Julius", "Legio XX");
const emperor    = new EmperorInRome();
const chronicler = new ChroniclerAnnales();

tower.subscribe(legate); tower.subscribe(emperor); tower.subscribe(chronicler);
tower.fireSignal("Small Pictish hunting party spotted", 1);
tower.fireSignal("200 armed Picts approaching!", 3);
tower.fireSignal("FULL TRIBAL INVASION! 10,000 warriors!", 5);
tower.unsubscribe(emperor);
tower.fireSignal("Picts retreated", 1);
console.log(`\nTotal events: ${chronicler.count}`);
console.log('"Una specula ardet, omnes vident!"');

// ============================================================
//  COMMAND PATTERN — Imperial Building Commands
//  Run: node mandatum.js
// ============================================================

class RomeArchitect {
  constructor() { this.buildings = []; }
  build(s)    { this.buildings.push(s);                               return `🏛  ${s} BUILT! [${this.buildings}]`; }
  demolish(s) { this.buildings = this.buildings.filter(b => b !== s); return `🔨 ${s} DEMOLISHED! [${this.buildings}]`; }
}
class BuildCmd {
  constructor(arch, building) { this.arch = arch; this.building = building; }
  execute() { return this.arch.build(this.building); }
  undo()    { return this.arch.demolish(this.building); }
}
class ImperialPalace {
  constructor() { this.history = []; this.undone = []; }
  issue(cmd)    { const r = cmd.execute(); this.history.push(cmd); this.undone = []; return r; }
  undoLast()    { if (!this.history.length) return "Nothing!"; const c = this.history.pop(); this.undone.push(c); return c.undo(); }
  redoLast()    { if (!this.undone.length)  return "Nothing!"; const c = this.undone.pop();  this.history.push(c); return c.execute(); }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   COMMAND PATTERN — JavaScript                ║");
console.log("╚═══════════════════════════════════════════════╝\n");
const arch = new RomeArchitect(); const palace = new ImperialPalace();
console.log("── ISSUING COMMANDS ────────────────────────────");
console.log(palace.issue(new BuildCmd(arch, "Colosseum")));
console.log(palace.issue(new BuildCmd(arch, "Aqua Claudia")));
console.log(palace.issue(new BuildCmd(arch, "Temple of Jupiter")));
console.log("\n── UNDO ─────────────────────────────────────────");
console.log(palace.undoLast()); console.log(palace.undoLast());
console.log("\n── REDO ─────────────────────────────────────────");
console.log(palace.redoLast());
console.log('\n"Mandatum datum, mandatum executum!"');

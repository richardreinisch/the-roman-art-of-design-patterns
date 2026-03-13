// ============================================================
//  COMMAND PATTERN — Imperial Building Commands
//  Run: npx ts-node mandatum.ts
// ============================================================

class RomeArchitect {
  buildings: string[] = [];
  build(s: string):    string { this.buildings.push(s);                      return `🏛  ${s} BUILT! [${this.buildings}]`; }
  demolish(s: string): string { this.buildings = this.buildings.filter(b=>b!==s); return `🔨 ${s} DEMOLISHED! [${this.buildings}]`; }
}

interface ImperialCommand { execute(): string; undo(): string; }

class BuildCmd implements ImperialCommand {
  constructor(private arch: RomeArchitect, private building: string) {}
  execute() { return this.arch.build(this.building); }
  undo()    { return this.arch.demolish(this.building); }
}

class ImperialPalace {
  private history: ImperialCommand[] = [];
  private undone:  ImperialCommand[] = [];
  issue(cmd: ImperialCommand): string {
    const r = cmd.execute(); this.history.push(cmd); this.undone = []; return r;
  }
  undoLast(): string {
    if (!this.history.length) return "Nothing to undo!";
    const cmd = this.history.pop()!; this.undone.push(cmd); return cmd.undo();
  }
  redoLast(): string {
    if (!this.undone.length) return "Nothing to redo!";
    const cmd = this.undone.pop()!; this.history.push(cmd); return cmd.execute();
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   COMMAND PATTERN — TypeScript                ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const arch   = new RomeArchitect();
const palace = new ImperialPalace();

console.log("── ISSUING COMMANDS ────────────────────────────");
console.log(palace.issue(new BuildCmd(arch, "Colosseum")));
console.log(palace.issue(new BuildCmd(arch, "Aqua Claudia")));
console.log(palace.issue(new BuildCmd(arch, "Temple of Jupiter")));
console.log("\n── UNDO ─────────────────────────────────────────");
console.log(palace.undoLast());
console.log(palace.undoLast());
console.log("\n── REDO ─────────────────────────────────────────");
console.log(palace.redoLast());
console.log('\n"Mandatum datum, mandatum executum!"');

// ============================================================
//  MVC/MVCS PATTERN — The Roman Republic
//  Run: npx ts-node res_publica.ts
// ============================================================

interface Legion { id: number; name: string; province: string; strength: number; active?: boolean; }

class LegionModel {
  private legions = new Map<number, Legion>();
  private nextId  = 1;
  add(name: string, strength: number, province: string): Legion {
    const l = { id: this.nextId++, name, province, strength, active: true };
    this.legions.set(l.id, l); return l;
  }
  getAll()                { return [...this.legions.values()]; }
  getByProvince(p: string){ return [...this.legions.values()].filter(l => l.province === p); }
  update(l: Legion)       { this.legions.set(l.id, l); }
  totalStrength()         { return [...this.legions.values()].reduce((s,l) => s + l.strength, 0); }
}

class LegionView {
  renderList(legs: Legion[]): void {
    console.log("\n  ╔══ IMPERIAL LEGION REGISTRY ══╗");
    legs.forEach(l => console.log(`  ║ [${l.id}] ${l.name.padEnd(22)} ${l.province.padEnd(10)} ${l.strength} ║`));
    console.log("  ╚══════════════════════════════╝");
  }
  showMsg(m: string)   { console.log(`  📢 ${m}`); }
  showStrength(n: number) { console.log(`  ⚔  Total: ${n.toLocaleString()} soldiers`); }
}

class LegionService {
  constructor(private model: LegionModel) {}
  reinforce(province: string, troops: number): string {
    const legs = this.model.getByProvince(province);
    if (!legs.length) return `No legions in ${province}`;
    const per = Math.floor(troops / legs.length);
    legs.forEach(l => this.model.update({ ...l, strength: l.strength + per }));
    return `+${troops} troops to ${legs.length} legion(s) in ${province}`;
  }
}

class LegionController {
  constructor(private model: LegionModel, private view: LegionView, private service: LegionService) {}
  addLegion(name: string, strength: number, province: string): void {
    this.model.add(name, strength, province);
    this.view.showMsg(`Legion '${name}' enrolled`);
    this.view.renderList(this.model.getAll());
  }
  reinforce(province: string, count: number): void {
    this.view.showMsg(this.service.reinforce(province, count));
    this.view.renderList(this.model.getAll());
  }
  showStrength(): void { this.view.showStrength(this.model.totalStrength()); }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   MVC/MVCS PATTERN — TypeScript               ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const model   = new LegionModel();
const view    = new LegionView();
const service = new LegionService(model);
const ctrl    = new LegionController(model, view, service);

ctrl.addLegion("Legio I Germanica",   5000, "Germania");
ctrl.addLegion("Legio X Gemina",      4800, "Hispania");
ctrl.addLegion("Legio XII Fulminata", 4200, "Germania");
console.log("\n── REINFORCE GERMANIA ──────────────────────────");
ctrl.reinforce("Germania", 3000);
ctrl.showStrength();
console.log('\n"Divide et impera!"');

export {};

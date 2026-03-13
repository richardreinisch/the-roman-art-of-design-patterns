// ============================================================
//  MVC/MVCS PATTERN — The Roman Republic
//  Run: node res_publica.js
// ============================================================

class LegionModel {
  constructor() { this.legions = new Map(); this.nextId = 1; }
  add(name, strength, province) {
    const l = { id: this.nextId++, name, province, strength };
    this.legions.set(l.id, l); return l;
  }
  getAll()              { return [...this.legions.values()]; }
  getByProvince(p)      { return [...this.legions.values()].filter(l => l.province === p); }
  update(l)             { this.legions.set(l.id, l); }
  totalStrength()       { return [...this.legions.values()].reduce((s,l) => s + l.strength, 0); }
}
class LegionView {
  renderList(legs) {
    console.log("\n  ╔══ IMPERIAL LEGION REGISTRY ══╗");
    legs.forEach(l => console.log(`  ║ [${l.id}] ${l.name} | ${l.province} | ${l.strength} ║`));
    console.log("  ╚══════════════════════════════╝");
  }
  showMsg(m)      { console.log(`  📢 ${m}`); }
  showStrength(n) { console.log(`  ⚔  Total: ${n.toLocaleString()} soldiers`); }
}
class LegionService {
  constructor(model) { this.model = model; }
  reinforce(province, troops) {
    const legs = this.model.getByProvince(province);
    if (!legs.length) return `No legions in ${province}`;
    const per = Math.floor(troops / legs.length);
    legs.forEach(l => this.model.update({ ...l, strength: l.strength + per }));
    return `+${troops} troops to ${legs.length} legion(s) in ${province}`;
  }
}
class LegionController {
  constructor(model, view, service) { this.model=model; this.view=view; this.service=service; }
  addLegion(name, str, prov) {
    this.model.add(name, str, prov);
    this.view.showMsg(`Legion '${name}' enrolled`);
    this.view.renderList(this.model.getAll());
  }
  reinforce(prov, count) {
    this.view.showMsg(this.service.reinforce(prov, count));
    this.view.renderList(this.model.getAll());
  }
  showStrength() { this.view.showStrength(this.model.totalStrength()); }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   MVC/MVCS PATTERN — JavaScript               ║");
console.log("╚═══════════════════════════════════════════════╝\n");
const model=new LegionModel(), view=new LegionView(), service=new LegionService(model);
const ctrl=new LegionController(model,view,service);
ctrl.addLegion("Legio I Germanica",   5000, "Germania");
ctrl.addLegion("Legio X Gemina",      4800, "Hispania");
ctrl.addLegion("Legio XII Fulminata", 4200, "Germania");
console.log("\n── REINFORCE GERMANIA ──────────────────────────");
ctrl.reinforce("Germania", 3000);
ctrl.showStrength();
console.log('\n"Divide et impera!"');

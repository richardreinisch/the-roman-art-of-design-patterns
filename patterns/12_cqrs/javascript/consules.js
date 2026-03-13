// ============================================================
//  CQRS PATTERN — The Two Consuls
//  Run: node consules.js
// ============================================================

class WriteStore {
  constructor() { this.legions = new Map(); this.events = []; }
  apply(e) {
    this.events.push(e);
    if (e.type === "ENROLL") this.legions.set(e.legionId, { id: e.legionId, name: e.name, province: e.province, strength: e.strength, active: true });
    if (e.type === "DEPLOY") { const l = this.legions.get(e.legionId); if (l) this.legions.set(l.id, { ...l, province: e.province }); }
  }
}
class ReadStore {
  constructor() { this.views = new Map(); }
  project(e) {
    if (e.type === "ENROLL") this.views.set(e.legionId, { id: e.legionId, name: e.name, province: e.province, strength: e.strength, active: true });
    if (e.type === "DEPLOY") { const l = this.views.get(e.legionId); if (l) this.views.set(l.id, { ...l, province: e.province }); }
  }
  query(province = "") {
    return [...this.views.values()].filter(l => l.active && (!province || l.province === province));
  }
}
class CommandConsul {
  constructor(write, read) { this.write=write; this.read=read; this._id=0; }
  enroll(name, province, strength) {
    const id = `leg-${++this._id}`;
    const e = { type:"ENROLL", legionId:id, name, province, strength };
    this.write.apply(e); this.read.project(e);
    console.log(`  ⚔  ENROLLED: ${name} [${id}]`); return id;
  }
  deploy(id, province) {
    const e = { type:"DEPLOY", legionId:id, name:"", province, strength:0 };
    this.write.apply(e); this.read.project(e);
    console.log(`  ⚔  DEPLOYED: ${id} → ${province}`);
  }
}
class QueryConsul {
  constructor(read) { this.read=read; }
  listActive(province="") {
    console.log(`  📖 QUERY: Active in ${province||"all provinces"}:`);
    this.read.query(province).forEach(l => console.log(`    🦅 ${l.name} [${l.id}] in ${l.province} (${l.strength})`));
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   CQRS PATTERN — JavaScript                   ║");
console.log("╚═══════════════════════════════════════════════╝\n");
const write=new WriteStore(); const read=new ReadStore();
const cmd=new CommandConsul(write,read); const query=new QueryConsul(read);
console.log("── COMMANDING CONSUL ────────────────────────────");
const id1=cmd.enroll("Legio I Germanica","Gallia",5000);
cmd.enroll("Legio X Gemina","Hispania",4800);
cmd.enroll("Legio XII Fulminata","Gallia",4200);
cmd.deploy(id1,"Germania");
console.log("\n── READING CONSUL ───────────────────────────────");
query.listActive(); console.log(); query.listActive("Germania");
console.log('\n"Qui legit non scribit; qui scribit non legit!"');

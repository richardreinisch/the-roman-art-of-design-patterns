// ============================================================
//  CQRS PATTERN — The Two Consuls
//  Run: npx ts-node consules.ts  OR  tsc && node consules.js
// ============================================================

interface Legion     { id: string; name: string; province: string; strength: number; active: boolean; }
interface CqrsEvent  { type: string; legionId: string; name: string; province: string; strength: number; }

class WriteStore {
  legions = new Map<string, Legion>();
  events:  CqrsEvent[] = [];
  apply(e: CqrsEvent): void {
    this.events.push(e);
    if (e.type === "ENROLL") this.legions.set(e.legionId, { id: e.legionId, name: e.name, province: e.province, strength: e.strength, active: true });
    if (e.type === "DEPLOY") { const l = this.legions.get(e.legionId); if (l) this.legions.set(l.id, { ...l, province: e.province }); }
  }
}
class ReadStore {
  views = new Map<string, Legion>();
  project(e: CqrsEvent): void {
    if (e.type === "ENROLL") this.views.set(e.legionId, { id: e.legionId, name: e.name, province: e.province, strength: e.strength, active: true });
    if (e.type === "DEPLOY") { const l = this.views.get(e.legionId); if (l) this.views.set(l.id, { ...l, province: e.province }); }
  }
  query(province = ""): Legion[] {
    return [...this.views.values()].filter(l => l.active && (!province || l.province === province));
  }
}

class CommandConsul {
  private _id = 0;
  constructor(private write: WriteStore, private read: ReadStore) {}
  enroll(name: string, province: string, strength: number): string {
    const id = `leg-${++this._id}`;
    const e: CqrsEvent = { type: "ENROLL", legionId: id, name, province, strength };
    this.write.apply(e); this.read.project(e);
    console.log(`  ⚔  ENROLLED: ${name} [${id}]`); return id;
  }
  deploy(id: string, province: string): void {
    const e: CqrsEvent = { type: "DEPLOY", legionId: id, name: "", province, strength: 0 };
    this.write.apply(e); this.read.project(e);
    console.log(`  ⚔  DEPLOYED: ${id} → ${province}`);
  }
}
class QueryConsul {
  constructor(private read: ReadStore) {}
  listActive(province = ""): void {
    const label = province || "all provinces";
    console.log(`  📖 QUERY: Active in ${label}:`);
    this.read.query(province).forEach(l =>
      console.log(`    🦅 ${l.name} [${l.id}] in ${l.province} (${l.strength})`));
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   CQRS PATTERN — TypeScript                   ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const write = new WriteStore(); const read = new ReadStore();
const cmd   = new CommandConsul(write, read);
const query = new QueryConsul(read);

console.log("── COMMANDING CONSUL (Write Side) ──────────────");
const id1 = cmd.enroll("Legio I Germanica",   "Gallia",   5000);
cmd.enroll("Legio X Gemina",      "Hispania", 4800);
cmd.enroll("Legio XII Fulminata", "Gallia",   4200);
cmd.deploy(id1, "Germania");

console.log("\n── READING CONSUL (Query Side) ─────────────────");
query.listActive(); console.log();
query.listActive("Germania");
console.log('\n"Qui legit non scribit; qui scribit non legit!"');

export {};

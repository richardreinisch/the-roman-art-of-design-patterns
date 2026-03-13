// ============================================================
//  REPOSITORY PATTERN — The Imperial Archive
//  Run: node tabularium.js
// ============================================================

class InMemoryCenturionRepository {
  constructor() { this.store = new Map(); }
  findById(id)    { return this.store.get(id); }
  findByLegion(l) { return [...this.store.values()].filter(c => c.legion === l); }
  findAll()       { return [...this.store.values()]; }
  save(c)         { this.store.set(c.id, c); console.log(`  📚 Saved: ${c.name} (${c.rank}) [${c.id}]`); return c; }
  delete(id)      { return this.store.delete(id); }
}
class CenturionService {
  constructor(repo) { this.repo = repo; }
  promoteBest(legion) {
    const all = this.repo.findByLegion(legion);
    if (!all.length) return `No centurions in ${legion}`;
    const best = all.reduce((a, b) => a.battlesWon > b.battlesWon ? a : b);
    this.repo.save({ ...best, rank: "Primus Pilus" });
    return `🎖  ${best.name} promoted! (${best.battlesWon} battles)`;
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   REPOSITORY PATTERN — JavaScript             ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const repo = new InMemoryCenturionRepository();
repo.save({ id:"c1", name:"Marcus Aurelius",   legion:"Legio X",  rank:"Centurion", battlesWon:15 });
repo.save({ id:"c2", name:"Gaius Petronius",   legion:"Legio X",  rank:"Centurion", battlesWon:23 });
repo.save({ id:"c4", name:"Titus Labienus",    legion:"Legio X",  rank:"Centurion", battlesWon:31 });

console.log("\n── QUERY: All Legio X ──────────────────────────");
repo.findByLegion("Legio X").forEach(c => console.log(`  ${c.name} — ${c.battlesWon} battles`));
console.log("\n── PROMOTE BEST ────────────────────────────────");
console.log("  " + new CenturionService(repo).promoteBest("Legio X"));
console.log('\n"Ubi data est? Tabularius scit!"');

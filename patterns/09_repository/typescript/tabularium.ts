// ============================================================
//  REPOSITORY PATTERN — The Imperial Archive
//  Run: npx ts-node tabularium.ts
// ============================================================

interface Centurion { id: string; name: string; legion: string; rank: string; battlesWon: number; }

interface ICenturionRepository {
  findById(id: string):       Centurion | undefined;
  findByLegion(l: string):    Centurion[];
  findAll():                  Centurion[];
  save(c: Centurion):         Centurion;
  delete(id: string):         boolean;
}

class InMemoryCenturionRepository implements ICenturionRepository {
  private store = new Map<string, Centurion>();
  findById(id: string)     { return this.store.get(id); }
  findByLegion(l: string)  { return [...this.store.values()].filter(c => c.legion === l); }
  findAll()                { return [...this.store.values()]; }
  save(c: Centurion)       { this.store.set(c.id, c); console.log(`  📚 Saved: ${c.name} (${c.rank}) [${c.id}]`); return c; }
  delete(id: string)       { return this.store.delete(id); }
}

class CenturionService {
  constructor(private repo: ICenturionRepository) {}
  promoteBest(legion: string): string {
    const all  = this.repo.findByLegion(legion);
    if (!all.length) return `No centurions in ${legion}`;
    const best = all.reduce((a, b) => a.battlesWon > b.battlesWon ? a : b);
    this.repo.save({ ...best, rank: "Primus Pilus" });
    return `🎖  ${best.name} promoted to Primus Pilus! (${best.battlesWon} battles)`;
  }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   REPOSITORY PATTERN — TypeScript             ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const repo = new InMemoryCenturionRepository();
repo.save({ id:"c1", name:"Marcus Aurelius",   legion:"Legio X",  rank:"Centurion", battlesWon:15 });
repo.save({ id:"c2", name:"Gaius Petronius",   legion:"Legio X",  rank:"Centurion", battlesWon:23 });
repo.save({ id:"c3", name:"Publius Quinctius", legion:"Legio XII",rank:"Centurion", battlesWon: 7 });
repo.save({ id:"c4", name:"Titus Labienus",    legion:"Legio X",  rank:"Centurion", battlesWon:31 });

console.log("\n── QUERY: All Legio X ──────────────────────────");
repo.findByLegion("Legio X").forEach(c => console.log(`  ${c.name} — ${c.battlesWon} battles`));

console.log("\n── PROMOTE BEST ────────────────────────────────");
console.log("  " + new CenturionService(repo).promoteBest("Legio X"));

const c4 = repo.findById("c4");
if (c4) console.log(`\n  ${c4.name} is now: ${c4.rank}`);
console.log('\n"Ubi data est? Tabularius scit!"');

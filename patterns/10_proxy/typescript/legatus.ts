// ============================================================
//  PROXY PATTERN — The Imperial Legatus
//  Run: npx ts-node legatus.ts
// ============================================================

interface IImperialService {
  issueDecree(province: string, decree: string): string;
  getCensus(province: string): string;
}

class EmperorHadrian implements IImperialService {
  constructor() { console.log("  👑 Emperor Hadrian awakens from his nap!"); }
  issueDecree(p: string, d: string) { return `👑 IMPERIAL DECREE for ${p}: '${d}' — Hadrianus P.P.`; }
  getCensus(p: string)              { return `👑 Census of ${p}: ~50,000 inhabitants`; }
}

class LegateProxy implements IImperialService {
  private emperor?: EmperorHadrian;
  private cache   = new Map<string, string>();
  private authorized = new Set(["Syria","Aegyptus","Britannia","Gallia","Hispania"]);
  private _count  = 0;

  private getEmperor() {
    if (!this.emperor) {
      console.log("  [Proxy] Waking the Emperor...");
      this.emperor = new EmperorHadrian();
    }
    return this.emperor;
  }
  private log(action: string) { console.log(`  [Log #${++this._count}] ${action}`); }

  issueDecree(p: string, d: string) {
    this.log(`Decree for '${p}'`);
    if (!this.authorized.has(p)) return `🚫 ACCESS DENIED: '${p}' is not authorized!`;
    return this.getEmperor().issueDecree(p, d);
  }
  getCensus(p: string) {
    this.log(`Census for '${p}'`);
    if (this.cache.has(p)) { console.log(`  [Cache HIT] ${p}`); return this.cache.get(p)!; }
    const r = this.getEmperor().getCensus(p);
    this.cache.set(p, r);
    return r;
  }
  get count() { return this._count; }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   PROXY PATTERN — TypeScript                  ║");
console.log("╚═══════════════════════════════════════════════╝\n");

const proxy = new LegateProxy();
console.log("── PROTECTION ───────────────────────────────────");
console.log(proxy.issueDecree("Barbaria", "Build roads!"));
console.log("\n── AUTHORIZED ───────────────────────────────────");
console.log(proxy.issueDecree("Britannia", "Build Hadrian's Wall"));
console.log("\n── CACHING ──────────────────────────────────────");
console.log(proxy.getCensus("Aegyptus"));
console.log("\n  (Second call — cached)");
console.log(proxy.getCensus("Aegyptus"));
console.log(`\n  Total requests: ${proxy.count}`);
console.log('"Legatus vocem imperatoris habet!"');

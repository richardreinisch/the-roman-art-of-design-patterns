// ============================================================
//  PROXY PATTERN — The Imperial Legatus
//  Run: node legatus.js
// ============================================================

class EmperorHadrian {
  constructor() { console.log("  👑 Emperor Hadrian awakens from his nap!"); }
  issueDecree(p, d) { return `👑 IMPERIAL DECREE for ${p}: '${d}' — Hadrianus P.P.`; }
  getCensus(p)      { return `👑 Census of ${p}: ~50,000 inhabitants`; }
}
class LegateProxy {
  #emperor; #cache = new Map(); #count = 0;
  #authorized = new Set(["Syria","Aegyptus","Britannia","Gallia","Hispania"]);
  #getEmperor() {
    if (!this.#emperor) { console.log("  [Proxy] Waking the Emperor..."); this.#emperor = new EmperorHadrian(); }
    return this.#emperor;
  }
  #log(a) { console.log(`  [Log #${++this.#count}] ${a}`); }
  issueDecree(p, d) {
    this.#log(`Decree for '${p}'`);
    if (!this.#authorized.has(p)) return `🚫 DENIED: '${p}' not authorized!`;
    return this.#getEmperor().issueDecree(p, d);
  }
  getCensus(p) {
    this.#log(`Census for '${p}'`);
    if (this.#cache.has(p)) { console.log(`  [Cache HIT] ${p}`); return this.#cache.get(p); }
    const r = this.#getEmperor().getCensus(p); this.#cache.set(p, r); return r;
  }
  get count() { return this.#count; }
}

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   PROXY PATTERN — JavaScript                  ║");
console.log("╚═══════════════════════════════════════════════╝\n");
const proxy = new LegateProxy();
console.log(proxy.issueDecree("Barbaria", "Build roads!"));
console.log(proxy.issueDecree("Britannia", "Build Hadrian's Wall"));
console.log(proxy.getCensus("Aegyptus"));
console.log(proxy.getCensus("Aegyptus")); // cache hit
console.log(`\n  Total: ${proxy.count} requests`);
console.log('"Legatus vocem imperatoris habet!"');

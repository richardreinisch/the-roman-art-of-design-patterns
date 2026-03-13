// ============================================================
//  REPOSITORY PATTERN — The Imperial Archive
//  Run: dotnet script Tabularium.cs
// ============================================================
using System; using System.Collections.Generic; using System.Linq;

record Centurion(string Id, string Name, string Legion, string Rank, int BattlesWon);
interface ICenturionRepo {
    Centurion? FindById(string id); List<Centurion> FindByLegion(string l);
    Centurion Save(Centurion c); bool Delete(string id);
}
class InMemoryRepo : ICenturionRepo {
    private Dictionary<string, Centurion> _s = new();
    public Centurion? FindById(string id)    => _s.TryGetValue(id, out var c) ? c : null;
    public List<Centurion> FindByLegion(string l) => _s.Values.Where(c=>c.Legion==l).ToList();
    public Centurion Save(Centurion c) { _s[c.Id]=c; Console.WriteLine($"  📚 Saved: {c.Name} ({c.Rank}) [{c.Id}]"); return c; }
    public bool Delete(string id)            => _s.Remove(id);
}
class CenturionService {
    private readonly ICenturionRepo _r;
    public CenturionService(ICenturionRepo r) { _r = r; }
    public string PromoteBest(string legion) {
        var all = _r.FindByLegion(legion);
        if (!all.Any()) return $"No centurions in {legion}";
        var best = all.OrderByDescending(c => c.BattlesWon).First();
        _r.Save(best with { Rank = "Primus Pilus" });
        return $"🎖  {best.Name} promoted! ({best.BattlesWon} battles)";
    }
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   REPOSITORY PATTERN — C#                     ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
var repo = new InMemoryRepo();
repo.Save(new("c1","Marcus Aurelius",  "Legio X","Centurion",15));
repo.Save(new("c2","Gaius Petronius",  "Legio X","Centurion",23));
repo.Save(new("c4","Titus Labienus",   "Legio X","Centurion",31));
Console.WriteLine("\n── QUERY ────────────────────────────────────────");
repo.FindByLegion("Legio X").ForEach(c => Console.WriteLine($"  {c.Name} — {c.BattlesWon} battles"));
Console.WriteLine("\n── PROMOTE BEST ─────────────────────────────────");
Console.WriteLine("  " + new CenturionService(repo).PromoteBest("Legio X"));
Console.WriteLine("\n\"Ubi data est? Tabularius scit!\"");

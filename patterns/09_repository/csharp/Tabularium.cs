// ============================================================
//  REPOSITORY PATTERN — The Imperial Archive
//  Run: dotnet script Tabularium.cs
// ============================================================
#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;

// ── Domain Object ────────────────────────────────────────────
record Centurion(string Id, string Name, string Legion, string Rank, int BattlesWon);

// ── Repository Interface ─────────────────────────────────────
interface ICenturionRepo {
    Centurion? FindById(string id);
    List<Centurion> FindByLegion(string legion);
    Centurion Save(Centurion c);
    bool Delete(string id);
}

// ── In-Memory Implementation ─────────────────────────────────
class InMemoryRepo : ICenturionRepo {
    private readonly Dictionary<string, Centurion> _store = new Dictionary<string, Centurion>();

    public Centurion? FindById(string id) {
        Centurion? c;
        return _store.TryGetValue(id, out c) ? c : null;
    }

    public List<Centurion> FindByLegion(string legion) =>
        _store.Values.Where(c => c.Legion == legion).ToList();

    public Centurion Save(Centurion c) {
        _store[c.Id] = c;
        Console.WriteLine($"  📚 Saved: {c.Name} ({c.Rank}) [{c.Id}]");
        return c;
    }

    public bool Delete(string id) => _store.Remove(id);
}

// ── Service (business logic) ──────────────────────────────────
class CenturionService {
    private readonly ICenturionRepo _repo;
    public CenturionService(ICenturionRepo repo) { _repo = repo; }

    public string PromoteBest(string legion) {
        var all = _repo.FindByLegion(legion);
        if (all.Count == 0) return $"No centurions in {legion}";
        var best = all.OrderByDescending(c => c.BattlesWon).First();
        _repo.Save(best with { Rank = "Primus Pilus" });
        return $"🎖  {best.Name} promoted! ({best.BattlesWon} battles won)";
    }
}

// ── Demo ──────────────────────────────────────────────────────
Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   REPOSITORY PATTERN — C#                     ║");
Console.WriteLine("║   Tabularium Capitolinum                      ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");

var repo = new InMemoryRepo();
repo.Save(new Centurion("c1", "Marcus Aurelius",  "Legio X", "Centurion", 15));
repo.Save(new Centurion("c2", "Gaius Petronius",  "Legio X", "Centurion", 23));
repo.Save(new Centurion("c3", "Titus Labienus",   "Legio X", "Centurion", 31));
repo.Save(new Centurion("c4", "Julia Domna",      "Legio V", "Centurion", 19));

Console.WriteLine("\n── QUERY: All of Legio X ───────────────────────────");
foreach (var c in repo.FindByLegion("Legio X"))
    Console.WriteLine($"  {c.Name,-20} {c.BattlesWon,2} battles  [{c.Rank}]");

Console.WriteLine("\n── PROMOTE BEST ────────────────────────────────────");
var svc = new CenturionService(repo);
Console.WriteLine("  " + svc.PromoteBest("Legio X"));

Console.WriteLine("\n── FIND BY ID ──────────────────────────────────────");
var found = repo.FindById("c1");
if (found != null)
    Console.WriteLine($"  Found: {found.Name} — now [{found.Rank}]");

Console.WriteLine("\n\"Ubi data est? Tabularius scit!\"");

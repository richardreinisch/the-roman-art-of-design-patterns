// ============================================================
//  PROXY PATTERN — The Imperial Legatus
//  Run: dotnet script Legatus.cs
// ============================================================
using System; using System.Collections.Generic;

interface IImperialService { string IssueDecree(string p, string d); string GetCensus(string p); }
class EmperorHadrian : IImperialService {
    public EmperorHadrian() { Console.WriteLine("  👑 Emperor Hadrian awakens from his nap!"); }
    public string IssueDecree(string p, string d) => $"👑 DECREE for {p}: '{d}' — Hadrianus P.P.";
    public string GetCensus(string p)              => $"👑 Census of {p}: ~50,000 inhabitants";
}
class LegateProxy : IImperialService {
    private EmperorHadrian? _e;
    private readonly Dictionary<string,string> _cache = new();
    private readonly HashSet<string> _auth = new(){"Syria","Aegyptus","Britannia","Gallia","Hispania"};
    private int _count;
    private EmperorHadrian GetEmperor() {
        if (_e == null) { Console.WriteLine("  [Proxy] Waking the Emperor..."); _e = new EmperorHadrian(); }
        return _e;
    }
    private void Log(string a) => Console.WriteLine($"  [Log #{++_count}] {a}");
    public string IssueDecree(string p, string d) {
        Log($"Decree for '{p}'");
        return _auth.Contains(p) ? GetEmperor().IssueDecree(p, d) : $"🚫 DENIED: '{p}' not authorized!";
    }
    public string GetCensus(string p) {
        Log($"Census for '{p}'");
        if (_cache.TryGetValue(p, out var r)) { Console.WriteLine($"  [Cache HIT] {p}"); return r; }
        r = GetEmperor().GetCensus(p); _cache[p] = r; return r;
    }
    public int Count => _count;
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   PROXY PATTERN — C#                          ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
var proxy = new LegateProxy();
Console.WriteLine(proxy.IssueDecree("Barbaria","Build roads!"));
Console.WriteLine(proxy.IssueDecree("Britannia","Build Hadrian's Wall"));
Console.WriteLine(proxy.GetCensus("Aegyptus"));
Console.WriteLine(proxy.GetCensus("Aegyptus")); // cache
Console.WriteLine($"\n  Total: {proxy.Count} requests");
Console.WriteLine("\"Legatus vocem imperatoris habet!\"");

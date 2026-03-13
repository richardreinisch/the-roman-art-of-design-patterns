// ============================================================
//  PROXY PATTERN — The Imperial Legatus
//  Run: dotnet script Legatus.cs
// ============================================================
#nullable enable
using System;
using System.Collections.Generic;

// ── Interface (shared by real service and proxy) ──────────────
interface IImperialService {
    string IssueDecree(string province, string decree);
    string GetCensus(string province);
}

// ── Real Subject ──────────────────────────────────────────────
class EmperorHadrian : IImperialService {
    public EmperorHadrian() {
        Console.WriteLine("  👑 Emperor Hadrian awakens from his nap!");
    }
    public string IssueDecree(string province, string decree) =>
        $"👑 DECREE for {province}: '{decree}' — Hadrianus P.P.";
    public string GetCensus(string province) =>
        $"👑 Census of {province}: ~50,000 inhabitants";
}

// ── Proxy (access control + caching + lazy init) ──────────────
class LegateProxy : IImperialService {
    private EmperorHadrian? _emperor;
    private readonly Dictionary<string, string> _cache = new Dictionary<string, string>();
    private readonly HashSet<string> _authorized;
    private int _count;

    public LegateProxy() {
        _authorized = new HashSet<string> { "Syria", "Aegyptus", "Britannia", "Gallia", "Hispania" };
    }

    private EmperorHadrian GetEmperor() {
        if (_emperor == null) {
            Console.WriteLine("  [Proxy] Waking the Emperor...");
            _emperor = new EmperorHadrian();
        }
        return _emperor;
    }

    private void Log(string action) =>
        Console.WriteLine($"  [Log #{++_count}] {action}");

    public string IssueDecree(string province, string decree) {
        Log($"Decree requested for '{province}'");
        if (!_authorized.Contains(province))
            return $"🚫 DENIED: '{province}' is not an authorized province!";
        return GetEmperor().IssueDecree(province, decree);
    }

    public string GetCensus(string province) {
        Log($"Census requested for '{province}'");
        string? cached;
        if (_cache.TryGetValue(province, out cached)) {
            Console.WriteLine($"  [Cache HIT] Returning cached census for {province}");
            return cached;
        }
        var result = GetEmperor().GetCensus(province);
        _cache[province] = result;
        return result;
    }

    public int RequestCount => _count;
}

// ── Demo ──────────────────────────────────────────────────────
Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   PROXY PATTERN — C#                          ║");
Console.WriteLine("║   Legatus Augusti                             ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");

var proxy = new LegateProxy();

Console.WriteLine("── ACCESS CONTROL ──────────────────────────────────");
Console.WriteLine(proxy.IssueDecree("Barbaria", "Build roads!"));
Console.WriteLine(proxy.IssueDecree("Britannia", "Build Hadrian's Wall"));

Console.WriteLine("\n── CACHING PROXY ───────────────────────────────────");
Console.WriteLine(proxy.GetCensus("Aegyptus"));
Console.WriteLine(proxy.GetCensus("Aegyptus")); // second call: cache hit

Console.WriteLine($"\n  Total requests handled: {proxy.RequestCount}");
Console.WriteLine("\"Legatus vocem imperatoris habet!\"");

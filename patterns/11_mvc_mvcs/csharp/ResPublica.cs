// ============================================================
//  MVC/MVCS PATTERN — The Roman Republic
//  Run: dotnet script ResPublica.cs
// ============================================================
using System; using System.Collections.Generic; using System.Linq;

record Legion(int Id, string Name, string Province, int Strength);

class LegionModel {
    private Dictionary<int,Legion> _l = new(); private int _id = 1;
    public Legion Add(string n, int s, string p) { var l=new Legion(_id++,n,p,s); _l[l.Id]=l; return l; }
    public List<Legion> GetAll()              => _l.Values.ToList();
    public List<Legion> GetByProvince(string p) => _l.Values.Where(l=>l.Province==p).ToList();
    public void Update(Legion l)              => _l[l.Id] = l;
    public int TotalStrength()                => _l.Values.Sum(l=>l.Strength);
}
class LegionView {
    public void RenderList(List<Legion> legs) {
        Console.WriteLine("\n  ╔══ IMPERIAL LEGION REGISTRY ══╗");
        legs.ForEach(l => Console.WriteLine($"  ║ [{l.Id}] {l.Name,-22} {l.Province,-10} {l.Strength,5} ║"));
        Console.WriteLine("  ╚══════════════════════════════╝");
    }
    public void ShowMsg(string m)   => Console.WriteLine($"  📢 {m}");
    public void ShowStrength(int n) => Console.WriteLine($"  ⚔  Total: {n:N0} soldiers");
}
class LegionService {
    private LegionModel _m;
    public LegionService(LegionModel m) { _m = m; }
    public string Reinforce(string prov, int troops) {
        var legs = _m.GetByProvince(prov);
        if (!legs.Any()) return $"No legions in {prov}";
        var per = troops / legs.Count;
        legs.ForEach(l => _m.Update(l with { Strength = l.Strength + per }));
        return $"+{troops} troops to {legs.Count} legion(s) in {prov}";
    }
}
class LegionController {
    LegionModel _m; LegionView _v; LegionService _s;
    public LegionController(LegionModel m, LegionView v, LegionService s) { _m=m; _v=v; _s=s; }
    public void AddLegion(string n, int s, string p) {
        _m.Add(n,s,p); _v.ShowMsg($"Legion '{n}' enrolled"); _v.RenderList(_m.GetAll());
    }
    public void Reinforce(string p, int c) { _v.ShowMsg(_s.Reinforce(p,c)); _v.RenderList(_m.GetAll()); }
    public void ShowStrength() => _v.ShowStrength(_m.TotalStrength());
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   MVC/MVCS PATTERN — C#                       ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
var model=new LegionModel(); var view=new LegionView(); var svc=new LegionService(model);
var ctrl=new LegionController(model,view,svc);
ctrl.AddLegion("Legio I Germanica",   5000, "Germania");
ctrl.AddLegion("Legio X Gemina",      4800, "Hispania");
ctrl.AddLegion("Legio XII Fulminata", 4200, "Germania");
Console.WriteLine("\n── REINFORCE GERMANIA ──────────────────────────");
ctrl.Reinforce("Germania", 3000);
ctrl.ShowStrength();
Console.WriteLine("\n\"Divide et impera!\"");

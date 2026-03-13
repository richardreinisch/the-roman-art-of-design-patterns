// ============================================================
//  CQRS PATTERN — The Two Consuls
//  Run: dotnet script Consules.cs
// ============================================================
using System; using System.Collections.Generic; using System.Linq;

record Legion(string Id, string Name, string Province, int Strength, bool Active = true);
record CqrsEvent(string Type, string LegionId, string Name, string Province, int Strength);

class WriteStore {
    public Dictionary<string,Legion> Legions = new();
    public List<CqrsEvent> Events = new();
    public void Apply(CqrsEvent e) {
        Events.Add(e);
        if (e.Type=="ENROLL") Legions[e.LegionId] = new(e.LegionId,e.Name,e.Province,e.Strength);
        if (e.Type=="DEPLOY" && Legions.TryGetValue(e.LegionId,out var l))
            Legions[l.Id] = l with { Province = e.Province };
    }
}
class ReadStore {
    public Dictionary<string,Legion> Views = new();
    public void Project(CqrsEvent e) {
        if (e.Type=="ENROLL") Views[e.LegionId] = new(e.LegionId,e.Name,e.Province,e.Strength);
        if (e.Type=="DEPLOY" && Views.TryGetValue(e.LegionId,out var l))
            Views[l.Id] = l with { Province = e.Province };
    }
    public List<Legion> Query(string province="") =>
        Views.Values.Where(l=>l.Active&&(province==""||l.Province==province)).ToList();
}
class CommandConsul {
    private WriteStore _w; private ReadStore _r; private int _id;
    public CommandConsul(WriteStore w, ReadStore r) { _w=w; _r=r; }
    public string Enroll(string name, string prov, int str) {
        var id=$"leg-{++_id}";
        var e=new CqrsEvent("ENROLL",id,name,prov,str);
        _w.Apply(e); _r.Project(e);
        Console.WriteLine($"  ⚔  ENROLLED: {name} [{id}]"); return id;
    }
    public void Deploy(string id, string prov) {
        var e=new CqrsEvent("DEPLOY",id,"",prov,0);
        _w.Apply(e); _r.Project(e);
        Console.WriteLine($"  ⚔  DEPLOYED: {id} → {prov}");
    }
}
class QueryConsul {
    private ReadStore _r;
    public QueryConsul(ReadStore r) { _r=r; }
    public void ListActive(string prov="") {
        var label = prov==""?"all provinces":prov;
        Console.WriteLine($"  📖 QUERY: Active in {label}:");
        _r.Query(prov).ForEach(l=>Console.WriteLine($"    🦅 {l.Name} [{l.Id}] in {l.Province} ({l.Strength})"));
    }
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   CQRS PATTERN — C#                           ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
var w=new WriteStore(); var r=new ReadStore();
var cmd=new CommandConsul(w,r); var query=new QueryConsul(r);
Console.WriteLine("── COMMANDING CONSUL ────────────────────────────");
var id1=cmd.Enroll("Legio I Germanica","Gallia",5000);
cmd.Enroll("Legio X Gemina","Hispania",4800);
cmd.Enroll("Legio XII Fulminata","Gallia",4200);
cmd.Deploy(id1,"Germania");
Console.WriteLine("\n── READING CONSUL ───────────────────────────────");
query.ListActive(); Console.WriteLine(); query.ListActive("Germania");
Console.WriteLine("\n\"Qui legit non scribit; qui scribit non legit!\"");

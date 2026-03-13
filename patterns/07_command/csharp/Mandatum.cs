// ============================================================
//  COMMAND PATTERN — Imperial Building Commands
//  Run: dotnet script Mandatum.cs
// ============================================================
using System; using System.Collections.Generic; using System.Linq;

class RomeArchitect {
    private List<string> _b = new();
    public string Build(string s)    { _b.Add(s);    return $"🏛  {s} BUILT! [{string.Join(", ", _b)}]"; }
    public string Demolish(string s) { _b.Remove(s); return $"🔨 {s} DEMOLISHED! [{string.Join(", ", _b)}]"; }
}
interface IImperialCommand { string Execute(); string Undo(); }
class BuildCmd : IImperialCommand {
    private readonly RomeArchitect _a; private readonly string _b;
    public BuildCmd(RomeArchitect a, string b) { _a = a; _b = b; }
    public string Execute() => _a.Build(_b);
    public string Undo()    => _a.Demolish(_b);
}
class ImperialPalace {
    private Stack<IImperialCommand> _h = new(), _u = new();
    public string Issue(IImperialCommand c)   { var r = c.Execute(); _h.Push(c); _u.Clear(); return r; }
    public string UndoLast() { if (_h.Count==0) return "Nothing!"; var c=_h.Pop(); _u.Push(c); return c.Undo(); }
    public string RedoLast() { if (_u.Count==0) return "Nothing!"; var c=_u.Pop(); _h.Push(c); return c.Execute(); }
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   COMMAND PATTERN — C#                        ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
var arch = new RomeArchitect(); var palace = new ImperialPalace();
Console.WriteLine("── ISSUING ──────────────────────────────────────");
Console.WriteLine(palace.Issue(new BuildCmd(arch, "Colosseum")));
Console.WriteLine(palace.Issue(new BuildCmd(arch, "Aqua Claudia")));
Console.WriteLine(palace.Issue(new BuildCmd(arch, "Temple of Jupiter")));
Console.WriteLine("\n── UNDO ─────────────────────────────────────────");
Console.WriteLine(palace.UndoLast()); Console.WriteLine(palace.UndoLast());
Console.WriteLine("\n── REDO ─────────────────────────────────────────");
Console.WriteLine(palace.RedoLast());
Console.WriteLine("\n\"Mandatum datum, mandatum executum!\"");

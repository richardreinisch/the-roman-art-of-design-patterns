// ============================================================
//  DEPENDENCY INJECTION — The Praetorian Quartermaster
//  Run: dotnet script Officium.cs
// ============================================================
using System; using System.Collections.Generic;

interface IMessenger { void Send(string to, string msg); }
interface ILogger    { void Log(string ev); }

record ScrollMessenger() : IMessenger { public void Send(string to, string msg) => Console.WriteLine($"  📜 Scroll to {to}: '{msg}'"); }
class MockMessenger : IMessenger {
    public List<(string, string)> Sent = new();
    public void Send(string to, string msg) { Sent.Add((to, msg)); Console.WriteLine($"  🧪 MOCK: to={to} msg='{msg}'"); }
}
record ConsoleLogger() : ILogger { public void Log(string ev) => Console.WriteLine($"  [LOG] {ev}"); }

class MilitaryCampaign {
    private readonly IMessenger _m; private readonly ILogger _l;
    public MilitaryCampaign(IMessenger m, ILogger l) { _m = m; _l = l; }
    public void LaunchAttack(string target) {
        _l.Log($"Campaign against {target}");
        _m.Send("Praetorian Guard", $"ADVANCE on {target}!");
        _m.Send("Supply Corps",     $"Provisions to {target}");
        _l.Log("Orders dispatched");
    }
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   DEPENDENCY INJECTION — C#                   ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
Console.WriteLine("── PRODUCTION ───────────────────────────────────");
new MilitaryCampaign(new ScrollMessenger(), new ConsoleLogger()).LaunchAttack("Gaul");
Console.WriteLine("\n── TESTING (mock) ───────────────────────────────");
var mock = new MockMessenger();
new MilitaryCampaign(mock, new ConsoleLogger()).LaunchAttack("Britannia");
Console.WriteLine($"  Mock captured: {mock.Sent.Count} messages ✓");
Console.WriteLine("\n\"Non ipse quaerit, accipit!\"");

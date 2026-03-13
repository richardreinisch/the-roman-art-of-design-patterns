// ============================================================
//  OBSERVER PATTERN — Roman Fire-Signal Network
//  Run: dotnet script Speculae.cs
// ============================================================
using System; using System.Collections.Generic;

interface ISignalObserver { void OnSignal(string msg, int urgency); string ObserverName { get; } }

class RomanLegate : ISignalObserver {
    public string ObserverName { get; }
    private string _legion;
    public RomanLegate(string name, string legion) { ObserverName = name; _legion = legion; }
    public void OnSignal(string msg, int urgency) {
        if      (urgency >= 4) Console.WriteLine($"  ⚔  LEGATE {ObserverName} ({_legion}): MOBILIZE! '{msg}'");
        else if (urgency >= 2) Console.WriteLine($"  📜 LEGATE {ObserverName}: Prepare forces. '{msg}'");
        else                   Console.WriteLine($"  📜 LEGATE {ObserverName}: Noted. '{msg}'");
    }
}
class EmperorInRome : ISignalObserver {
    public string ObserverName => "Emperor Hadrian";
    public void OnSignal(string msg, int urgency) {
        if      (urgency >= 5) Console.WriteLine($"  👑 EMPEROR: BY JUPITER! '{msg}'");
        else if (urgency >= 3) Console.WriteLine($"  👑 EMPEROR: Dispatch legions. '{msg}'");
        else                   Console.WriteLine($"  👑 EMPEROR: Send a letter. '{msg}'");
    }
}
class ChroniclerAnnales : ISignalObserver {
    public string ObserverName => "Chronicler Annales";
    public int Count { get; private set; }
    public void OnSignal(string msg, int urgency) =>
        Console.WriteLine($"  📖 CHRONICLER [#{++Count}]: '{msg}' (urgency={urgency})");
}
class SignalTower {
    private readonly List<ISignalObserver> _observers = new();
    private readonly string _location;
    public SignalTower(string location) { _location = location; }
    public void Subscribe(ISignalObserver o)   { _observers.Add(o);    Console.WriteLine($"  + {o.ObserverName} subscribed"); }
    public void Unsubscribe(ISignalObserver o) { _observers.Remove(o); Console.WriteLine($"  - {o.ObserverName} unsubscribed"); }
    public void FireSignal(string msg, int urgency) {
        Console.WriteLine($"\n🔥 SIGNAL from {_location} [URGENCY={urgency}/5]: {msg}");
        _observers.ForEach(o => o.OnSignal(msg, urgency));
    }
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   OBSERVER PATTERN — C#                       ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
var tower      = new SignalTower("Hadrian's Wall");
var legate     = new RomanLegate("Gnaeus Pompeius Julius", "Legio XX");
var emperor    = new EmperorInRome();
var chronicler = new ChroniclerAnnales();

tower.Subscribe(legate); tower.Subscribe(emperor); tower.Subscribe(chronicler);
tower.FireSignal("Small Pictish hunting party spotted", 1);
tower.FireSignal("200 armed Picts approaching!", 3);
tower.FireSignal("FULL TRIBAL INVASION! 10,000 warriors!", 5);
tower.Unsubscribe(emperor);
tower.FireSignal("Picts retreated", 1);
Console.WriteLine($"\nTotal events: {chronicler.Count}");
Console.WriteLine("\"Una specula ardet, omnes vident!\"");

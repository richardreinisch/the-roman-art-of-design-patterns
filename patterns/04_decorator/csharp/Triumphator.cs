// ============================================================
//  DECORATOR PATTERN — The Triumphator's Dressing Room
//  Run: dotnet script Triumphator.cs
// ============================================================
using System;

interface ISoldier { string Describe(); int CombatPower(); string Status(); }

class BareSoldier : ISoldier {
    public string Describe()    => "👤 Tiro (Recruit) — tunica, caligae sandals";
    public int    CombatPower() => 5;
    public string Status()      => "Recruit";
}
abstract class SoldierDecorator : ISoldier {
    protected ISoldier Soldier;
    protected SoldierDecorator(ISoldier s) { Soldier = s; }
    public virtual string Describe()    => Soldier.Describe();
    public virtual int    CombatPower() => Soldier.CombatPower();
    public virtual string Status()      => Soldier.Status();
}
class LoricaSegmentata : SoldierDecorator {
    public LoricaSegmentata(ISoldier s) : base(s) {}
    public override string Describe()    => Soldier.Describe() + "\n              + 🛡  Lorica Segmentata";
    public override int    CombatPower() => Soldier.CombatPower() + 30;
    public override string Status()      => $"Armoured {Soldier.Status()}";
}
class GallicHelmet : SoldierDecorator {
    public GallicHelmet(ISoldier s) : base(s) {}
    public override string Describe()    => Soldier.Describe() + "\n              + ⛑  Gallic Helmet";
    public override int    CombatPower() => Soldier.CombatPower() + 15;
}
class PaludamentumCloak : SoldierDecorator {
    public PaludamentumCloak(ISoldier s) : base(s) {}
    public override string Describe()    => Soldier.Describe() + "\n              + 🟥 Paludamentum Cloak";
    public override int    CombatPower() => Soldier.CombatPower() + 20;
    public override string Status()      => $"General {Soldier.Status()}";
}
class LaurelWreath : SoldierDecorator {
    public LaurelWreath(ISoldier s) : base(s) {}
    public override string Describe()    => Soldier.Describe() + "\n              + 🌿 LAUREL WREATH OF TRIUMPH!";
    public override int    CombatPower() => Soldier.CombatPower() + 50;
    public override string Status()      => "TRIUMPHATOR";
    public string Shout()                => "IO TRIUMPHE! IO TRIUMPHE! IO TRIUMPHE!";
}

static void Show(ISoldier s) {
    Console.WriteLine($"  Status : {s.Status()}");
    Console.WriteLine($"  Outfit : {s.Describe()}");
    Console.WriteLine($"  Power  : {s.CombatPower()} points");
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   DECORATOR PATTERN — C#                      ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");

ISoldier s = new BareSoldier();
Console.WriteLine("── STEP 1:"); Show(s);
s = new LoricaSegmentata(s); Console.WriteLine("\n── STEP 2: + Lorica"); Show(s);
s = new GallicHelmet(s);     Console.WriteLine("\n── STEP 3: + Helmet"); Show(s);
s = new PaludamentumCloak(s);Console.WriteLine("\n── STEP 4: + General's Cloak"); Show(s);
var t = new LaurelWreath(s); Console.WriteLine("\n── STEP 5: TRIUMPH!"); Show(t);
Console.WriteLine($"\n  🎺 {t.Shout()}");
Console.WriteLine("\n\"Miles ornatur, non mutatur!\"");

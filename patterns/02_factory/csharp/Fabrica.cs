// ============================================================
//  FACTORY METHOD — Imperial Weaponry Workshop
//  Run: dotnet script Fabrica.cs
// ============================================================
using System;

interface IWeapon { string Describe(); string Attack(); int Damage(); }

record Gladius()  : IWeapon { public string Describe() => "⚔  Gladius — short stabbing sword"; public string Attack() => "STAB forward! Enemy pierced!"; public int Damage() => 45; }
record Pilum()    : IWeapon { public string Describe() => "🏹 Pilum — heavy javelin";           public string Attack() => "THROW! Iron bends on impact!"; public int Damage() => 60; }
record Ballista() : IWeapon { public string Describe() => "💥 Ballista — siege weapon";          public string Attack() => "FIRE! Bolt penetrates 3 ranks!"; public int Damage() => 150; }
record Scutum()   : IWeapon { public string Describe() => "🛡  Scutum — legionary shield";       public string Attack() => "PUSH! Shield bash!"; public int Damage() => 20; }

abstract class WeaponFactory {
    public abstract IWeapon CreateWeapon();
    public void ArmSoldier() {
        var w = CreateWeapon();
        Console.WriteLine($"  Weapon issued : {w.Describe()}");
        Console.WriteLine($"  Combat result : {w.Attack()}");
        Console.WriteLine($"  Damage rating : {w.Damage()} points");
    }
}
class InfantryFactory     : WeaponFactory { public override IWeapon CreateWeapon() => new Gladius();  }
class ArcherFactory       : WeaponFactory { public override IWeapon CreateWeapon() => new Pilum();    }
class SiegeFactory        : WeaponFactory { public override IWeapon CreateWeapon() => new Ballista(); }
class ShieldBearerFactory : WeaponFactory { public override IWeapon CreateWeapon() => new Scutum();   }

static void EquipUnit(string name, WeaponFactory f) {
    Console.WriteLine($"\n[{name}]"); f.ArmSoldier();
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   FACTORY METHOD PATTERN — C#                 ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
EquipUnit("1st Infantry Cohort",  new InfantryFactory());
EquipUnit("Archer Auxilia",       new ArcherFactory());
EquipUnit("Siege Engineering",    new SiegeFactory());
EquipUnit("Testudo Shield Wall",  new ShieldBearerFactory());
Console.WriteLine("\n\"Fabrica dat, miles accipit!\"");

// ============================================================
//  SINGLETON PATTERN — The Roman Treasury (Aerarium Saturni)
//  "Unus et idem" — One and the same
//
//  Run: dotnet script Aerarium.cs   (dotnet-script tool)
//   Or: dotnet run                  (in a project)
// ============================================================
using System;

sealed class AerariumSaturni
{
    private static readonly Lazy<AerariumSaturni> _instance =
        new(() => new AerariumSaturni());

    private int _goldReserves;

    private AerariumSaturni()
    {
        _goldReserves = 100_000;
        Console.WriteLine("🏛  Aerarium Saturni founded beneath the Temple of Saturn!");
        Console.WriteLine($"    Initial reserves: {_goldReserves:N0} aurei\n");
    }

    // Thread-safe via Lazy<T>
    public static AerariumSaturni Instance => _instance.Value;

    public void Deposit(int amount, string citizen)
    {
        _goldReserves += amount;
        Console.WriteLine($"  ✓ {citizen} deposits {amount:N0} aurei. Total: {_goldReserves:N0}");
    }

    public void Withdraw(int amount, string citizen)
    {
        if (amount > _goldReserves)
        {
            Console.WriteLine($"  ✗ DENIED — Non est pecunia! {citizen} requests {amount:N0} but only {_goldReserves:N0} available!");
            return;
        }
        _goldReserves -= amount;
        Console.WriteLine($"  ✓ {citizen} withdraws {amount:N0} aurei. Remaining: {_goldReserves:N0}");
    }

    public void ShowStatus() =>
        Console.WriteLine($"\n  📊 AERARIUM STATUS: {_goldReserves:N0} aurei secured");
}

// ─── TOP-LEVEL PROGRAM ────────────────────────────────────
Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║      SINGLETON PATTERN — C#                   ║");
Console.WriteLine("║   The Roman Treasury (Aerarium Saturni)       ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");

var caesarsTreasury  = AerariumSaturni.Instance;
var cicerosTreasury  = AerariumSaturni.Instance;
var brutusTreasury   = AerariumSaturni.Instance;

Console.WriteLine("Are all references the same instance?");
Console.WriteLine($"  Caesar  == Cicero: {(ReferenceEquals(caesarsTreasury, cicerosTreasury) ? "YES ✓" : "NO")}");
Console.WriteLine($"  Cicero  == Brutus: {(ReferenceEquals(cicerosTreasury, brutusTreasury)  ? "YES ✓" : "NO")}\n");

Console.WriteLine("── TRANSACTIONS ────────────────────────────────");
caesarsTreasury.Deposit(50_000, "Caesar (war spoils from Gaul)");
cicerosTreasury.Deposit(10_000, "Cicero (legal fees)");
cicerosTreasury.Withdraw(30_000, "Cicero (bribed a juror)");
brutusTreasury.Withdraw(5_000,  "Brutus (bought a new dagger)");
brutusTreasury.Withdraw(200_000, "Brutus (tried to steal it all)");

caesarsTreasury.ShowStatus();
Console.WriteLine("\n\"Unum tesaurum habemus!\" — We have ONE treasury!");

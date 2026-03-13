// ============================================================
//  STRATEGY PATTERN — Roman Battle Formations
//  Run: dotnet script ArsBellica.cs
// ============================================================
using System;
record Battle(int Enemies, string Terrain, int Morale);
interface IBattleStrategy { string StrategyName { get; } string Execute(Battle b); }
record Testudo()     : IBattleStrategy { public string StrategyName => "TESTUDO"; public string Execute(Battle b) => $"🐢 Shields locked! vs {b.Enemies} on {b.Terrain}. -60%!"; }
record Cuneus()      : IBattleStrategy { public string StrategyName => "CUNEUS";  public string Execute(Battle b) => $"🔺 CHARGE! Wedge pierces {b.Enemies} on {b.Terrain}!"; }
record Orbis()       : IBattleStrategy { public string StrategyName => "ORBIS";   public string Execute(Battle b) => $"⭕ 360° defence! Morale {b.Morale}/10."; }
record FugaTactica() : IBattleStrategy { public string StrategyName => "FUGA";    public string Execute(Battle b) => $"🏃 Retreat from {b.Enemies} enemies!"; }

class RomanLegion {
    private IBattleStrategy _s;
    private string _name;
    public RomanLegion(string n, IBattleStrategy s) { _name = n; _s = s; }
    public void SetStrategy(IBattleStrategy s) { Console.WriteLine($"  ⚙  {_name}: {_s.StrategyName} → {s.StrategyName}"); _s = s; }
    public void Engage(Battle b) { Console.WriteLine($"\n  🦅 {_name} [{_s.StrategyName}]\n     {_s.Execute(b)}"); }
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   STRATEGY PATTERN — C#                       ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
var legion = new RomanLegion("Legio X Gemina", new Testudo());
legion.Engage(new Battle(500, "open field", 8));
Console.WriteLine("\n── SCIPIO ADAPTS ────────────────────────────────");
legion.SetStrategy(new Cuneus());      legion.Engage(new Battle(200, "open field", 9));
legion.SetStrategy(new Orbis());       legion.Engage(new Battle(5000, "valley", 4));
legion.SetStrategy(new FugaTactica()); legion.Engage(new Battle(10000, "ambush", 2));
Console.WriteLine("\n\"Non una via vincimus!\"");

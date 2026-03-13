// ============================================================
//  ADAPTER PATTERN — The Roman Interpreter
//  Run: dotnet script Interpres.cs
// ============================================================
using System;

class BarbarianPaymentSystem {
    private double _torcs = 500;
    public string PayInCelticCoins(double goldTorcs) {
        if (goldTorcs > _torcs) throw new Exception("Non satis torc!");
        _torcs -= goldTorcs;
        return $"Celtic transfer: {goldTorcs:F2} gold torcs sent";
    }
    public double GetExchangeRate() => 3.7;
    public double GetTorcBalance()  => _torcs;
}

interface IRomanPayment { string PayInDenarii(double denarii, string payer); double GetBalance(); }

class BarbarianToRomanAdapter : IRomanPayment {
    private readonly BarbarianPaymentSystem _b;
    private double _balance = 5000;
    public BarbarianToRomanAdapter(BarbarianPaymentSystem b) { _b = b; }
    public string PayInDenarii(double denarii, string payer) {
        var torcs  = denarii / _b.GetExchangeRate();
        var result = _b.PayInCelticCoins(torcs);
        _balance -= denarii;
        return $"[ADAPTER] {payer} pays {denarii:F0} den → {torcs:F2} torcs | {result}";
    }
    public double GetBalance() => _balance;
}

Console.WriteLine("╔═══════════════════════════════════════════════╗");
Console.WriteLine("║   ADAPTER PATTERN — C#                        ║");
Console.WriteLine("╚═══════════════════════════════════════════════╝\n");

var bank    = new BarbarianPaymentSystem();
var adapter = new BarbarianToRomanAdapter(bank);

Console.WriteLine(adapter.PayInDenarii(370, "Marcus Aurelius"));
Console.WriteLine($"  Balance: {adapter.GetBalance():F0} denarii");
Console.WriteLine(adapter.PayInDenarii(185, "Gaius Petronius"));
Console.WriteLine($"  Balance: {adapter.GetBalance():F0} denarii");
Console.WriteLine($"\nCeltic torcs remaining: {bank.GetTorcBalance():F2}");
Console.WriteLine("\"Interpres pontem verborum aedificat!\"");

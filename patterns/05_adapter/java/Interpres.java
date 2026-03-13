// ============================================================
//  ADAPTER PATTERN — The Roman Interpreter
//  Run: java Interpres.java
// ============================================================

public class Interpres {

    // Adaptee (legacy Celtic system)
    static class BarbarianPaymentSystem {
        private double torcs = 500.0;
        String payInCelticCoins(double goldTorcs) {
            if (goldTorcs > torcs) throw new RuntimeException("Non satis torc!");
            torcs -= goldTorcs;
            return String.format("Celtic transfer: %.2f gold torcs sent", goldTorcs);
        }
        double getExchangeRate() { return 3.7; }
        double getTorcBalance()  { return torcs; }
    }

    // Target interface
    interface RomanPaymentInterface {
        String payInDenarii(double denarii, String payer);
        double getBalance();
    }

    // Adapter
    static class BarbarianToRomanAdapter implements RomanPaymentInterface {
        private final BarbarianPaymentSystem barbarian;
        private double balance = 5000.0;
        BarbarianToRomanAdapter(BarbarianPaymentSystem b) { this.barbarian = b; }

        public String payInDenarii(double denarii, String payer) {
            double torcs  = denarii / barbarian.getExchangeRate();
            String result = barbarian.payInCelticCoins(torcs);
            balance -= denarii;
            return String.format("[ADAPTER] %s pays %.0f den → %.2f torcs | %s", payer, denarii, torcs, result);
        }
        public double getBalance() { return balance; }
    }

    static void romanTransaction(RomanPaymentInterface p, String payer, double amount) {
        System.out.println(p.payInDenarii(amount, payer));
        System.out.printf("  Balance: %.0f denarii%n", p.getBalance());
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   ADAPTER PATTERN — Java                      ║");
        System.out.println("║   The Roman Interpreter (Interpres)           ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        var bank    = new BarbarianPaymentSystem();
        var adapter = new BarbarianToRomanAdapter(bank);

        System.out.println("── ROMAN MERCHANT USING ADAPTER ────────────────");
        romanTransaction(adapter, "Marcus Aurelius", 370);
        romanTransaction(adapter, "Gaius Petronius", 185);

        System.out.printf("%n── CELTIC BANK CHECK ───────────────────────────%n");
        System.out.printf("  Torcs remaining: %.2f%n", bank.getTorcBalance());
        System.out.println("\n\"Interpres pontem verborum aedificat!\"");
    }
}

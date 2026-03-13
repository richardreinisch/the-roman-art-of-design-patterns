// ============================================================
//  SINGLETON PATTERN — The Roman Treasury (Aerarium Saturni)
//  "Unus et idem" — One and the same
//
//  Run: java AerariumSaturni.java
// ============================================================

public class AerariumSaturni {

    // ─── SINGLETON CLASS ──────────────────────────────────
    static final class Treasury {
        private static volatile Treasury instance;
        private int goldReserves;

        private Treasury() {
            this.goldReserves = 100_000;
            System.out.println("🏛  Aerarium Saturni founded beneath the Temple of Saturn!");
            System.out.printf("    Initial reserves: %,d aurei%n%n", goldReserves);
        }

        // Thread-safe double-checked locking
        public static Treasury getInstance() {
            if (instance == null) {
                synchronized (Treasury.class) {
                    if (instance == null) instance = new Treasury();
                }
            }
            return instance;
        }

        public void deposit(int amount, String citizen) {
            goldReserves += amount;
            System.out.printf("  ✓ %s deposits %,d aurei. Total: %,d%n",
                              citizen, amount, goldReserves);
        }

        public void withdraw(int amount, String citizen) {
            if (amount > goldReserves) {
                System.out.printf("  ✗ DENIED — Non est pecunia! %s requests %,d but only %,d available!%n",
                                  citizen, amount, goldReserves);
                return;
            }
            goldReserves -= amount;
            System.out.printf("  ✓ %s withdraws %,d aurei. Remaining: %,d%n",
                              citizen, amount, goldReserves);
        }

        public void showStatus() {
            System.out.printf("%n  📊 AERARIUM STATUS: %,d aurei secured%n", goldReserves);
        }
    }

    // ─── DEMONSTRATION ────────────────────────────────────
    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║      SINGLETON PATTERN — Java                 ║");
        System.out.println("║   The Roman Treasury (Aerarium Saturni)       ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        Treasury caesarsTreasury  = Treasury.getInstance();
        Treasury cicerosTreasury  = Treasury.getInstance();
        Treasury brutusTreasury   = Treasury.getInstance();

        System.out.println("Are all references the same instance?");
        System.out.println("  Caesar  == Cicero: " + (caesarsTreasury == cicerosTreasury ? "YES ✓" : "NO"));
        System.out.println("  Cicero  == Brutus: " + (cicerosTreasury == brutusTreasury  ? "YES ✓" : "NO"));
        System.out.println("  Same hashCode: " + System.identityHashCode(caesarsTreasury) + "\n");

        System.out.println("── TRANSACTIONS ────────────────────────────────");
        caesarsTreasury.deposit(50_000, "Caesar (war spoils from Gaul)");
        cicerosTreasury.deposit(10_000, "Cicero (legal fees)");
        cicerosTreasury.withdraw(30_000, "Cicero (bribed a juror)");
        brutusTreasury.withdraw(5_000,  "Brutus (bought a new dagger)");
        brutusTreasury.withdraw(200_000, "Brutus (tried to steal it all)");

        caesarsTreasury.showStatus();
        System.out.println("\n\"Unum tesaurum habemus!\" — We have ONE treasury!");
    }
}

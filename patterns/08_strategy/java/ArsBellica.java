// ============================================================
//  STRATEGY PATTERN — Roman Battle Formations
//  Run: java ArsBellica.java
// ============================================================

public class ArsBellica {

    record Battle(int enemies, String terrain, int morale) {}

    interface BattleStrategy {
        String strategyName();
        String execute(Battle b);
    }

    record Testudo() implements BattleStrategy {
        public String strategyName() { return "TESTUDO (Tortoise)"; }
        public String execute(Battle b) { return "🐢 Shields locked! vs " + b.enemies() + " on " + b.terrain() + ". Casualties -60%!"; }
    }
    record Cuneus() implements BattleStrategy {
        public String strategyName() { return "CUNEUS (Wedge)"; }
        public String execute(Battle b) { return "🔺 CHARGE! Wedge pierces " + b.enemies() + " on " + b.terrain() + "!"; }
    }
    record Orbis() implements BattleStrategy {
        public String strategyName() { return "ORBIS (Circle)"; }
        public String execute(Battle b) { return "⭕ 360° defence! Morale " + b.morale() + "/10. Holding!"; }
    }
    record FugaTactica() implements BattleStrategy {
        public String strategyName() { return "FUGA TACTICA (Retreat)"; }
        public String execute(Battle b) { return "🏃 Tactical retreat from " + b.enemies() + " enemies!"; }
    }

    static class RomanLegion {
        private final String name;
        private BattleStrategy strategy;
        RomanLegion(String n, BattleStrategy s) { this.name = n; this.strategy = s; }
        void setStrategy(BattleStrategy s) {
            System.out.println("  ⚙  " + name + ": " + strategy.strategyName() + " → " + s.strategyName());
            this.strategy = s;
        }
        void engage(Battle b) {
            System.out.println("\n  🦅 " + name + " [" + strategy.strategyName() + "]");
            System.out.println("     " + strategy.execute(b));
        }
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   STRATEGY PATTERN — Java                     ║");
        System.out.println("║   Roman Battle Formations                     ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        var legion = new RomanLegion("Legio X Gemina", new Testudo());
        legion.engage(new Battle(500, "open field", 8));

        System.out.println("\n── SCIPIO ADAPTS TO THE BATTLEFIELD ────────────");
        legion.setStrategy(new Cuneus());
        legion.engage(new Battle(200, "open field", 9));

        legion.setStrategy(new Orbis());
        legion.engage(new Battle(5000, "surrounded valley", 4));

        legion.setStrategy(new FugaTactica());
        legion.engage(new Battle(10000, "ambush", 2));

        System.out.println("\n\"Non una via vincimus!\"");
    }
}

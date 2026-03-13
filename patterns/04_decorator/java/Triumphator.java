// ============================================================
//  DECORATOR PATTERN — The Triumphator's Dressing Room
//  "Miles ornatur, non mutatur"
//  Run: java Triumphator.java
// ============================================================

public class Triumphator {

    interface Soldier {
        String describe();
        int    combatPower();
        String status();
    }

    record BareSoldier() implements Soldier {
        public String describe()    { return "👤 Tiro (Recruit) — tunica, caligae sandals"; }
        public int    combatPower() { return 5; }
        public String status()      { return "Recruit"; }
    }

    // Base decorator
    abstract static class SoldierDecorator implements Soldier {
        protected final Soldier soldier;
        SoldierDecorator(Soldier s) { this.soldier = s; }
        public String describe()    { return soldier.describe(); }
        public int    combatPower() { return soldier.combatPower(); }
        public String status()      { return soldier.status(); }
    }

    static class LoricaSegmentata extends SoldierDecorator {
        LoricaSegmentata(Soldier s) { super(s); }
        public String describe()    { return soldier.describe() + "\n              + 🛡  Lorica Segmentata (plate armour)"; }
        public int    combatPower() { return soldier.combatPower() + 30; }
        public String status()      { return "Armoured " + soldier.status(); }
    }
    static class GallicHelmet extends SoldierDecorator {
        GallicHelmet(Soldier s) { super(s); }
        public String describe()    { return soldier.describe() + "\n              + ⛑  Gallic Helmet (bronze, cheek guards)"; }
        public int    combatPower() { return soldier.combatPower() + 15; }
    }
    static class PaludamentumCloak extends SoldierDecorator {
        PaludamentumCloak(Soldier s) { super(s); }
        public String describe()    { return soldier.describe() + "\n              + 🟥 Paludamentum (general's red cloak)"; }
        public int    combatPower() { return soldier.combatPower() + 20; }
        public String status()      { return "General " + soldier.status(); }
    }
    static class LaurelWreath extends SoldierDecorator {
        LaurelWreath(Soldier s) { super(s); }
        public String describe()    { return soldier.describe() + "\n              + 🌿 LAUREL WREATH OF TRIUMPH!"; }
        public int    combatPower() { return soldier.combatPower() + 50; }
        public String status()      { return "TRIUMPHATOR"; }
        public String shout()       { return "IO TRIUMPHE! IO TRIUMPHE! IO TRIUMPHE!"; }
    }

    static void show(Soldier s) {
        System.out.println("  Status : " + s.status());
        System.out.println("  Outfit : " + s.describe());
        System.out.println("  Power  : " + s.combatPower() + " points");
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   DECORATOR PATTERN — Java                    ║");
        System.out.println("║   The Triumphator's Dressing Room             ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        System.out.println("── STEP 1: Bare Recruit ─────────────────────────");
        Soldier s = new BareSoldier();              show(s);
        System.out.println("\n── STEP 2: Add Lorica ────────────────────────────");
        s = new LoricaSegmentata(s);                show(s);
        System.out.println("\n── STEP 3: Add Helmet ────────────────────────────");
        s = new GallicHelmet(s);                    show(s);
        System.out.println("\n── STEP 4: General's Cloak ───────────────────────");
        s = new PaludamentumCloak(s);               show(s);
        System.out.println("\n── STEP 5: TRIUMPH! ──────────────────────────────");
        var t = new LaurelWreath(s);                show(t);
        System.out.println("\n  🎺 " + t.shout());
        System.out.println("\n\"Miles ornatur, non mutatur!\"");
    }
}

// ============================================================
//  FACTORY METHOD — Imperial Weaponry Workshop
//  "Fabrica dat, miles accipit"
//  Run: java Fabrica.java
// ============================================================

public class Fabrica {

    interface Weapon {
        String describe();
        String attack();
        int    damage();
    }

    record Gladius()   implements Weapon {
        public String describe() { return "⚔  Gladius — short stabbing sword, 60cm blade"; }
        public String attack()   { return "STAB forward! Enemy pierced through the shield gap!"; }
        public int    damage()   { return 45; }
    }
    record Pilum()     implements Weapon {
        public String describe() { return "🏹 Pilum — heavy javelin with soft iron shank"; }
        public String attack()   { return "THROW! Iron bends on impact — enemy shield useless!"; }
        public int    damage()   { return 60; }
    }
    record Ballista()  implements Weapon {
        public String describe() { return "💥 Ballista — torsion siege weapon, 2-talent bolts"; }
        public String attack()   { return "FIRE! Bolt penetrates 3 ranks of soldiers!"; }
        public int    damage()   { return 150; }
    }
    record Scutum()    implements Weapon {
        public String describe() { return "🛡  Scutum — curved rectangular legionary shield"; }
        public String attack()   { return "PUSH! Shield bash breaks enemy formation!"; }
        public int    damage()   { return 20; }
    }

    // Factory base
    abstract static class WeaponFactory {
        abstract Weapon createWeapon();

        void armSoldier() {
            Weapon w = createWeapon();
            System.out.println("  Weapon issued : " + w.describe());
            System.out.println("  Combat result : " + w.attack());
            System.out.println("  Damage rating : " + w.damage() + " points");
        }
    }

    static class InfantryFactory     extends WeaponFactory { Weapon createWeapon() { return new Gladius();  } }
    static class ArcherFactory       extends WeaponFactory { Weapon createWeapon() { return new Pilum();    } }
    static class SiegeFactory        extends WeaponFactory { Weapon createWeapon() { return new Ballista(); } }
    static class ShieldBearerFactory extends WeaponFactory { Weapon createWeapon() { return new Scutum();   } }

    static void equipUnit(String unitName, WeaponFactory factory) {
        System.out.println("\n[" + unitName + "]");
        factory.armSoldier();
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   FACTORY METHOD PATTERN — Java               ║");
        System.out.println("║   Imperial Weaponry Workshop, Carnuntum       ║");
        System.out.println("╚═══════════════════════════════════════════════╝");
        System.out.println("\n📋 IMPERIAL FABRICATION ORDER — LEGIO X GEMINA");
        System.out.println("────────────────────────────────────────────────");

        equipUnit("1st Infantry Cohort",  new InfantryFactory());
        equipUnit("Archer Auxilia",       new ArcherFactory());
        equipUnit("Siege Engineering",    new SiegeFactory());
        equipUnit("Testudo Shield Wall",  new ShieldBearerFactory());

        System.out.println("\n\"Fabrica dat, miles accipit!\"");
    }
}

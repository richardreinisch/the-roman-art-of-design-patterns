// ============================================================
//  OBSERVER PATTERN — Roman Fire-Signal Network
//  "Una specula ardet, omnes vident"
//  Run: java Speculae.java
// ============================================================
import java.util.*;

public class Speculae {

    interface SignalObserver {
        void onSignal(String message, int urgency);
        String observerName();
    }

    static class RomanLegate implements SignalObserver {
        private final String name, legion;
        RomanLegate(String name, String legion) { this.name = name; this.legion = legion; }
        public String observerName() { return name; }
        public void onSignal(String msg, int urgency) {
            if (urgency >= 4) System.out.println("  ⚔  LEGATE " + name + " (" + legion + "): FULL MOBILIZATION! '" + msg + "'");
            else if (urgency >= 2) System.out.println("  📜 LEGATE " + name + ": Prepare forces. '" + msg + "'");
            else System.out.println("  📜 LEGATE " + name + ": Noted. '" + msg + "'");
        }
    }

    static class EmperorInRome implements SignalObserver {
        public String observerName() { return "Emperor Hadrian"; }
        public void onSignal(String msg, int urgency) {
            if      (urgency >= 5) System.out.println("  👑 EMPEROR: BY JUPITER! '" + msg + "'");
            else if (urgency >= 3) System.out.println("  👑 EMPEROR: Dispatch legions. '" + msg + "'");
            else                   System.out.println("  👑 EMPEROR: Send a letter. '" + msg + "'");
        }
    }

    static class ChroniclerAnnales implements SignalObserver {
        private int count = 0;
        public String observerName() { return "Chronicler"; }
        public void onSignal(String msg, int urgency) {
            System.out.printf("  📖 CHRONICLER [#%d]: Recording — '%s' (urgency=%d)%n", ++count, msg, urgency);
        }
        int getCount() { return count; }
    }

    static class SignalTower {
        private final String location;
        private final List<SignalObserver> observers = new ArrayList<>();

        SignalTower(String location) { this.location = location; }

        void subscribe(SignalObserver o) {
            observers.add(o);
            System.out.println("  + " + o.observerName() + " subscribed to " + location);
        }
        void unsubscribe(SignalObserver o) {
            observers.remove(o);
            System.out.println("  - " + o.observerName() + " unsubscribed");
        }
        void fireSignal(String msg, int urgency) {
            System.out.printf("%n🔥 SIGNAL from %s [URGENCY=%d/5]: %s%n   Notifying %d observer(s):%n",
                              location, urgency, msg, observers.size());
            observers.forEach(o -> o.onSignal(msg, urgency));
        }
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   OBSERVER PATTERN — Java                     ║");
        System.out.println("║   Roman Fire-Signal Network (Speculae)        ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        var tower      = new SignalTower("Hadrian's Wall — Milecastle 39");
        var legate     = new RomanLegate("Gnaeus Pompeius Julius", "Legio XX");
        var emperor    = new EmperorInRome();
        var chronicler = new ChroniclerAnnales();

        System.out.println("── SUBSCRIBING ─────────────────────────────────");
        tower.subscribe(legate); tower.subscribe(emperor); tower.subscribe(chronicler);

        System.out.println("\n── SIGNAL EVENTS ────────────────────────────────");
        tower.fireSignal("Small Pictish hunting party spotted", 1);
        tower.fireSignal("200 armed Picts approaching!", 3);
        tower.fireSignal("FULL TRIBAL INVASION! 10,000 warriors!", 5);

        System.out.println("\n── EMPEROR LEAVES ───────────────────────────────");
        tower.unsubscribe(emperor);
        tower.fireSignal("Picts retreated — situation stabilised", 1);

        System.out.printf("%nTotal events chronicled: %d%n", chronicler.getCount());
        System.out.println("\"Una specula ardet, omnes vident!\"");
    }
}

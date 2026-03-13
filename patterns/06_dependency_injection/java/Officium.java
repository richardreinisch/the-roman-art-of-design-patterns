// ============================================================
//  DEPENDENCY INJECTION — The Praetorian Quartermaster
//  Run: java Officium.java
// ============================================================
import java.util.*;

public class Officium {

    interface IMessenger { void send(String to, String msg); }
    interface ILogger    { void log(String event); }

    record ScrollMessenger() implements IMessenger {
        public void send(String to, String msg) {
            System.out.printf("  📜 Scroll to %s: '%s'%n", to, msg);
        }
    }
    static class MockMessenger implements IMessenger {
        final List<String[]> sent = new ArrayList<>();
        public void send(String to, String msg) {
            sent.add(new String[]{to, msg});
            System.out.printf("  🧪 MOCK: to=%s msg='%s'%n", to, msg);
        }
    }
    record ConsoleLogger() implements ILogger {
        public void log(String event) { System.out.println("  [LOG] " + event); }
    }

    static class MilitaryCampaign {
        private final IMessenger messenger;
        private final ILogger    logger;

        // Constructor injection
        MilitaryCampaign(IMessenger messenger, ILogger logger) {
            this.messenger = messenger;
            this.logger    = logger;
        }

        void launchAttack(String target) {
            logger.log("Campaign launched against " + target);
            messenger.send("Praetorian Guard", "ADVANCE on " + target + "!");
            messenger.send("Supply Corps",     "Provisions to " + target);
            logger.log("Orders dispatched");
        }
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   DEPENDENCY INJECTION — Java                 ║");
        System.out.println("║   The Praetorian Quartermaster                ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        System.out.println("── PRODUCTION ───────────────────────────────────");
        new MilitaryCampaign(new ScrollMessenger(), new ConsoleLogger())
            .launchAttack("Gaul");

        System.out.println("\n── TESTING (mock) ───────────────────────────────");
        var mock = new MockMessenger();
        new MilitaryCampaign(mock, new ConsoleLogger()).launchAttack("Britannia");
        System.out.println("  Mock captured: " + mock.sent.size() + " messages ✓");

        System.out.println("\n\"Non ipse quaerit, accipit!\"");
    }
}

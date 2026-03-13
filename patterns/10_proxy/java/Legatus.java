// ============================================================
//  PROXY PATTERN — The Imperial Legatus
//  Run: java Legatus.java
// ============================================================
import java.util.*;

public class Legatus {

    interface IImperialService {
        String issueDecree(String province, String decree);
        String getCensus(String province);
    }

    static class EmperorHadrian implements IImperialService {
        EmperorHadrian() { System.out.println("  👑 Emperor Hadrian awakens from his nap!"); }
        public String issueDecree(String p, String d) {
            return "👑 IMPERIAL DECREE for " + p + ": '" + d + "' — Signed, Hadrianus P.P.";
        }
        public String getCensus(String p) {
            return "👑 Census of " + p + ": ~50,000 inhabitants (all paying taxes)";
        }
    }

    static class LegateProxy implements IImperialService {
        private EmperorHadrian emperor;
        private final Map<String, String> cache = new HashMap<>();
        private final Set<String> authorized = new HashSet<>(
            Arrays.asList("Syria","Aegyptus","Britannia","Gallia","Hispania"));
        private int count = 0;

        private EmperorHadrian getEmperor() {
            if (emperor == null) {
                System.out.println("  [Proxy] First real request — waking the Emperor...");
                emperor = new EmperorHadrian();
            }
            return emperor;
        }
        private void log(String action) {
            System.out.printf("  [Log #%d] %s%n", ++count, action);
        }
        public String issueDecree(String p, String d) {
            log("Decree for '" + p + "'");
            if (!authorized.contains(p))
                return "🚫 ACCESS DENIED: '" + p + "' is not an authorized province!";
            return getEmperor().issueDecree(p, d);
        }
        public String getCensus(String p) {
            log("Census for '" + p + "'");
            if (cache.containsKey(p)) {
                System.out.println("  [Cache HIT] " + p);
                return cache.get(p);
            }
            String r = getEmperor().getCensus(p);
            cache.put(p, r);
            return r;
        }
        int getCount() { return count; }
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   PROXY PATTERN — Java                        ║");
        System.out.println("║   The Imperial Legatus                        ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        var proxy = new LegateProxy();

        System.out.println("── PROTECTION: Unauthorized ────────────────────");
        System.out.println(proxy.issueDecree("Barbaria", "Build roads!"));

        System.out.println("\n── AUTHORIZED (lazy-init Emperor) ──────────────");
        System.out.println(proxy.issueDecree("Britannia", "Build Hadrian's Wall"));

        System.out.println("\n── CACHING: Census ──────────────────────────────");
        System.out.println(proxy.getCensus("Aegyptus"));
        System.out.println("\n  (Second call — cached)");
        System.out.println(proxy.getCensus("Aegyptus"));

        System.out.println("\n  Total requests: " + proxy.getCount());
        System.out.println("\"Legatus vocem imperatoris habet!\"");
    }
}

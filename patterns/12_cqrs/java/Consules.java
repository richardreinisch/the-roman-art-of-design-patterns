// ============================================================
//  CQRS PATTERN — The Two Consuls
//  "Qui legit non scribit; qui scribit non legit"
//  Run: java Consules.java
// ============================================================
import java.util.*;
import java.util.stream.*;

public class Consules {

    record Legion(String id, String name, String province, int strength, boolean active) {}
    record Event(String type, String legionId, String name, String province, int strength) {}

    static class WriteStore {
        Map<String, Legion> legions = new LinkedHashMap<>();
        List<Event>         events  = new ArrayList<>();
        void apply(Event e) {
            events.add(e);
            if ("ENROLL".equals(e.type()))
                legions.put(e.legionId(), new Legion(e.legionId(), e.name(), e.province(), e.strength(), true));
            if ("DEPLOY".equals(e.type())) {
                var l = legions.get(e.legionId());
                if (l != null) legions.put(l.id(), new Legion(l.id(), l.name(), e.province(), l.strength(), l.active()));
            }
        }
    }

    static class ReadStore {
        Map<String, Legion> views = new LinkedHashMap<>();
        void project(Event e) {
            if ("ENROLL".equals(e.type()))
                views.put(e.legionId(), new Legion(e.legionId(), e.name(), e.province(), e.strength(), true));
            if ("DEPLOY".equals(e.type())) {
                var l = views.get(e.legionId());
                if (l != null) views.put(l.id(), new Legion(l.id(), l.name(), e.province(), l.strength(), l.active()));
            }
        }
        List<Legion> query(String province) {
            return views.values().stream()
                .filter(l -> l.active() && (province.isEmpty() || l.province().equals(province)))
                .collect(Collectors.toList());
        }
    }

    static class CommandConsul {
        private final WriteStore write; private final ReadStore read; private int id = 0;
        CommandConsul(WriteStore w, ReadStore r) { write=w; read=r; }
        String enroll(String name, String province, int strength) {
            String lid = "leg-" + (++id);
            var e = new Event("ENROLL", lid, name, province, strength);
            write.apply(e); read.project(e);
            System.out.println("  ⚔  ENROLLED: " + name + " [" + lid + "]");
            return lid;
        }
        void deploy(String lid, String province) {
            var e = new Event("DEPLOY", lid, "", province, 0);
            write.apply(e); read.project(e);
            System.out.println("  ⚔  DEPLOYED: " + lid + " → " + province);
        }
    }

    static class QueryConsul {
        private final ReadStore read;
        QueryConsul(ReadStore r) { read=r; }
        void listActive(String province) {
            String label = province.isEmpty() ? "all provinces" : province;
            System.out.println("  📖 QUERY: Active in " + label + ":");
            read.query(province).forEach(l ->
                System.out.println("    🦅 " + l.name() + " [" + l.id() + "] in " + l.province() + " (" + l.strength() + ")"));
        }
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   CQRS PATTERN — Java                         ║");
        System.out.println("║   The Two Consuls                             ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        var write = new WriteStore(); var read = new ReadStore();
        var cmd   = new CommandConsul(write, read);
        var query = new QueryConsul(read);

        System.out.println("── COMMANDING CONSUL (Write Side) ──────────────");
        var id1 = cmd.enroll("Legio I Germanica",   "Gallia",   5000);
        var id2 = cmd.enroll("Legio X Gemina",      "Hispania", 4800);
        cmd.enroll("Legio XII Fulminata", "Gallia", 4200);
        cmd.deploy(id1, "Germania");

        System.out.println("\n── READING CONSUL (Query Side) ─────────────────");
        query.listActive("");
        System.out.println();
        query.listActive("Germania");

        System.out.println("\n\"Qui legit non scribit; qui scribit non legit!\"");
    }
}

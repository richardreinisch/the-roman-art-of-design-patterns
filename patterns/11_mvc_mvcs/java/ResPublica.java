// ============================================================
//  MVC/MVCS PATTERN — The Roman Republic
//  Run: java ResPublica.java
// ============================================================
import java.util.*;
import java.util.stream.*;

public class ResPublica {

    record Legion(int id, String name, String province, int strength) {
        Legion withStrength(int s) { return new Legion(id, name, province, s); }
        Legion withProvince(String p) { return new Legion(id, name, p, strength); }
    }

    // MODEL
    static class LegionModel {
        private final Map<Integer, Legion> legions = new LinkedHashMap<>();
        private int nextId = 1;
        Legion add(String name, int strength, String province) {
            Legion l = new Legion(nextId++, name, province, strength);
            legions.put(l.id(), l); return l;
        }
        List<Legion> getAll()                 { return new ArrayList<>(legions.values()); }
        List<Legion> getByProvince(String p)  { return legions.values().stream().filter(l->l.province().equals(p)).collect(Collectors.toList()); }
        void update(Legion l)                 { legions.put(l.id(), l); }
        int totalStrength()                   { return legions.values().stream().mapToInt(Legion::strength).sum(); }
    }

    // VIEW
    static class LegionView {
        void renderList(List<Legion> legs) {
            System.out.println("\n  ╔══ IMPERIAL LEGION REGISTRY (SPQR) ══╗");
            legs.forEach(l -> System.out.printf("  ║ [%d] %-22s %-10s %5d ║%n",
                                                l.id(), l.name(), l.province(), l.strength()));
            System.out.println("  ╚══════════════════════════════════════╝");
        }
        void showMsg(String m)      { System.out.println("  📢 " + m); }
        void showStrength(int n)    { System.out.printf("  ⚔  Total: %,d soldiers%n", n); }
    }

    // SERVICE
    static class LegionService {
        private final LegionModel model;
        LegionService(LegionModel m) { this.model = m; }
        String reinforce(String province, int troops) {
            var legs = model.getByProvince(province);
            if (legs.isEmpty()) return "No legions in " + province;
            int per = troops / legs.size();
            legs.forEach(l -> model.update(l.withStrength(l.strength() + per)));
            return "+" + troops + " troops to " + legs.size() + " legion(s) in " + province;
        }
    }

    // CONTROLLER
    static class LegionController {
        private final LegionModel model; private final LegionView view; private final LegionService service;
        LegionController(LegionModel m, LegionView v, LegionService s) { model=m; view=v; service=s; }
        void addLegion(String name, int strength, String province) {
            model.add(name, strength, province);
            view.showMsg("Legion '" + name + "' enrolled");
            view.renderList(model.getAll());
        }
        void reinforce(String province, int count) {
            view.showMsg(service.reinforce(province, count));
            view.renderList(model.getAll());
        }
        void showStrength() { view.showStrength(model.totalStrength()); }
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   MVC/MVCS PATTERN — Java                     ║");
        System.out.println("║   The Roman Republic                          ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        var model   = new LegionModel();
        var view    = new LegionView();
        var service = new LegionService(model);
        var ctrl    = new LegionController(model, view, service);

        ctrl.addLegion("Legio I Germanica",   5000, "Germania");
        ctrl.addLegion("Legio X Gemina",      4800, "Hispania");
        ctrl.addLegion("Legio XII Fulminata", 4200, "Germania");

        System.out.println("\n── REINFORCE GERMANIA ──────────────────────────");
        ctrl.reinforce("Germania", 3000);
        ctrl.showStrength();
        System.out.println("\n\"Divide et impera!\"");
    }
}

// ============================================================
//  COMMAND PATTERN — Imperial Building Commands
//  Run: java Mandatum.java
// ============================================================
import java.util.*;

public class Mandatum {

    static class RomeArchitect {
        final List<String> buildings = new ArrayList<>();
        String build(String s) {
            buildings.add(s);
            return "🏛  " + s + " BUILT! " + buildings;
        }
        String demolish(String s) {
            buildings.remove(s);
            return "🔨 " + s + " DEMOLISHED! " + buildings;
        }
    }

    interface ImperialCommand { String execute(); String undo(); }

    static class BuildCmd implements ImperialCommand {
        private final RomeArchitect arch;
        private final String building;
        BuildCmd(RomeArchitect a, String b) { this.arch = a; this.building = b; }
        public String execute() { return arch.build(building); }
        public String undo()    { return arch.demolish(building); }
    }

    static class ImperialPalace {
        private final Deque<ImperialCommand> history = new ArrayDeque<>();
        private final Deque<ImperialCommand> undone  = new ArrayDeque<>();

        String issue(ImperialCommand cmd) {
            String r = cmd.execute();
            history.push(cmd); undone.clear();
            return r;
        }
        String undoLast() {
            if (history.isEmpty()) return "Nothing to undo!";
            var cmd = history.pop(); undone.push(cmd);
            return cmd.undo();
        }
        String redoLast() {
            if (undone.isEmpty()) return "Nothing to redo!";
            var cmd = undone.pop(); history.push(cmd);
            return cmd.execute();
        }
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   COMMAND PATTERN — Java                      ║");
        System.out.println("║   Imperial Building Commands                  ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        var arch   = new RomeArchitect();
        var palace = new ImperialPalace();

        System.out.println("── ISSUING COMMANDS ────────────────────────────");
        System.out.println(palace.issue(new BuildCmd(arch, "Colosseum")));
        System.out.println(palace.issue(new BuildCmd(arch, "Aqua Claudia")));
        System.out.println(palace.issue(new BuildCmd(arch, "Temple of Jupiter")));

        System.out.println("\n── UNDO ─────────────────────────────────────────");
        System.out.println(palace.undoLast());
        System.out.println(palace.undoLast());

        System.out.println("\n── REDO ─────────────────────────────────────────");
        System.out.println(palace.redoLast());

        System.out.println("\n\"Mandatum datum, mandatum executum!\"");
    }
}

// ============================================================
//  REPOSITORY PATTERN — The Imperial Archive (Tabularium)
//  Run: java Tabularium.java
// ============================================================
import java.util.*;
import java.util.stream.*;

public class Tabularium {

    record Centurion(String id, String name, String legion, String rank, int battlesWon) {
        Centurion withRank(String newRank) { return new Centurion(id, name, legion, newRank, battlesWon); }
    }

    interface ICenturionRepository {
        Optional<Centurion> findById(String id);
        List<Centurion>     findByLegion(String legion);
        List<Centurion>     findAll();
        Centurion           save(Centurion c);
        boolean             delete(String id);
    }

    static class InMemoryCenturionRepository implements ICenturionRepository {
        private final Map<String, Centurion> store = new LinkedHashMap<>();

        public Optional<Centurion> findById(String id) { return Optional.ofNullable(store.get(id)); }
        public List<Centurion> findByLegion(String l)  {
            return store.values().stream().filter(c -> c.legion().equals(l)).collect(Collectors.toList());
        }
        public List<Centurion> findAll() { return new ArrayList<>(store.values()); }
        public Centurion save(Centurion c) {
            store.put(c.id(), c);
            System.out.printf("  📚 Saved: %s (%s) [%s]%n", c.name(), c.rank(), c.id());
            return c;
        }
        public boolean delete(String id) { return store.remove(id) != null; }
    }

    static class CenturionService {
        private final ICenturionRepository repo;
        CenturionService(ICenturionRepository r) { this.repo = r; }

        String promoteBest(String legion) {
            return repo.findByLegion(legion).stream()
                .max(Comparator.comparingInt(Centurion::battlesWon))
                .map(best -> {
                    repo.save(best.withRank("Primus Pilus"));
                    return "🎖  " + best.name() + " promoted to Primus Pilus! (" + best.battlesWon() + " battles)";
                })
                .orElse("No centurions in " + legion);
        }
    }

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   REPOSITORY PATTERN — Java                   ║");
        System.out.println("║   The Imperial Archive (Tabularium)           ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        var repo = new InMemoryCenturionRepository();
        repo.save(new Centurion("c1", "Marcus Aurelius",   "Legio X",  "Centurion", 15));
        repo.save(new Centurion("c2", "Gaius Petronius",   "Legio X",  "Centurion", 23));
        repo.save(new Centurion("c3", "Publius Quinctius", "Legio XII","Centurion",  7));
        repo.save(new Centurion("c4", "Titus Labienus",    "Legio X",  "Centurion", 31));

        System.out.println("\n── QUERY: All Legio X Centurions ───────────────");
        repo.findByLegion("Legio X")
            .forEach(c -> System.out.println("  " + c.name() + " — " + c.battlesWon() + " battles"));

        System.out.println("\n── SERVICE: Promote Best in Legio X ────────────");
        System.out.println("  " + new CenturionService(repo).promoteBest("Legio X"));

        System.out.println("\n── VERIFY ──────────────────────────────────────");
        repo.findById("c4").ifPresent(c -> System.out.println("  " + c.name() + " is now: " + c.rank()));

        System.out.println("\n\"Ubi data est? Tabularius scit!\"");
    }
}

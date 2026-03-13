<?php
/**
 * PROXY PATTERN — The Imperial Legatus
 * Run: php legatus.php
 */
declare(strict_types=1);

interface IImperialService {
    public function issueDecree(string $province, string $decree): string;
    public function getCensus(string $province): string;
}
class EmperorHadrian implements IImperialService {
    public function __construct() { echo "  👑 Emperor Hadrian awakens from his nap!\n"; }
    public function issueDecree(string $p, string $d): string {
        return "👑 IMPERIAL DECREE for {$p}: '{$d}' — Signed, Hadrianus P.P.";
    }
    public function getCensus(string $p): string {
        return "👑 Census of {$p}: Population ~50,000 (all paying taxes...)";
    }
}
class LegateProxy implements IImperialService {
    private ?EmperorHadrian $emperor = null;
    private array $cache = [];
    private int   $count = 0;
    private array $authorized = ["Syria","Aegyptus","Britannia","Gallia","Hispania"];
    private function getEmperor(): EmperorHadrian {
        if ($this->emperor === null) {
            echo "  [Proxy] First real request — waking the Emperor...\n";
            $this->emperor = new EmperorHadrian();
        }
        return $this->emperor;
    }
    private function log(string $action): void {
        echo "  [Log #" . ++$this->count . "] {$action}\n";
    }
    public function issueDecree(string $p, string $d): string {
        $this->log("Decree for '{$p}'");
        if (!in_array($p, $this->authorized))
            return "🚫 ACCESS DENIED: '{$p}' is not an authorized province!";
        return $this->getEmperor()->issueDecree($p, $d);
    }
    public function getCensus(string $p): string {
        $this->log("Census for '{$p}'");
        if (isset($this->cache[$p])) {
            echo "  [Cache HIT] Returning cached census for {$p}\n";
            return $this->cache[$p];
        }
        $r = $this->getEmperor()->getCensus($p);
        $this->cache[$p] = $r;
        return $r;
    }
    public function getCount(): int { return $this->count; }
}

echo "╔═══════════════════════════════════════════════╗\n";
echo "║   PROXY PATTERN — PHP                         ║\n";
echo "║   The Imperial Legatus                        ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";
$svc = new LegateProxy();
echo "── PROTECTION: Unauthorized ────────────────────\n";
echo $svc->issueDecree("Barbaria", "Build roads!") . "\n";
echo "\n── AUTHORIZED REQUESTS ─────────────────────────\n";
echo $svc->issueDecree("Britannia", "Build Hadrian's Wall") . "\n";
echo "\n── CACHING: Census ──────────────────────────────\n";
echo $svc->getCensus("Aegyptus") . "\n";
echo "\n  (Second call)\n";
echo $svc->getCensus("Aegyptus") . "\n";
echo "\n  Total requests: " . $svc->getCount() . "\n";
echo "\"Legatus vocem imperatoris habet!\"\n";

<?php
/**
 * DEPENDENCY INJECTION — The Praetorian Quartermaster
 * Run: php officium.php
 */
declare(strict_types=1);

interface IMessenger { public function send(string $to, string $msg): void; }
interface ILogger    { public function log(string $event): void; }

class ScrollMessenger implements IMessenger {
    public function send(string $to, string $msg): void {
        echo "  📜 Scroll to {$to}: '{$msg}'\n";
    }
}
class MockMessenger implements IMessenger {
    public array $sent = [];
    public function send(string $to, string $msg): void {
        $this->sent[] = [$to, $msg];
        echo "  🧪 MOCK to={$to}: '{$msg}'\n";
    }
}
class ConsoleLogger implements ILogger {
    public function log(string $event): void { echo "  [LOG] {$event}\n"; }
}

class MilitaryCampaign {
    public function __construct(
        private IMessenger $messenger,
        private ILogger    $logger
    ) {}
    public function launchAttack(string $target): void {
        $this->logger->log("Campaign against {$target}");
        $this->messenger->send("Praetorian Guard", "ADVANCE on {$target}!");
        $this->messenger->send("Supply Corps",     "Provisions to {$target}");
        $this->logger->log("Orders dispatched");
    }
}

echo "╔═══════════════════════════════════════════════╗\n";
echo "║   DEPENDENCY INJECTION — PHP                  ║\n";
echo "║   The Praetorian Quartermaster                ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";

echo "── PRODUCTION ───────────────────────────────────\n";
(new MilitaryCampaign(new ScrollMessenger(), new ConsoleLogger()))->launchAttack("Gaul");

echo "\n── TESTING (mock) ───────────────────────────────\n";
$mock = new MockMessenger();
(new MilitaryCampaign($mock, new ConsoleLogger()))->launchAttack("Britannia");
echo "  Mock captured: " . count($mock->sent) . " messages ✓\n";
echo "\n\"Non ipse quaerit, accipit!\"\n";

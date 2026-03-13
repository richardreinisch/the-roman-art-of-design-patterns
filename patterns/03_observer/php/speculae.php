<?php
/**
 * OBSERVER PATTERN — Roman Fire-Signal Network (Speculae)
 * "Una specula ardet, omnes vident" — One tower burns, all see it
 *
 * Run: php speculae.php
 */

declare(strict_types=1);

// ─── OBSERVER INTERFACE ──────────────────────────────────────
interface SignalObserver
{
    public function onSignal(string $message, int $urgency): void;
    public function getObserverName(): string;
}

// ─── CONCRETE OBSERVERS ──────────────────────────────────────
class RomanLegate implements SignalObserver
{
    public function __construct(
        private string $name,
        private string $legion
    ) {}

    public function getObserverName(): string { return $this->name; }

    public function onSignal(string $message, int $urgency): void
    {
        if ($urgency >= 4) {
            echo "  ⚔  LEGATE {$this->name} ({$this->legion}): "
               . "FULL MOBILIZATION! '{$message}'\n";
        } elseif ($urgency >= 2) {
            echo "  📜 LEGATE {$this->name} ({$this->legion}): "
               . "Prepare forces. '{$message}'\n";
        } else {
            echo "  📜 LEGATE {$this->name}: Noted. '{$message}'\n";
        }
    }
}

class EmperorInRome implements SignalObserver
{
    public function getObserverName(): string { return "Emperor Hadrian"; }

    public function onSignal(string $message, int $urgency): void
    {
        if ($urgency >= 5) {
            echo "  👑 EMPEROR: BY JUPITER! SOUND ALL TRUMPETS! '{$message}'\n";
        } elseif ($urgency >= 3) {
            echo "  👑 EMPEROR: Dispatch two legions immediately. '{$message}'\n";
        } else {
            echo "  👑 EMPEROR: Send a response letter. '{$message}'\n";
        }
    }
}

class ChroniclerAnnales implements SignalObserver
{
    private int $eventCount = 0;

    public function getObserverName(): string { return "Chronicler Annales"; }

    public function onSignal(string $message, int $urgency): void
    {
        ++$this->eventCount;
        echo "  📖 CHRONICLER [Event #{$this->eventCount}]: "
           . "Recording — '{$message}' (urgency={$urgency})\n";
    }

    public function getEventCount(): int { return $this->eventCount; }
}

class SupplyOfficer implements SignalObserver
{
    public function getObserverName(): string { return "Supply Officer"; }

    public function onSignal(string $message, int $urgency): void
    {
        if ($urgency >= 3) {
            echo "  🍞 SUPPLY OFFICER: Preparing emergency rations for mobilization.\n";
        }
    }
}

// ─── SUBJECT (SIGNAL TOWER) ──────────────────────────────────
class SignalTower
{
    /** @var SignalObserver[] */
    private array $observers = [];

    public function __construct(private string $location) {}

    public function subscribe(SignalObserver $observer): void
    {
        $this->observers[] = $observer;
        echo "  + " . $observer->getObserverName() . " subscribed to {$this->location}\n";
    }

    public function unsubscribe(SignalObserver $observer): void
    {
        $this->observers = array_filter(
            $this->observers,
            fn($o) => $o !== $observer
        );
        echo "  - " . $observer->getObserverName() . " unsubscribed from {$this->location}\n";
    }

    public function fireSignal(string $message, int $urgency = 1): void
    {
        $count = count($this->observers);
        echo "\n🔥 SIGNAL from {$this->location} [URGENCY={$urgency}/5]: {$message}\n";
        echo "   Notifying {$count} observer(s):\n";
        foreach ($this->observers as $observer) {
            $observer->onSignal($message, $urgency);
        }
    }

    public function getObserverCount(): int { return count($this->observers); }
}


// ─── DEMONSTRATION ───────────────────────────────────────────
echo "╔═══════════════════════════════════════════════╗\n";
echo "║   OBSERVER PATTERN — PHP                      ║\n";
echo "║   Roman Fire-Signal Network (Speculae)        ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";

$tower      = new SignalTower("Hadrian's Wall — Milecastle 39");
$legate     = new RomanLegate("Gnaeus Pompeius Julius", "Legio XX Valeria Victrix");
$emperor    = new EmperorInRome();
$chronicler = new ChroniclerAnnales();
$supply     = new SupplyOfficer();

echo "── SUBSCRIBING OBSERVERS ───────────────────────\n";
$tower->subscribe($legate);
$tower->subscribe($emperor);
$tower->subscribe($chronicler);
$tower->subscribe($supply);

echo "\n── SIGNAL EVENTS ───────────────────────────────";
$tower->fireSignal("Scout reports: small Pictish hunting party", 1);
$tower->fireSignal("Border patrol: 200 armed Picts approaching", 3);
$tower->fireSignal("EMERGENCY: Full Pictish tribal invasion! 10,000 warriors!", 5);

echo "\n── SUBSCRIPTION CHANGE ─────────────────────────\n";
echo "  (Emperor goes on holiday to Hadrian's Villa)\n";
$tower->unsubscribe($emperor);
$tower->fireSignal("Situation stabilised — Picts retreated", 1);

echo "\n── SUMMARY ─────────────────────────────────────\n";
echo "  Total events chronicled: " . $chronicler->getEventCount() . "\n";
echo "  Current observers: " . $tower->getObserverCount() . "\n";
echo "  \"Una specula ardet, omnes vident!\"\n";

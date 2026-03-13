<?php
/**
 * COMMAND PATTERN — Imperial Building Commands
 * Run: php mandatum.php
 */
declare(strict_types=1);

class RomeArchitect {
    private array $buildings = [];
    public function build(string $s): string {
        $this->buildings[] = $s;
        return "🏛  {$s} BUILT! [" . implode(", ", $this->buildings) . "]";
    }
    public function demolish(string $s): string {
        $this->buildings = array_values(array_filter($this->buildings, fn($b) => $b !== $s));
        return "🔨 {$s} DEMOLISHED! [" . implode(", ", $this->buildings) . "]";
    }
}
interface ImperialCommand {
    public function execute(): string;
    public function undo():    string;
}
class BuildCmd implements ImperialCommand {
    public function __construct(private RomeArchitect $arch, private string $building) {}
    public function execute(): string { return $this->arch->build($this->building); }
    public function undo():    string { return $this->arch->demolish($this->building); }
}
class ImperialPalace {
    private array $history = [];
    private array $undone  = [];
    public function issue(ImperialCommand $cmd): string {
        $r = $cmd->execute(); $this->history[] = $cmd; $this->undone = []; return $r;
    }
    public function undoLast(): string {
        if (!$this->history) return "Nothing to undo!";
        $cmd = array_pop($this->history); $this->undone[] = $cmd; return $cmd->undo();
    }
    public function redoLast(): string {
        if (!$this->undone) return "Nothing to redo!";
        $cmd = array_pop($this->undone); $this->history[] = $cmd; return $cmd->execute();
    }
}

echo "╔═══════════════════════════════════════════════╗\n";
echo "║   COMMAND PATTERN — PHP                       ║\n";
echo "║   Imperial Building Commands                  ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";
$arch = new RomeArchitect(); $palace = new ImperialPalace();
echo "── ISSUING COMMANDS ────────────────────────────\n";
echo $palace->issue(new BuildCmd($arch, "Colosseum"))         . "\n";
echo $palace->issue(new BuildCmd($arch, "Aqua Claudia"))      . "\n";
echo $palace->issue(new BuildCmd($arch, "Temple of Jupiter")) . "\n";
echo "\n── UNDO ────────────────────────────────────────\n";
echo $palace->undoLast() . "\n";
echo $palace->undoLast() . "\n";
echo "\n── REDO ────────────────────────────────────────\n";
echo $palace->redoLast() . "\n";
echo "\n\"Mandatum datum, mandatum executum!\"\n";

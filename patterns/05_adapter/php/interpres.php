<?php
/**
 * ADAPTER PATTERN — The Roman Interpreter (Interpres)
 * Run: php interpres.php
 */
declare(strict_types=1);

class BarbarianPaymentSystem {
    private float $torcs = 500.0;
    public function payInCelticCoins(float $goldTorcs): string {
        if ($goldTorcs > $this->torcs) throw new \RuntimeException("Non satis torc!");
        $this->torcs -= $goldTorcs;
        return "Celtic transfer: {$goldTorcs} gold torcs sent";
    }
    public function getExchangeRate(): float { return 3.7; }
    public function getTorcBalance(): float  { return $this->torcs; }
}

interface RomanPaymentInterface {
    public function payInDenarii(float $denarii, string $payer): string;
    public function getBalance(): float;
}

class BarbarianToRomanAdapter implements RomanPaymentInterface {
    private float $balance = 5000.0;
    public function __construct(private BarbarianPaymentSystem $barbarian) {}
    public function payInDenarii(float $denarii, string $payer): string {
        $torcs  = $denarii / $this->barbarian->getExchangeRate();
        $result = $this->barbarian->payInCelticCoins($torcs);
        $this->balance -= $denarii;
        return "[ADAPTER] {$payer} pays {$denarii} den → {$torcs} torcs | {$result}";
    }
    public function getBalance(): float { return $this->balance; }
}

function romanMerchantTransaction(RomanPaymentInterface $p, string $payer, float $amount): void {
    echo $p->payInDenarii($amount, $payer) . "\n";
    echo "  Balance: " . $p->getBalance() . " denarii\n";
}

echo "╔═══════════════════════════════════════════════╗\n";
echo "║   ADAPTER PATTERN — PHP                       ║\n";
echo "║   The Roman Interpreter (Interpres)           ║\n";
echo "╚═══════════════════════════════════════════════╝\n\n";
$bank    = new BarbarianPaymentSystem();
$adapter = new BarbarianToRomanAdapter($bank);
echo "── ROMAN MERCHANT USING ADAPTER ────────────────\n";
romanMerchantTransaction($adapter, "Marcus Aurelius", 370);
romanMerchantTransaction($adapter, "Gaius Petronius", 185);
echo "\n── DIRECT CELTIC BANK CHECK ────────────────────\n";
echo "  Torcs remaining: " . $bank->getTorcBalance() . "\n";
echo "\n\"Interpres pontem verborum aedificat!\"\n";

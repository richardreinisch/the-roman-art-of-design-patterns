// ============================================================
//  ADAPTER PATTERN — The Roman Interpreter (Interpres)
//  "Interpres pontem verborum aedificat"
//  The interpreter builds a bridge of words
//
//  Compile:  g++ -std=c++17 -o interpres interpres.cpp
//  Run:      ./interpres
// ============================================================
#include <iostream>
#include <string>
#include <stdexcept>

// ─── ADAPTEE (legacy Celtic payment system) ──────────────────
class BarbarianPaymentSystem {
    double torcs = 500.0;
public:
    std::string payInCelticCoins(double goldTorcs) {
        if (goldTorcs > torcs) throw std::runtime_error("Non satis torc!");
        torcs -= goldTorcs;
        return "Celtic transfer: " + std::to_string(goldTorcs) + " gold torcs sent";
    }
    double getExchangeRateTorcToDenarii() const { return 3.7; }
    double getTorcBalance() const { return torcs; }
};

// ─── TARGET INTERFACE (what Rome expects) ────────────────────
class RomanPaymentInterface {
public:
    virtual ~RomanPaymentInterface() = default;
    virtual std::string payInDenarii(double denarii, const std::string& payer) = 0;
    virtual double      getBalanceInDenarii() const = 0;
};

// ─── ADAPTER ─────────────────────────────────────────────────
class BarbarianToRomanAdapter : public RomanPaymentInterface {
    BarbarianPaymentSystem& _barbarian;
    double _balance = 5000.0;
public:
    explicit BarbarianToRomanAdapter(BarbarianPaymentSystem& b) : _barbarian(b) {}

    std::string payInDenarii(double denarii, const std::string& payer) override {
        double rate  = _barbarian.getExchangeRateTorcToDenarii();
        double torcs = denarii / rate;
        std::string celtic_result = _barbarian.payInCelticCoins(torcs);
        _balance -= denarii;
        return "[ADAPTER] " + payer + " pays " + std::to_string((int)denarii)
             + " denarii -> " + std::to_string(torcs).substr(0,5)
             + " torcs | " + celtic_result;
    }

    double getBalanceInDenarii() const override { return _balance; }
};

// ─── CLIENT (Roman merchant — only knows RomanPaymentInterface) ──
void romanMerchantTransaction(RomanPaymentInterface& payment,
                               const std::string& payer, double amount) {
    std::cout << payment.payInDenarii(amount, payer) << "\n";
    std::cout << "  Remaining balance: " << payment.getBalanceInDenarii() << " denarii\n";
}

int main() {
    std::cout << "╔═══════════════════════════════════════════════╗\n";
    std::cout << "║   ADAPTER PATTERN — C++                       ║\n";
    std::cout << "║   The Roman Interpreter (Interpres)           ║\n";
    std::cout << "╚═══════════════════════════════════════════════╝\n\n";

    BarbarianPaymentSystem celticBank;
    BarbarianToRomanAdapter adapter(celticBank);

    std::cout << "── ROMAN MERCHANT USING ADAPTER ────────────────\n";
    romanMerchantTransaction(adapter, "Marcus Aurelius", 370.0);
    romanMerchantTransaction(adapter, "Gaius Petronius", 185.0);

    std::cout << "\n── DIRECT CELTIC BANK CHECK ────────────────────\n";
    std::cout << "  Torc reserve remaining: " << celticBank.getTorcBalance() << " torcs\n";

    std::cout << "\n── KEY INSIGHT ─────────────────────────────────\n";
    std::cout << "romanMerchantTransaction() only knows RomanPaymentInterface.\n";
    std::cout << "It has NO IDEA a Celtic torc system exists underneath.\n";
    std::cout << "\"Interpres pontem verborum aedificat!\"\n";
    return 0;
}

// ============================================================
//  SINGLETON PATTERN — The Roman Treasury (Aerarium Saturni)
//  "Unus et idem" — One and the same
//
//  Compile:  g++ -std=c++17 -o aerarium aerarium.cpp
//  Run:      ./aerarium
// ============================================================

#include <iostream>
#include <mutex>
#include <string>
#include <stdexcept>

// ─── SINGLETON CLASS ─────────────────────────────────────────
class AerariumSaturni {
private:
    static AerariumSaturni* instance;
    static std::mutex       guard;      // Praetorian guard for thread safety

    int goldReserves;

    // Private constructor — no rival emperors allowed!
    AerariumSaturni() : goldReserves(100'000) {
        std::cout << "🏛  Aerarium Saturni founded beneath the Temple of Saturn!\n";
        std::cout << "    Initial reserves: " << goldReserves << " aurei\n\n";
    }

public:
    // Delete copy constructor — duplicates are TREASON
    AerariumSaturni(const AerariumSaturni&)            = delete;
    AerariumSaturni& operator=(const AerariumSaturni&) = delete;

    // Thread-safe getInstance using double-checked locking
    static AerariumSaturni* getInstance() {
        if (instance == nullptr) {
            std::lock_guard<std::mutex> lock(guard);
            if (instance == nullptr) {   // Double-check after lock
                instance = new AerariumSaturni();
            }
        }
        return instance;
    }

    void deposit(int amount, const std::string& citizen) {
        goldReserves += amount;
        std::cout << "  ✓ " << citizen << " deposits " << amount
                  << " aurei. Total reserves: " << goldReserves << "\n";
    }

    void withdraw(int amount, const std::string& citizen) {
        if (amount > goldReserves) {
            std::cout << "  ✗ DENIED — Non est pecunia! " << citizen
                      << " requests " << amount << " but only "
                      << goldReserves << " available!\n";
            return;
        }
        goldReserves -= amount;
        std::cout << "  ✓ " << citizen << " withdraws " << amount
                  << " aurei. Remaining: " << goldReserves << "\n";
    }

    int getBalance() const { return goldReserves; }

    void showStatus() const {
        std::cout << "\n  📊 AERARIUM STATUS: " << goldReserves << " aurei secured\n";
    }
};

// Static member definitions
AerariumSaturni* AerariumSaturni::instance = nullptr;
std::mutex       AerariumSaturni::guard;


// ─── DEMONSTRATION ───────────────────────────────────────────
int main() {
    std::cout << "╔═══════════════════════════════════════════════╗\n";
    std::cout << "║      SINGLETON PATTERN — C++                  ║\n";
    std::cout << "║   The Roman Treasury (Aerarium Saturni)       ║\n";
    std::cout << "╚═══════════════════════════════════════════════╝\n\n";

    // Multiple citizens try to access "their own" treasury...
    AerariumSaturni* caesarsTreasury  = AerariumSaturni::getInstance();
    AerariumSaturni* cicerosTreasury  = AerariumSaturni::getInstance();
    AerariumSaturni* brutusTreasury   = AerariumSaturni::getInstance();

    // Prove it's the same instance
    std::cout << "Are all references the same instance?\n";
    std::cout << "  Caesar  == Cicero: " << (caesarsTreasury == cicerosTreasury ? "YES ✓" : "NO") << "\n";
    std::cout << "  Cicero  == Brutus: " << (cicerosTreasury == brutusTreasury  ? "YES ✓" : "NO") << "\n";
    std::cout << "  (Same address: " << caesarsTreasury << ")\n\n";

    // All transactions go to the SAME vault
    std::cout << "── TRANSACTIONS ────────────────────────────────\n";
    caesarsTreasury->deposit(50'000, "Caesar (war spoils from Gaul)");
    cicerosTreasury->deposit(10'000, "Cicero (legal fees)");
    cicerosTreasury->withdraw(30'000, "Cicero (bribed a juror)");
    brutusTreasury->withdraw(5'000,  "Brutus (bought a new dagger)");
    brutusTreasury->withdraw(200'000, "Brutus (tried to steal it all)"); // will fail

    caesarsTreasury->showStatus();

    std::cout << "\n── KEY INSIGHT ─────────────────────────────────\n";
    std::cout << "All three 'different' treasuries share the same\n";
    std::cout << "balance because they ARE the same object.\n";
    std::cout << "\"Unum tesaurum habemus!\" — We have ONE treasury!\n";

    return 0;
}

// ============================================================
//  DEPENDENCY INJECTION — The Praetorian Quartermaster
//  "Non ipse quaerit, accipit"
//  He does not seek himself, he receives
//
//  Compile:  g++ -std=c++17 -o officium officium.cpp
//  Run:      ./officium
// ============================================================
#include <iostream>
#include <memory>
#include <vector>
#include <string>

// ─── INTERFACES ──────────────────────────────────────────────
struct IMessenger {
    virtual ~IMessenger() = default;
    virtual void send(const std::string& to, const std::string& msg) = 0;
};
struct ILogger {
    virtual ~ILogger() = default;
    virtual void log(const std::string& event) = 0;
};

// ─── CONCRETE IMPLEMENTATIONS ────────────────────────────────
struct ScrollMessenger : IMessenger {
    void send(const std::string& to, const std::string& msg) override {
        std::cout << "  📜 Scroll dispatched to " << to << ": '" << msg << "'\n";
    }
};
struct SignalFireMessenger : IMessenger {
    void send(const std::string& to, const std::string& msg) override {
        std::cout << "  🔥 Signal fire to " << to << ": '" << msg << "'\n";
    }
};
struct MockMessenger : IMessenger {
    std::vector<std::pair<std::string,std::string>> sent;
    void send(const std::string& to, const std::string& msg) override {
        sent.push_back({to, msg});
        std::cout << "  🧪 MOCK: to=" << to << " msg='" << msg << "'\n";
    }
};
struct ConsoleLogger : ILogger {
    void log(const std::string& event) override {
        std::cout << "  [LOG] " << event << "\n";
    }
};

// ─── CLIENT: Military Campaign ───────────────────────────────
class MilitaryCampaign {
    std::shared_ptr<IMessenger> _messenger;
    std::shared_ptr<ILogger>    _logger;
public:
    // Constructor injection
    MilitaryCampaign(std::shared_ptr<IMessenger> m, std::shared_ptr<ILogger> l)
        : _messenger(std::move(m)), _logger(std::move(l)) {}

    void launchAttack(const std::string& target) {
        _logger->log("Campaign launched against " + target);
        _messenger->send("Praetorian Guard", "ADVANCE on " + target + "!");
        _messenger->send("Supply Corps",     "Move provisions to " + target);
        _logger->log("Orders dispatched");
    }
};

int main() {
    std::cout << "╔═══════════════════════════════════════════════╗\n";
    std::cout << "║   DEPENDENCY INJECTION — C++                  ║\n";
    std::cout << "║   The Praetorian Quartermaster                ║\n";
    std::cout << "╚═══════════════════════════════════════════════╝\n\n";

    std::cout << "── PRODUCTION (scroll messengers) ──────────────\n";
    MilitaryCampaign prod(
        std::make_shared<ScrollMessenger>(),
        std::make_shared<ConsoleLogger>()
    );
    prod.launchAttack("Gaul");

    std::cout << "\n── SIGNAL FIRE VARIANT ─────────────────────────\n";
    MilitaryCampaign fast(
        std::make_shared<SignalFireMessenger>(),
        std::make_shared<ConsoleLogger>()
    );
    fast.launchAttack("Britannia");

    std::cout << "\n── TESTING (mock — no real messages sent) ──────\n";
    auto mock = std::make_shared<MockMessenger>();
    MilitaryCampaign test(mock, std::make_shared<ConsoleLogger>());
    test.launchAttack("Germania");
    std::cout << "  Mock captured " << mock->sent.size() << " messages ✓\n";

    std::cout << "\n── KEY INSIGHT ─────────────────────────────────\n";
    std::cout << "MilitaryCampaign never creates its dependencies.\n";
    std::cout << "Swap ScrollMessenger for MockMessenger with ZERO code change.\n";
    std::cout << "\"Non ipse quaerit, accipit!\"\n";
    return 0;
}

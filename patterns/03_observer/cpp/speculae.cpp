// ============================================================
//  OBSERVER PATTERN — Roman Fire-Signal Network (Speculae)
//  "Una specula ardet, omnes vident"
//  One tower burns, all see it
//
//  Compile:  g++ -std=c++17 -o speculae speculae.cpp
//  Run:      ./speculae
// ============================================================

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <functional>

// ─── OBSERVER INTERFACE ──────────────────────────────────────
class SignalObserver {
public:
    virtual ~SignalObserver() = default;
    virtual void onSignal(const std::string& message, int urgency) = 0;
    virtual std::string name() const = 0;
};

// ─── CONCRETE OBSERVERS ──────────────────────────────────────
class RomanLegate : public SignalObserver {
    std::string _name;
    std::string _legion;
public:
    RomanLegate(std::string name, std::string legion)
        : _name(std::move(name)), _legion(std::move(legion)) {}

    std::string name() const override { return _name; }

    void onSignal(const std::string& message, int urgency) override {
        if (urgency >= 4) {
            std::cout << "  ⚔  LEGATE " << _name << " (" << _legion << "): "
                      << "FULL MOBILIZATION! '" << message << "'\n";
        } else if (urgency >= 2) {
            std::cout << "  📜 LEGATE " << _name << " (" << _legion << "): "
                      << "Prepare forces. '" << message << "'\n";
        } else {
            std::cout << "  📜 LEGATE " << _name << ": Noted. '" << message << "'\n";
        }
    }
};

class EmperorInRome : public SignalObserver {
public:
    std::string name() const override { return "Emperor Hadrian"; }

    void onSignal(const std::string& message, int urgency) override {
        if (urgency >= 5) {
            std::cout << "  👑 EMPEROR: BY JUPITER! SOUND ALL TRUMPETS! '"
                      << message << "'\n";
        } else if (urgency >= 3) {
            std::cout << "  👑 EMPEROR: Dispatch two legions immediately. '"
                      << message << "'\n";
        } else {
            std::cout << "  👑 EMPEROR: Send a response letter. '"
                      << message << "'\n";
        }
    }
};

class ChroniclerAnnales : public SignalObserver {
    int _eventCount = 0;
public:
    std::string name() const override { return "Chronicler Annales"; }

    void onSignal(const std::string& message, int urgency) override {
        ++_eventCount;
        std::cout << "  📖 CHRONICLER [Event #" << _eventCount << "]: "
                  << "Recording — '" << message
                  << "' (urgency=" << urgency << ")\n";
    }

    int eventCount() const { return _eventCount; }
};

class SupplyOfficer : public SignalObserver {
public:
    std::string name() const override { return "Supply Officer"; }

    void onSignal(const std::string& message, int urgency) override {
        if (urgency >= 3) {
            std::cout << "  🍞 SUPPLY OFFICER: Preparing emergency rations for mobilization.\n";
        }
        // Low urgency signals are ignored by supply
    }
};

// ─── SUBJECT (SIGNAL TOWER) ──────────────────────────────────
class SignalTower {
    std::string _location;
    std::vector<SignalObserver*> _observers;

public:
    explicit SignalTower(std::string location)
        : _location(std::move(location)) {}

    void subscribe(SignalObserver* observer) {
        _observers.push_back(observer);
        std::cout << "  + " << observer->name()
                  << " subscribed to " << _location << "\n";
    }

    void unsubscribe(SignalObserver* observer) {
        _observers.erase(
            std::remove(_observers.begin(), _observers.end(), observer),
            _observers.end()
        );
        std::cout << "  - " << observer->name()
                  << " unsubscribed from " << _location << "\n";
    }

    void fireSignal(const std::string& message, int urgency) {
        std::cout << "\n🔥 SIGNAL from " << _location
                  << " [URGENCY=" << urgency << "/5]: " << message << "\n";
        std::cout << "   Notifying " << _observers.size() << " observer(s):\n";
        for (auto* obs : _observers) {
            obs->onSignal(message, urgency);
        }
    }

    size_t observerCount() const { return _observers.size(); }
};


// ─── DEMONSTRATION ───────────────────────────────────────────
int main() {
    std::cout << "╔═══════════════════════════════════════════════╗\n";
    std::cout << "║   OBSERVER PATTERN — C++                      ║\n";
    std::cout << "║   Roman Fire-Signal Network (Speculae)        ║\n";
    std::cout << "╚═══════════════════════════════════════════════╝\n\n";

    // Create the signal tower at Hadrian's Wall
    SignalTower tower("Hadrian's Wall — Milecastle 39");

    // Create observers
    RomanLegate       legate("Gnaeus Pompeius Julius", "Legio XX Valeria Victrix");
    EmperorInRome     emperor;
    ChroniclerAnnales chronicler;
    SupplyOfficer     supply;

    // Subscribe observers
    std::cout << "── SUBSCRIBING OBSERVERS ───────────────────────\n";
    tower.subscribe(&legate);
    tower.subscribe(&emperor);
    tower.subscribe(&chronicler);
    tower.subscribe(&supply);

    // Fire signals of different urgency levels
    std::cout << "\n── SIGNAL EVENTS ───────────────────────────────";
    tower.fireSignal("Scout reports: small Pictish hunting party", 1);
    tower.fireSignal("Border patrol: 200 armed Picts approaching", 3);
    tower.fireSignal("EMERGENCY: Full Pictish tribal invasion! 10,000 warriors!", 5);

    // Dynamic subscription management
    std::cout << "\n── SUBSCRIPTION CHANGE ─────────────────────────\n";
    std::cout << "  (Emperor goes on holiday to Hadrian's Villa)\n";
    tower.unsubscribe(&emperor);

    tower.fireSignal("Situation stabilised — Picts retreated", 1);

    std::cout << "\n── SUMMARY ─────────────────────────────────────\n";
    std::cout << "  Total events chronicled: " << chronicler.eventCount() << "\n";
    std::cout << "  Current observers: " << tower.observerCount() << "\n";
    std::cout << "  \"Una specula ardet, omnes vident!\"\n";

    return 0;
}

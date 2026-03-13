// ============================================================
//  STRATEGY PATTERN — Roman Battle Formations
//  "Non una via vincimus" — We do not win by one path
//
//  Compile:  g++ -std=c++17 -o ars_bellica ars_bellica.cpp
//  Run:      ./ars_bellica
// ============================================================
#include <iostream>
#include <memory>
#include <string>
using namespace std;

struct BattleSituation { int enemies; string terrain; int morale; };

class BattleStrategy {
public:
    virtual ~BattleStrategy() = default;
    virtual string strategyName() const = 0;
    virtual string execute(const BattleSituation& s) const = 0;
};

class Testudo : public BattleStrategy {
    string strategyName() const override { return "TESTUDO (Tortoise)"; }
    string execute(const BattleSituation& s) const override {
        return "🐢 Shields locked! Advancing on " + s.terrain + " vs " +
               to_string(s.enemies) + " enemies. Casualties reduced 60%!";
    }
};
class Cuneus : public BattleStrategy {
    string strategyName() const override { return "CUNEUS (Wedge)"; }
    string execute(const BattleSituation& s) const override {
        return "🔺 CHARGE! Wedge pierces " + to_string(s.enemies) + " on " + s.terrain + "!";
    }
};
class Orbis : public BattleStrategy {
    string strategyName() const override { return "ORBIS (Circle)"; }
    string execute(const BattleSituation& s) const override {
        return "⭕ 360° defence! Morale " + to_string(s.morale) + "/10. Holding position!";
    }
};
class FugaTactica : public BattleStrategy {
    string strategyName() const override { return "FUGA TACTICA (Retreat)"; }
    string execute(const BattleSituation& s) const override {
        return "🏃 Tactical retreat from " + to_string(s.enemies) + " enemies. Regroup!";
    }
};

class RomanLegion {
    string _name;
    shared_ptr<BattleStrategy> _strategy;
public:
    RomanLegion(string n, shared_ptr<BattleStrategy> s) : _name(move(n)), _strategy(move(s)) {}
    void setStrategy(shared_ptr<BattleStrategy> s) {
        cout << "  ⚙  " << _name << ": " << _strategy->strategyName()
             << " → " << s->strategyName() << "\n";
        _strategy = move(s);
    }
    void engage(const BattleSituation& s) {
        cout << "\n  🦅 " << _name << " [" << _strategy->strategyName() << "]\n";
        cout << "     " << _strategy->execute(s) << "\n";
    }
};

int main() {
    cout << "╔═══════════════════════════════════════════════╗\n";
    cout << "║   STRATEGY PATTERN — C++                      ║\n";
    cout << "║   Roman Battle Formations                     ║\n";
    cout << "╚═══════════════════════════════════════════════╝\n\n";

    RomanLegion legion("Legio X Gemina", make_shared<Testudo>());
    legion.engage({500, "open field", 8});

    cout << "\n── SCIPIO ADAPTS TO THE BATTLEFIELD ────────────\n";
    legion.setStrategy(make_shared<Cuneus>());
    legion.engage({200, "open field", 9});

    legion.setStrategy(make_shared<Orbis>());
    legion.engage({5000, "surrounded valley", 4});

    legion.setStrategy(make_shared<FugaTactica>());
    legion.engage({10000, "ambush", 2});

    cout << "\n\"Non una via vincimus!\"\n";
    return 0;
}

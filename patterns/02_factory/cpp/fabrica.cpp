// ============================================================
//  FACTORY METHOD PATTERN — Imperial Weaponry Workshop
//  "Fabrica dat, miles accipit" — The factory gives, the soldier receives
//
//  Compile:  g++ -std=c++17 -o fabrica fabrica.cpp
//  Run:      ./fabrica
// ============================================================

#include <iostream>
#include <memory>
#include <string>
#include <vector>

// ─── PRODUCT INTERFACE ───────────────────────────────────────
class Weapon {
public:
    virtual ~Weapon() = default;
    virtual std::string describe() const = 0;
    virtual std::string attack()   const = 0;
    virtual int         damage()   const = 0;
};

// ─── CONCRETE PRODUCTS ───────────────────────────────────────
class Gladius : public Weapon {
public:
    std::string describe() const override { return "⚔  Gladius — short stabbing sword, 60cm blade"; }
    std::string attack()   const override { return "STAB forward! Enemy pierced through the shield gap!"; }
    int         damage()   const override { return 45; }
};

class Pilum : public Weapon {
public:
    std::string describe() const override { return "🏹 Pilum — heavy javelin with soft iron shank"; }
    std::string attack()   const override { return "THROW! Iron bends on impact — enemy shield useless!"; }
    int         damage()   const override { return 60; }
};

class Ballista : public Weapon {
public:
    std::string describe() const override { return "💥 Ballista — torsion siege weapon, 2-talent bolts"; }
    std::string attack()   const override { return "FIRE! Bolt penetrates 3 ranks of soldiers!"; }
    int         damage()   const override { return 150; }
};

class Scutum : public Weapon {
public:
    std::string describe() const override { return "🛡  Scutum — curved rectangular legionary shield"; }
    std::string attack()   const override { return "PUSH! Shield bash breaks enemy formation!"; }
    int         damage()   const override { return 20; }
};

// ─── CREATOR (FACTORY) BASE CLASS ────────────────────────────
class WeaponFactory {
public:
    virtual ~WeaponFactory() = default;

    // The factory method — subclasses override this
    virtual std::unique_ptr<Weapon> createWeapon() const = 0;

    // Template method using the factory method
    void armSoldier() const {
        auto weapon = createWeapon();
        std::cout << "  Weapon issued : " << weapon->describe() << "\n";
        std::cout << "  Combat result : " << weapon->attack() << "\n";
        std::cout << "  Damage rating : " << weapon->damage() << " points\n";
    }
};

// ─── CONCRETE CREATORS ───────────────────────────────────────
class InfantryFactory : public WeaponFactory {
    std::unique_ptr<Weapon> createWeapon() const override {
        return std::make_unique<Gladius>();
    }
};

class ArcherFactory : public WeaponFactory {
    std::unique_ptr<Weapon> createWeapon() const override {
        return std::make_unique<Pilum>();
    }
};

class SiegeFactory : public WeaponFactory {
    std::unique_ptr<Weapon> createWeapon() const override {
        return std::make_unique<Ballista>();
    }
};

class ShieldBearerFactory : public WeaponFactory {
    std::unique_ptr<Weapon> createWeapon() const override {
        return std::make_unique<Scutum>();
    }
};

// ─── CLIENT FUNCTION ─────────────────────────────────────────
// Note: the client only knows WeaponFactory — not the concrete weapon types!
void equipUnit(const std::string& unitName, const WeaponFactory& factory) {
    std::cout << "\n[" << unitName << "]\n";
    factory.armSoldier();
}


// ─── DEMONSTRATION ───────────────────────────────────────────
int main() {
    std::cout << "╔═══════════════════════════════════════════════╗\n";
    std::cout << "║   FACTORY METHOD PATTERN — C++                ║\n";
    std::cout << "║   Imperial Weaponry Workshop, Carnuntum       ║\n";
    std::cout << "╚═══════════════════════════════════════════════╝\n";
    std::cout << "\n📋 IMPERIAL FABRICATION ORDER — LEGIO X GEMINA\n";
    std::cout << "────────────────────────────────────────────────\n";

    // Create factories
    InfantryFactory     infantry;
    ArcherFactory       archers;
    SiegeFactory        siege;
    ShieldBearerFactory shields;

    // Equip units — client doesn't know what weapon is created!
    equipUnit("1st Infantry Cohort",  infantry);
    equipUnit("Archer Auxilia",       archers);
    equipUnit("Siege Engineering",    siege);
    equipUnit("Testudo Shield Wall",  shields);

    std::cout << "\n────────────────────────────────────────────────\n";
    std::cout << "KEY INSIGHT: The General (client) calls armSoldier()\n";
    std::cout << "without knowing whether a Gladius, Pilum, or Ballista\n";
    std::cout << "is created. The factory decides. Decoupled!\n";
    std::cout << "\"Fabrica dat, miles accipit!\"\n";

    return 0;
}

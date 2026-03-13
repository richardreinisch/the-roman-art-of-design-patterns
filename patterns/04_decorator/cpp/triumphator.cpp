// ============================================================
//  DECORATOR PATTERN — The Triumphator's Dressing Room
//  "Miles ornatur, non mutatur"
//  The soldier is adorned, not changed
//
//  Compile:  g++ -std=c++17 -o triumphator triumphator.cpp
//  Run:      ./triumphator
// ============================================================

#include <iostream>
#include <memory>
#include <string>

// ─── COMPONENT INTERFACE ─────────────────────────────────────
class Soldier {
public:
    virtual ~Soldier() = default;
    virtual std::string describe()    const = 0;
    virtual int         combatPower() const = 0;
    virtual std::string status()      const = 0;
};

// ─── CONCRETE COMPONENT ──────────────────────────────────────
class BareSoldier : public Soldier {
public:
    std::string describe()    const override { return "👤 Tiro (Recruit) — tunica, caligae sandals"; }
    int         combatPower() const override { return 5; }
    std::string status()      const override { return "Recruit"; }
};

// ─── BASE DECORATOR ──────────────────────────────────────────
class SoldierDecorator : public Soldier {
protected:
    std::shared_ptr<Soldier> wrapped;
public:
    explicit SoldierDecorator(std::shared_ptr<Soldier> s) : wrapped(std::move(s)) {}
    std::string describe()    const override { return wrapped->describe(); }
    int         combatPower() const override { return wrapped->combatPower(); }
    std::string status()      const override { return wrapped->status(); }
};

// ─── CONCRETE DECORATORS ─────────────────────────────────────
class LoricaSegmentata : public SoldierDecorator {
public:
    explicit LoricaSegmentata(std::shared_ptr<Soldier> s) : SoldierDecorator(std::move(s)) {}
    std::string describe()    const override { return wrapped->describe() + "\n              + 🛡  Lorica Segmentata (plate armour)"; }
    int         combatPower() const override { return wrapped->combatPower() + 30; }
    std::string status()      const override { return "Armoured " + wrapped->status(); }
};

class GallicHelmet : public SoldierDecorator {
public:
    explicit GallicHelmet(std::shared_ptr<Soldier> s) : SoldierDecorator(std::move(s)) {}
    std::string describe()    const override { return wrapped->describe() + "\n              + ⛑  Galic Helmet (bronze, cheek guards)"; }
    int         combatPower() const override { return wrapped->combatPower() + 15; }
    std::string status()      const override { return wrapped->status(); }
};

class PaludamentumCloak : public SoldierDecorator {
public:
    explicit PaludamentumCloak(std::shared_ptr<Soldier> s) : SoldierDecorator(std::move(s)) {}
    std::string describe()    const override { return wrapped->describe() + "\n              + 🟥 Paludamentum (general's red cloak)"; }
    int         combatPower() const override { return wrapped->combatPower() + 20; }
    std::string status()      const override { return "General " + wrapped->status(); }
};

class LaurelWreath : public SoldierDecorator {
public:
    explicit LaurelWreath(std::shared_ptr<Soldier> s) : SoldierDecorator(std::move(s)) {}
    std::string describe()    const override { return wrapped->describe() + "\n              + 🌿 LAUREL WREATH OF TRIUMPH (awarded by Senate!)"; }
    int         combatPower() const override { return wrapped->combatPower() + 50; }
    std::string status()      const override { return "TRIUMPHATOR"; }
    std::string shout()       const          { return "IO TRIUMPHE! IO TRIUMPHE! IO TRIUMPHE!"; }
};

// ─── HELPER: print soldier stats ─────────────────────────────
void showSoldier(const Soldier& s) {
    std::cout << "  Status : " << s.status() << "\n";
    std::cout << "  Outfit : " << s.describe() << "\n";
    std::cout << "  Power  : " << s.combatPower() << " points\n";
}


// ─── DEMONSTRATION ───────────────────────────────────────────
int main() {
    std::cout << "╔═══════════════════════════════════════════════╗\n";
    std::cout << "║   DECORATOR PATTERN — C++                     ║\n";
    std::cout << "║   The Triumphator's Dressing Room             ║\n";
    std::cout << "╚═══════════════════════════════════════════════╝\n\n";

    // Step 1: Bare recruit
    std::cout << "── STEP 1: The Bare Recruit ────────────────────\n";
    auto soldier = std::make_shared<BareSoldier>();
    showSoldier(*soldier);

    // Step 2: Add armour
    std::cout << "\n── STEP 2: Add Lorica Segmentata ───────────────\n";
    auto armoured = std::make_shared<LoricaSegmentata>(soldier);
    showSoldier(*armoured);

    // Step 3: Add helmet
    std::cout << "\n── STEP 3: Add Gallic Helmet ───────────────────\n";
    auto helmeted = std::make_shared<GallicHelmet>(armoured);
    showSoldier(*helmeted);

    // Step 4: Promote to General — add cloak
    std::cout << "\n── STEP 4: Promotion — Add General's Cloak ────\n";
    auto general = std::make_shared<PaludamentumCloak>(helmeted);
    showSoldier(*general);

    // Step 5: TRIUMPH! — add laurel wreath
    std::cout << "\n── STEP 5: TRIUMPH! — Add the Laurel Wreath ───\n";
    auto triumphator = std::make_shared<LaurelWreath>(general);
    showSoldier(*triumphator);
    std::cout << "\n  🎺 " << triumphator->shout() << "\n";

    std::cout << "\n── KEY INSIGHT ─────────────────────────────────\n";
    std::cout << "At every step it's still THE SAME soldier object.\n";
    std::cout << "We WRAPPED it without modifying the original class.\n";
    std::cout << "\"Miles ornatur, non mutatur!\"\n";

    return 0;
}

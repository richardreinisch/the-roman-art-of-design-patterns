#!/usr/bin/env python3
"""
DECORATOR PATTERN — The Triumphator's Dressing Room
"Miles ornatur, non mutatur" — The soldier is adorned, not changed

Run: python3 triumphator.py
"""

from __future__ import annotations
from abc import ABC, abstractmethod


# ─── COMPONENT INTERFACE ─────────────────────────────────────
class Soldier(ABC):
    @abstractmethod
    def describe(self)     -> str: ...
    @abstractmethod
    def combat_power(self) -> int: ...
    @abstractmethod
    def status(self)       -> str: ...


# ─── CONCRETE COMPONENT ──────────────────────────────────────
class BareSoldier(Soldier):
    def describe(self)     -> str: return "👤 Tiro (Recruit) — tunica, caligae sandals"
    def combat_power(self) -> int: return 5
    def status(self)       -> str: return "Recruit"


# ─── BASE DECORATOR ──────────────────────────────────────────
class SoldierDecorator(Soldier):
    def __init__(self, soldier: Soldier):
        self._soldier = soldier
    def describe(self)     -> str: return self._soldier.describe()
    def combat_power(self) -> int: return self._soldier.combat_power()
    def status(self)       -> str: return self._soldier.status()


# ─── CONCRETE DECORATORS ─────────────────────────────────────
class LoricaSegmentata(SoldierDecorator):
    def describe(self)     -> str:
        return self._soldier.describe() + "\n              + 🛡  Lorica Segmentata (plate armour)"
    def combat_power(self) -> int: return self._soldier.combat_power() + 30
    def status(self)       -> str: return f"Armoured {self._soldier.status()}"


class GallicHelmet(SoldierDecorator):
    def describe(self) -> str:
        return self._soldier.describe() + "\n              + ⛑  Galic Helmet (bronze, cheek guards)"
    def combat_power(self) -> int: return self._soldier.combat_power() + 15
    def status(self)       -> str: return self._soldier.status()


class PaludamentumCloak(SoldierDecorator):
    def describe(self) -> str:
        return self._soldier.describe() + "\n              + 🟥 Paludamentum (general's red cloak)"
    def combat_power(self) -> int: return self._soldier.combat_power() + 20
    def status(self)       -> str: return f"General {self._soldier.status()}"


class LaurelWreath(SoldierDecorator):
    def describe(self) -> str:
        return self._soldier.describe() + "\n              + 🌿 LAUREL WREATH OF TRIUMPH!"
    def combat_power(self) -> int: return self._soldier.combat_power() + 50
    def status(self)       -> str: return "TRIUMPHATOR"
    def shout(self)        -> str: return "IO TRIUMPHE! IO TRIUMPHE! IO TRIUMPHE!"


# ─── HELPER ──────────────────────────────────────────────────
def show_soldier(s: Soldier) -> None:
    print(f"  Status : {s.status()}")
    print(f"  Outfit : {s.describe()}")
    print(f"  Power  : {s.combat_power()} points")


# ─── DEMONSTRATION ───────────────────────────────────────────
def main() -> None:
    print("╔═══════════════════════════════════════════════╗")
    print("║   DECORATOR PATTERN — Python                  ║")
    print("║   The Triumphator's Dressing Room             ║")
    print("╚═══════════════════════════════════════════════╝\n")

    print("── STEP 1: The Bare Recruit ────────────────────")
    soldier: Soldier = BareSoldier()
    show_soldier(soldier)

    print("\n── STEP 2: Add Lorica Segmentata ───────────────")
    soldier = LoricaSegmentata(soldier)
    show_soldier(soldier)

    print("\n── STEP 3: Add Gallic Helmet ───────────────────")
    soldier = GallicHelmet(soldier)
    show_soldier(soldier)

    print("\n── STEP 4: Promotion — Add General's Cloak ────")
    soldier = PaludamentumCloak(soldier)
    show_soldier(soldier)

    print("\n── STEP 5: TRIUMPH! ────────────────────────────")
    triumphator = LaurelWreath(soldier)
    show_soldier(triumphator)
    print(f"\n  🎺 {triumphator.shout()}")

    print("\n── KEY INSIGHT ─────────────────────────────────")
    print("At every step it's still THE SAME soldier (type: Soldier).")
    print("We WRAPPED it without modifying the original class.")
    print('"Miles ornatur, non mutatur!"')

    # BONUS: Python has native @decorator syntax — same concept!
    print("\n── BONUS: Python @decorator (same pattern!) ────")

    def add_lorica(func):
        """A Python function decorator — adds armour to any output"""
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)
            return f"{result} [+ Lorica +30]"
        return wrapper

    @add_lorica
    def recruit_report():
        return "Tiro Marcus: power=5"

    print(f"  {recruit_report()}")
    print("  (Python @decorators are literally this pattern!)")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
FACTORY METHOD PATTERN — Imperial Weaponry Workshop
"Fabrica dat, miles accipit" — The factory gives, the soldier receives

Run: python3 fabrica.py
"""

from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass


# ─── PRODUCT INTERFACE ───────────────────────────────────────
class Weapon(ABC):
    @abstractmethod
    def describe(self) -> str: ...

    @abstractmethod
    def attack(self) -> str: ...

    @abstractmethod
    def damage(self) -> int: ...


# ─── CONCRETE PRODUCTS ───────────────────────────────────────
class Gladius(Weapon):
    def describe(self) -> str: return "⚔  Gladius — short stabbing sword, 60cm blade"
    def attack(self)   -> str: return "STAB forward! Enemy pierced through the shield gap!"
    def damage(self)   -> int: return 45


class Pilum(Weapon):
    def describe(self) -> str: return "🏹 Pilum — heavy javelin with soft iron shank"
    def attack(self)   -> str: return "THROW! Iron bends on impact — enemy shield useless!"
    def damage(self)   -> int: return 60


class Ballista(Weapon):
    def describe(self) -> str: return "💥 Ballista — torsion siege weapon, 2-talent bolts"
    def attack(self)   -> str: return "FIRE! Bolt penetrates 3 ranks of soldiers!"
    def damage(self)   -> int: return 150


class Scutum(Weapon):
    def describe(self) -> str: return "🛡  Scutum — curved rectangular legionary shield"
    def attack(self)   -> str: return "PUSH! Shield bash breaks enemy formation!"
    def damage(self)   -> int: return 20


# ─── CREATOR (FACTORY) BASE CLASS ────────────────────────────
class WeaponFactory(ABC):
    """
    Declares the factory method. Subclasses override create_weapon().
    The base class provides the arm_soldier() template method.
    """

    @abstractmethod
    def create_weapon(self) -> Weapon:
        """The Factory Method — override in subclasses"""
        ...

    def arm_soldier(self) -> None:
        """Template method — uses create_weapon() internally"""
        weapon = self.create_weapon()
        print(f"  Weapon issued : {weapon.describe()}")
        print(f"  Combat result : {weapon.attack()}")
        print(f"  Damage rating : {weapon.damage()} points")


# ─── CONCRETE CREATORS ───────────────────────────────────────
class InfantryFactory(WeaponFactory):
    def create_weapon(self) -> Weapon:
        return Gladius()


class ArcherFactory(WeaponFactory):
    def create_weapon(self) -> Weapon:
        return Pilum()


class SiegeFactory(WeaponFactory):
    def create_weapon(self) -> Weapon:
        return Ballista()


class ShieldBearerFactory(WeaponFactory):
    def create_weapon(self) -> Weapon:
        return Scutum()


# ─── CLIENT FUNCTION ─────────────────────────────────────────
def equip_unit(unit_name: str, factory: WeaponFactory) -> None:
    """Client only knows WeaponFactory interface — not the concrete weapon!"""
    print(f"\n[{unit_name}]")
    factory.arm_soldier()


# ─── DEMONSTRATION ───────────────────────────────────────────
def main() -> None:
    print("╔═══════════════════════════════════════════════╗")
    print("║   FACTORY METHOD PATTERN — Python             ║")
    print("║   Imperial Weaponry Workshop, Carnuntum       ║")
    print("╚═══════════════════════════════════════════════╝")
    print("\n📋 IMPERIAL FABRICATION ORDER — LEGIO X GEMINA")
    print("────────────────────────────────────────────────")

    equip_unit("1st Infantry Cohort", InfantryFactory())
    equip_unit("Archer Auxilia",      ArcherFactory())
    equip_unit("Siege Engineering",   SiegeFactory())
    equip_unit("Testudo Shield Wall", ShieldBearerFactory())

    print("\n────────────────────────────────────────────────")
    print("KEY INSIGHT: equip_unit() calls arm_soldier()")
    print("without knowing Gladius, Pilum, or Ballista exists.")
    print("The factory decides. Completely decoupled!")
    print('"Fabrica dat, miles accipit!"')

    # BONUS: Dynamic factory selection
    print("\n── BONUS: Dynamic Factory Selection ────────────")
    factories: dict[str, WeaponFactory] = {
        "infantry":  InfantryFactory(),
        "archers":   ArcherFactory(),
        "siege":     SiegeFactory(),
        "shielders": ShieldBearerFactory(),
    }
    order = ["siege", "infantry", "archers"]
    print(f"Battlefield order: {order}")
    for unit_type in order:
        print(f"\n  → {unit_type.upper()}:")
        weapon = factories[unit_type].create_weapon()
        print(f"    {weapon.describe()} | DMG: {weapon.damage()}")


if __name__ == "__main__":
    main()

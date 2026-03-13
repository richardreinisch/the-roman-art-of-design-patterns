#!/usr/bin/env python3
"""
OBSERVER PATTERN — Roman Fire-Signal Network (Speculae)
"Una specula ardet, omnes vident" — One tower burns, all see it

Run: python3 speculae.py
"""

from __future__ import annotations
from abc import ABC, abstractmethod
from typing import List


# ─── OBSERVER INTERFACE ──────────────────────────────────────
class SignalObserver(ABC):
    @abstractmethod
    def on_signal(self, message: str, urgency: int) -> None: ...

    @property
    @abstractmethod
    def observer_name(self) -> str: ...


# ─── CONCRETE OBSERVERS ──────────────────────────────────────
class RomanLegate(SignalObserver):
    def __init__(self, name: str, legion: str):
        self._name   = name
        self._legion = legion

    @property
    def observer_name(self) -> str:
        return self._name

    def on_signal(self, message: str, urgency: int) -> None:
        if urgency >= 4:
            print(f"  ⚔  LEGATE {self._name} ({self._legion}): "
                  f"FULL MOBILIZATION! '{message}'")
        elif urgency >= 2:
            print(f"  📜 LEGATE {self._name} ({self._legion}): "
                  f"Prepare forces. '{message}'")
        else:
            print(f"  📜 LEGATE {self._name}: Noted. '{message}'")


class EmperorInRome(SignalObserver):
    @property
    def observer_name(self) -> str:
        return "Emperor Hadrian"

    def on_signal(self, message: str, urgency: int) -> None:
        if urgency >= 5:
            print(f"  👑 EMPEROR: BY JUPITER! SOUND ALL TRUMPETS! '{message}'")
        elif urgency >= 3:
            print(f"  👑 EMPEROR: Dispatch two legions immediately. '{message}'")
        else:
            print(f"  👑 EMPEROR: Send a response letter. '{message}'")


class ChroniclerAnnales(SignalObserver):
    def __init__(self):
        self._event_count = 0

    @property
    def observer_name(self) -> str:
        return "Chronicler Annales"

    def on_signal(self, message: str, urgency: int) -> None:
        self._event_count += 1
        print(f"  📖 CHRONICLER [Event #{self._event_count}]: "
              f"Recording — '{message}' (urgency={urgency})")

    @property
    def event_count(self) -> int:
        return self._event_count


class SupplyOfficer(SignalObserver):
    @property
    def observer_name(self) -> str:
        return "Supply Officer"

    def on_signal(self, message: str, urgency: int) -> None:
        if urgency >= 3:
            print(f"  🍞 SUPPLY OFFICER: Preparing emergency rations for mobilization.")
        # Low urgency signals ignored by supply


# ─── SUBJECT (SIGNAL TOWER) ──────────────────────────────────
class SignalTower:
    """
    The Subject — maintains a list of observers and notifies them all
    when fireSignal() is called.
    """

    def __init__(self, location: str):
        self._location  = location
        self._observers: List[SignalObserver] = []

    def subscribe(self, observer: SignalObserver) -> None:
        self._observers.append(observer)
        print(f"  + {observer.observer_name} subscribed to {self._location}")

    def unsubscribe(self, observer: SignalObserver) -> None:
        self._observers.remove(observer)
        print(f"  - {observer.observer_name} unsubscribed from {self._location}")

    def fire_signal(self, message: str, urgency: int = 1) -> None:
        print(f"\n🔥 SIGNAL from {self._location} "
              f"[URGENCY={urgency}/5]: {message}")
        print(f"   Notifying {len(self._observers)} observer(s):")
        for observer in self._observers:
            observer.on_signal(message, urgency)

    @property
    def observer_count(self) -> int:
        return len(self._observers)


# ─── DEMONSTRATION ───────────────────────────────────────────
def main() -> None:
    print("╔═══════════════════════════════════════════════╗")
    print("║   OBSERVER PATTERN — Python                   ║")
    print("║   Roman Fire-Signal Network (Speculae)        ║")
    print("╚═══════════════════════════════════════════════╝\n")

    tower = SignalTower("Hadrian's Wall — Milecastle 39")

    legate     = RomanLegate("Gnaeus Pompeius Julius", "Legio XX Valeria Victrix")
    emperor    = EmperorInRome()
    chronicler = ChroniclerAnnales()
    supply     = SupplyOfficer()

    print("── SUBSCRIBING OBSERVERS ───────────────────────")
    tower.subscribe(legate)
    tower.subscribe(emperor)
    tower.subscribe(chronicler)
    tower.subscribe(supply)

    print("\n── SIGNAL EVENTS ───────────────────────────────")
    tower.fire_signal("Scout reports: small Pictish hunting party", urgency=1)
    tower.fire_signal("Border patrol: 200 armed Picts approaching", urgency=3)
    tower.fire_signal("EMERGENCY: Full Pictish tribal invasion! 10,000 warriors!", urgency=5)

    print("\n── SUBSCRIPTION CHANGE ─────────────────────────")
    print("  (Emperor goes on holiday to Hadrian's Villa)")
    tower.unsubscribe(emperor)
    tower.fire_signal("Situation stabilised — Picts retreated", urgency=1)

    print("\n── SUMMARY ─────────────────────────────────────")
    print(f"  Total events chronicled: {chronicler.event_count}")
    print(f"  Current observers: {tower.observer_count}")
    print("  \"Una specula ardet, omnes vident!\"")


if __name__ == "__main__":
    main()

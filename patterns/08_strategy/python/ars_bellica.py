#!/usr/bin/env python3
"""
STRATEGY PATTERN — Roman Battle Formations
"Non una via vincimus" — We do not win by one path
Run: python3 ars_bellica.py
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass

@dataclass
class BattleSituation:
    enemies: int
    terrain: str
    morale:  int

class BattleStrategy(ABC):
    @abstractmethod
    def strategy_name(self) -> str: ...
    @abstractmethod
    def execute(self, s: BattleSituation) -> str: ...

class Testudo(BattleStrategy):
    def strategy_name(self) -> str: return "TESTUDO (Tortoise)"
    def execute(self, s: BattleSituation) -> str:
        return f"🐢 Shields locked! vs {s.enemies} on {s.terrain}. Casualties -60%!"

class Cuneus(BattleStrategy):
    def strategy_name(self) -> str: return "CUNEUS (Wedge)"
    def execute(self, s: BattleSituation) -> str:
        return f"🔺 CHARGE! Wedge pierces {s.enemies} on {s.terrain}!"

class Orbis(BattleStrategy):
    def strategy_name(self) -> str: return "ORBIS (Circle)"
    def execute(self, s: BattleSituation) -> str:
        return f"⭕ 360° defence! Morale {s.morale}/10. Holding!"

class RomanLegion:
    def __init__(self, name: str, strategy: BattleStrategy):
        self._name     = name
        self._strategy = strategy
    def set_strategy(self, strategy: BattleStrategy):
        print(f"  ⚙  {self._name}: {self._strategy.strategy_name()} → {strategy.strategy_name()}")
        self._strategy = strategy
    def engage(self, s: BattleSituation):
        print(f"\n  🦅 {self._name} [{self._strategy.strategy_name()}]")
        print(f"     {self._strategy.execute(s)}")

def main():
    print("╔═══════════════════════════════════════════════╗")
    print("║   STRATEGY PATTERN — Python                   ║")
    print("║   Roman Battle Formations                     ║")
    print("╚═══════════════════════════════════════════════╝\n")
    legion = RomanLegion("Legio X Gemina", Testudo())
    legion.engage(BattleSituation(500, "open field", 8))
    print("\n── SCIPIO ADAPTS TO THE BATTLEFIELD ────────────")
    legion.set_strategy(Cuneus())
    legion.engage(BattleSituation(200, "open field", 9))
    legion.set_strategy(Orbis())
    legion.engage(BattleSituation(5000, "surrounded valley", 4))
    print('\n"Non una via vincimus!"')

if __name__ == "__main__":
    main()

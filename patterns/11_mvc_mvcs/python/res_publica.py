#!/usr/bin/env python3
"""
MVC/MVCS PATTERN — The Roman Republic
"Divide et impera" — Divide and rule
Run: python3 res_publica.py
"""
from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class Legion:
    name: str; province: str; strength: int
    id: int = 0; active: bool = True

class LegionModel:
    def __init__(self): self._legions: List[Legion] = []; self._next_id = 1
    def add(self, name: str, strength: int, province: str) -> Legion:
        l = Legion(name, province, strength, self._next_id)
        self._next_id += 1; self._legions.append(l); return l
    def get_all(self) -> List[Legion]: return self._legions
    def get_by_province(self, p: str) -> List[Legion]:
        return [l for l in self._legions if l.province == p]
    def update_strength(self, id: int, s: int):
        for l in self._legions:
            if l.id == id: l.strength = s; return
    def total_strength(self) -> int:
        return sum(l.strength for l in self._legions if l.active)

class LegionView:
    def render_list(self, legs: List[Legion]):
        print("\n  ╔══ IMPERIAL LEGION REGISTRY (SPQR) ══╗")
        for l in legs:
            print(f"  ║ [{l.id}] {l.name:<22} {l.province:<10} {l.strength:>5} ║")
        print("  ╚══════════════════════════════════════╝")
    def show_msg(self, m: str): print(f"  📢 {m}")
    def show_strength(self, n: int): print(f"  ⚔  Total: {n:,} soldiers")

class LegionService:
    def __init__(self, model: LegionModel): self._m = model
    def reinforce(self, province: str, troops: int) -> str:
        legs = self._m.get_by_province(province)
        if not legs: return f"No legions in {province}"
        per = troops // len(legs)
        for l in legs: self._m.update_strength(l.id, l.strength + per)
        return f"+{troops} troops to {len(legs)} legion(s) in {province}"

class LegionController:
    def __init__(self, model: LegionModel, view: LegionView, service: LegionService):
        self._m, self._v, self._s = model, view, service
    def add_legion(self, name: str, strength: int, province: str):
        self._m.add(name, strength, province)
        self._v.show_msg(f"Legion '{name}' enrolled")
        self._v.render_list(self._m.get_all())
    def reinforce(self, province: str, count: int):
        self._v.show_msg(self._s.reinforce(province, count))
        self._v.render_list(self._m.get_all())
    def show_strength(self): self._v.show_strength(self._m.total_strength())

def main():
    print("╔═══════════════════════════════════════════════╗")
    print("║   MVC/MVCS PATTERN — Python                   ║")
    print("║   The Roman Republic                          ║")
    print("╚═══════════════════════════════════════════════╝\n")
    model   = LegionModel()
    view    = LegionView()
    service = LegionService(model)
    ctrl    = LegionController(model, view, service)
    ctrl.add_legion("Legio I Germanica",   5000, "Germania")
    ctrl.add_legion("Legio X Gemina",      4800, "Hispania")
    ctrl.add_legion("Legio XII Fulminata", 4200, "Germania")
    print("\n── REINFORCE GERMANIA ──────────────────────────")
    ctrl.reinforce("Germania", 3000)
    ctrl.show_strength()
    print('\n"Divide et impera!"')

if __name__ == "__main__":
    main()

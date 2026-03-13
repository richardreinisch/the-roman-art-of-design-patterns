#!/usr/bin/env python3
"""
COMMAND PATTERN — Imperial Building Commands
"Mandatum datum, mandatum executum"

Run: python3 mandatum.py
"""
from abc import ABC, abstractmethod
from typing import List

class RomeArchitect:
    def __init__(self): self.buildings: List[str] = []
    def build(self, s: str) -> str:
        self.buildings.append(s)
        return f"🏛  {s} BUILT! {self.buildings}"
    def demolish(self, s: str) -> str:
        if s in self.buildings: self.buildings.remove(s)
        return f"🔨 {s} DEMOLISHED! {self.buildings}"

class ImperialCommand(ABC):
    @abstractmethod
    def execute(self) -> str: ...
    @abstractmethod
    def undo(self)    -> str: ...

class BuildCmd(ImperialCommand):
    def __init__(self, arch: RomeArchitect, building: str):
        self._arch, self._building = arch, building
    def execute(self) -> str: return self._arch.build(self._building)
    def undo(self)    -> str: return self._arch.demolish(self._building)

class ImperialPalace:
    def __init__(self):
        self._history: List[ImperialCommand] = []
        self._undone:  List[ImperialCommand] = []
    def issue(self, cmd: ImperialCommand) -> str:
        r = cmd.execute(); self._history.append(cmd); self._undone.clear(); return r
    def undo_last(self) -> str:
        if not self._history: return "Nothing to undo!"
        cmd = self._history.pop(); self._undone.append(cmd); return cmd.undo()
    def redo_last(self) -> str:
        if not self._undone: return "Nothing to redo!"
        cmd = self._undone.pop(); self._history.append(cmd); return cmd.execute()

def main():
    print("╔═══════════════════════════════════════════════╗")
    print("║   COMMAND PATTERN — Python                    ║")
    print("║   Imperial Building Commands                  ║")
    print("╚═══════════════════════════════════════════════╝\n")
    arch   = RomeArchitect()
    palace = ImperialPalace()
    print("── ISSUING COMMANDS ────────────────────────────")
    print(palace.issue(BuildCmd(arch, "Colosseum")))
    print(palace.issue(BuildCmd(arch, "Aqua Claudia")))
    print(palace.issue(BuildCmd(arch, "Temple of Jupiter")))
    print("\n── VESPASIAN CHANGES HIS MIND ──────────────────")
    print(palace.undo_last())
    print(palace.undo_last())
    print("\n── AND BACK AGAIN ──────────────────────────────")
    print(palace.redo_last())
    print('\n"Mandatum datum, mandatum executum!"')

if __name__ == "__main__":
    main()

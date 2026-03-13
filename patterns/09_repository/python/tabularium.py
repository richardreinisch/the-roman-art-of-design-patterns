#!/usr/bin/env python3
"""
REPOSITORY PATTERN — The Imperial Archive (Tabularium)
"Ubi data est? Tabularius scit" — Where is the data? The archivist knows.
Run: python3 tabularium.py
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List, Optional
import uuid

@dataclass
class Centurion:
    name:        str
    legion:      str
    rank:        str
    battles_won: int
    id:          str = field(default_factory=lambda: str(uuid.uuid4())[:6])

class ICenturionRepository(ABC):
    @abstractmethod
    def find_by_id(self, id: str)       -> Optional[Centurion]: ...
    @abstractmethod
    def find_by_legion(self, l: str)    -> List[Centurion]: ...
    @abstractmethod
    def find_all(self)                  -> List[Centurion]: ...
    @abstractmethod
    def save(self, c: Centurion)        -> Centurion: ...
    @abstractmethod
    def delete(self, id: str)           -> bool: ...

class InMemoryCenturionRepository(ICenturionRepository):
    def __init__(self): self._store: dict[str,Centurion] = {}
    def find_by_id(self, id: str)    -> Optional[Centurion]: return self._store.get(id)
    def find_by_legion(self, l: str) -> List[Centurion]:
        return [c for c in self._store.values() if c.legion == l]
    def find_all(self)               -> List[Centurion]: return list(self._store.values())
    def save(self, c: Centurion)     -> Centurion:
        self._store[c.id] = c
        print(f"  📚 Saved: {c.name} ({c.rank}) [{c.id}]")
        return c
    def delete(self, id: str)        -> bool:
        existed = id in self._store
        self._store.pop(id, None)
        return existed

class CenturionService:
    def __init__(self, repo: ICenturionRepository): self._repo = repo
    def promote_best(self, legion: str) -> str:
        all_c = self._repo.find_by_legion(legion)
        if not all_c: return f"No centurions in {legion}"
        best = max(all_c, key=lambda c: c.battles_won)
        best.rank = "Primus Pilus"
        self._repo.save(best)
        return f"🎖  {best.name} promoted to Primus Pilus! ({best.battles_won} battles)"

def main():
    print("╔═══════════════════════════════════════════════╗")
    print("║   REPOSITORY PATTERN — Python                 ║")
    print("║   The Imperial Archive (Tabularium)           ║")
    print("╚═══════════════════════════════════════════════╝\n")
    repo = InMemoryCenturionRepository()
    repo.save(Centurion("Marcus Aurelius",   "Legio X",  "Centurion", 15))
    repo.save(Centurion("Gaius Petronius",   "Legio X",  "Centurion", 23))
    repo.save(Centurion("Publius Quinctius", "Legio XII","Centurion",  7))
    repo.save(Centurion("Titus Labienus",    "Legio X",  "Centurion", 31))
    print("\n── QUERY: All Legio X Centurions ───────────────")
    for c in repo.find_by_legion("Legio X"):
        print(f"  {c.name} — {c.battles_won} battles")
    print("\n── SERVICE: Promote Best in Legio X ────────────")
    svc = CenturionService(repo)
    print(f"  {svc.promote_best('Legio X')}")
    print('\n"Ubi data est? Tabularius scit!"')

if __name__ == "__main__":
    main()

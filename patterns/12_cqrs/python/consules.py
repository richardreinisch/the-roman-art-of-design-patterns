#!/usr/bin/env python3
"""
CQRS PATTERN — The Two Consuls
"Qui legit non scribit; qui scribit non legit"
He who reads does not write; he who writes does not read.
Run: python3 consules.py
"""
from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class Legion:
    id: str; name: str; province: str; strength: int; active: bool = True

@dataclass
class Event:
    type: str; legion_id: str = ""; name: str = ""; province: str = ""; strength: int = 0

class WriteStore:
    def __init__(self): self.legions: dict[str,Legion] = {}; self.events: List[Event] = []
    def apply(self, e: Event, l: Optional[Legion] = None):
        self.events.append(e)
        if e.type == "ENROLL" and l: self.legions[l.id] = l
        if e.type == "DEPLOY" and e.legion_id in self.legions:
            self.legions[e.legion_id].province = e.province

class ReadStore:
    def __init__(self): self.views: dict[str,Legion] = {}
    def project(self, e: Event, l: Optional[Legion] = None):
        if e.type == "ENROLL" and l: self.views[l.id] = l
        if e.type == "DEPLOY" and e.legion_id in self.views:
            self.views[e.legion_id].province = e.province
    def query(self, province: str = "") -> List[Legion]:
        legs = [l for l in self.views.values() if l.active]
        return [l for l in legs if l.province == province] if province else legs

class CommandConsul:
    def __init__(self, write: WriteStore, read: ReadStore):
        self._w, self._r, self._id = write, read, 0
    def enroll(self, name: str, province: str, strength: int) -> str:
        self._id += 1; lid = f"leg-{self._id}"
        l = Legion(lid, name, province, strength)
        e = Event("ENROLL", lid, name, province, strength)
        self._w.apply(e, l); self._r.project(e, l)
        print(f"  ⚔  ENROLLED: {name} [{lid}]")
        return lid
    def deploy(self, lid: str, province: str):
        e = Event("DEPLOY", lid, "", province)
        self._w.apply(e); self._r.project(e)
        print(f"  ⚔  DEPLOYED: {lid} → {province}")

class QueryConsul:
    def __init__(self, read: ReadStore): self._r = read
    def list_active(self, province: str = ""):
        legs  = self._r.query(province)
        label = province or "all provinces"
        print(f"  📖 QUERY: Active legions in {label}:")
        for l in legs:
            print(f"    🦅 {l.name} [{l.id}] in {l.province} ({l.strength} soldiers)")

def main():
    print("╔═══════════════════════════════════════════════╗")
    print("║   CQRS PATTERN — Python                       ║")
    print("║   The Two Consuls                             ║")
    print("╚═══════════════════════════════════════════════╝\n")
    ws, rs = WriteStore(), ReadStore()
    cmd   = CommandConsul(ws, rs)
    query = QueryConsul(rs)
    print("── COMMANDING CONSUL (Write Side) ──────────────")
    id1 = cmd.enroll("Legio I Germanica",   "Gallia",   5000)
    id2 = cmd.enroll("Legio X Gemina",      "Hispania", 4800)
    id3 = cmd.enroll("Legio XII Fulminata", "Gallia",   4200)
    cmd.deploy(id1, "Germania")
    print("\n── READING CONSUL (Query Side) ─────────────────")
    query.list_active()
    print()
    query.list_active("Germania")
    print('\n"Qui legit non scribit; qui scribit non legit!"')

if __name__ == "__main__":
    main()

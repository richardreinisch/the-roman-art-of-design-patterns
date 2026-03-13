#!/usr/bin/env python3
"""
PROXY PATTERN — The Imperial Legatus
"Legatus vocem imperatoris habet" — The delegate has the emperor's voice
Run: python3 legatus.py
"""
from abc import ABC, abstractmethod
from typing import Optional

class IImperialService(ABC):
    @abstractmethod
    def issue_decree(self, province: str, decree: str) -> str: ...
    @abstractmethod
    def get_census(self, province: str) -> str: ...

class EmperorHadrian(IImperialService):
    def __init__(self):
        print("  👑 Emperor Hadrian awakens from his afternoon nap!")
    def issue_decree(self, p: str, d: str) -> str:
        return f"👑 IMPERIAL DECREE for {p}: '{d}' — Signed, Hadrianus P.P."
    def get_census(self, p: str) -> str:
        return f"👑 Census of {p}: Population ~50,000 (all paying taxes... mostly)"

class LegateProxy(IImperialService):
    AUTHORIZED = {"Syria","Aegyptus","Britannia","Gallia","Hispania"}
    def __init__(self):
        self._emperor: Optional[EmperorHadrian] = None
        self._cache: dict[str,str] = {}
        self._count = 0
    def _get_emperor(self) -> EmperorHadrian:
        if self._emperor is None:
            print("  [Proxy] First real request — waking the Emperor...")
            self._emperor = EmperorHadrian()
        return self._emperor
    def _log(self, action: str):
        self._count += 1
        print(f"  [Log #{self._count}] {action}")
    def issue_decree(self, province: str, decree: str) -> str:
        self._log(f"Decree request for '{province}'")
        if province not in self.AUTHORIZED:
            return f"🚫 ACCESS DENIED: '{province}' is not an authorized province!"
        return self._get_emperor().issue_decree(province, decree)
    def get_census(self, province: str) -> str:
        self._log(f"Census request for '{province}'")
        if province in self._cache:
            print(f"  [Cache HIT] Returning cached census for {province}")
            return self._cache[province]
        result = self._get_emperor().get_census(province)
        self._cache[province] = result
        return result
    @property
    def request_count(self) -> int: return self._count

def main():
    print("╔═══════════════════════════════════════════════╗")
    print("║   PROXY PATTERN — Python                      ║")
    print("║   The Imperial Legatus                        ║")
    print("╚═══════════════════════════════════════════════╝\n")
    svc: IImperialService = LegateProxy()
    print("── PROTECTION PROXY: Unauthorized Request ──────")
    print(svc.issue_decree("Barbaria", "Build roads!"))
    print("\n── AUTHORIZED REQUESTS (lazy-init Emperor) ─────")
    print(svc.issue_decree("Britannia", "Build Hadrian's Wall"))
    print(svc.issue_decree("Syria",     "Increase grain quota"))
    print("\n── CACHING PROXY: Census Requests ──────────────")
    print(svc.get_census("Aegyptus"))
    print("\n  (Second call — same province)")
    print(svc.get_census("Aegyptus"))
    print(f"\n  Total requests: {svc.request_count}")
    print("  Emperor woken ONCE (lazy init)")
    print('"Legatus vocem imperatoris habet!"')

if __name__ == "__main__":
    main()

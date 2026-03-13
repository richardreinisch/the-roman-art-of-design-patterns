#!/usr/bin/env python3
"""
SINGLETON PATTERN — The Roman Treasury (Aerarium Saturni)
"Unus et idem" — One and the same

Run: python3 aerarium.py
"""

from __future__ import annotations
import threading


# ─── SINGLETON CLASS ─────────────────────────────────────────
class AerariumSaturni:
    """
    The Roman State Treasury beneath the Temple of Saturn.

    There is exactly ONE treasury for all of Rome.
    Neither Caesar nor Cicero can create their own.
    They all queue at the same single vault.
    """

    _instance: AerariumSaturni | None = None
    _lock = threading.Lock()

    def __new__(cls) -> AerariumSaturni:
        # Thread-safe double-checked locking
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._gold_reserves = 100_000
                    print("🏛  Aerarium Saturni founded beneath the Temple of Saturn!")
                    print(f"    Initial reserves: {cls._instance._gold_reserves:,} aurei\n")
        return cls._instance

    def deposit(self, amount: int, citizen: str) -> None:
        self._gold_reserves += amount
        print(f"  ✓ {citizen} deposits {amount:,} aurei. "
              f"Total reserves: {self._gold_reserves:,}")

    def withdraw(self, amount: int, citizen: str) -> None:
        if amount > self._gold_reserves:
            print(f"  ✗ DENIED — Non est pecunia! {citizen} requests {amount:,} "
                  f"but only {self._gold_reserves:,} available!")
            return
        self._gold_reserves -= amount
        print(f"  ✓ {citizen} withdraws {amount:,} aurei. "
              f"Remaining: {self._gold_reserves:,}")

    @property
    def balance(self) -> int:
        return self._gold_reserves

    def show_status(self) -> None:
        print(f"\n  📊 AERARIUM STATUS: {self._gold_reserves:,} aurei secured")


# ─── DEMONSTRATION ───────────────────────────────────────────
def main() -> None:
    print("╔═══════════════════════════════════════════════╗")
    print("║      SINGLETON PATTERN — Python               ║")
    print("║   The Roman Treasury (Aerarium Saturni)       ║")
    print("╚═══════════════════════════════════════════════╝\n")

    # Multiple citizens try to access "their own" treasury...
    caesars_treasury = AerariumSaturni()
    ciceros_treasury = AerariumSaturni()
    brutus_treasury  = AerariumSaturni()

    # Prove it's the same instance
    print("Are all references the same instance?")
    print(f"  Caesar  is Cicero: {caesars_treasury is ciceros_treasury} ✓")
    print(f"  Cicero  is Brutus: {ciceros_treasury is brutus_treasury} ✓")
    print(f"  (Same id: {id(caesars_treasury)})\n")

    # All transactions affect the SAME balance
    print("── TRANSACTIONS ────────────────────────────────")
    caesars_treasury.deposit(50_000, "Caesar (war spoils from Gaul)")
    ciceros_treasury.deposit(10_000, "Cicero (legal fees)")
    ciceros_treasury.withdraw(30_000, "Cicero (bribed a juror)")
    brutus_treasury.withdraw(5_000,  "Brutus (bought a new dagger)")
    brutus_treasury.withdraw(200_000, "Brutus (tried to steal it all)")  # will fail

    caesars_treasury.show_status()

    print("\n── KEY INSIGHT ─────────────────────────────────")
    print("All three 'different' treasuries share the same")
    print("balance because they ARE the same object.")
    print('"Unum tesaurum habemus!" — We have ONE treasury!')


if __name__ == "__main__":
    main()

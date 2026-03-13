#!/usr/bin/env python3
"""
DEPENDENCY INJECTION — The Praetorian Quartermaster
"Non ipse quaerit, accipit" — He does not seek himself, he receives

Run: python3 officium.py
"""
from abc import ABC, abstractmethod
from typing import Protocol

class IMessenger(Protocol):
    def send(self, to: str, msg: str) -> None: ...

class ILogger(Protocol):
    def log(self, event: str) -> None: ...

class ScrollMessenger:
    def send(self, to: str, msg: str):
        print(f"  📜 Scroll to {to}: '{msg}'")

class SignalFireMessenger:
    def send(self, to: str, msg: str):
        print(f"  🔥 Signal fire to {to}: '{msg}'")

class MockMessenger:
    def __init__(self): self.sent = []
    def send(self, to: str, msg: str):
        self.sent.append((to, msg))
        print(f"  🧪 MOCK: to={to} msg='{msg}'")

class ConsoleLogger:
    def log(self, event: str):
        print(f"  [LOG] {event}")

class MilitaryCampaign:
    def __init__(self, messenger: IMessenger, logger: ILogger):
        self._messenger = messenger
        self._logger    = logger

    def launch_attack(self, target: str):
        self._logger.log(f"Campaign launched against {target}")
        self._messenger.send("Praetorian Guard", f"ADVANCE on {target}!")
        self._messenger.send("Supply Corps",     f"Move provisions to {target}")
        self._logger.log("Orders dispatched")

def main():
    print("╔═══════════════════════════════════════════════╗")
    print("║   DEPENDENCY INJECTION — Python               ║")
    print("║   The Praetorian Quartermaster                ║")
    print("╚═══════════════════════════════════════════════╝\n")

    print("── PRODUCTION (scroll messengers) ──────────────")
    MilitaryCampaign(ScrollMessenger(), ConsoleLogger()).launch_attack("Gaul")

    print("\n── SIGNAL FIRE VARIANT ─────────────────────────")
    MilitaryCampaign(SignalFireMessenger(), ConsoleLogger()).launch_attack("Britannia")

    print("\n── TESTING (mock — no real messages sent) ──────")
    mock = MockMessenger()
    MilitaryCampaign(mock, ConsoleLogger()).launch_attack("Germania")
    print(f"  Mock captured {len(mock.sent)} messages ✓")

    print("\n── KEY INSIGHT ─────────────────────────────────")
    print("MilitaryCampaign never creates its dependencies.")
    print("Swap ScrollMessenger for MockMessenger with ZERO code change.")
    print('"Non ipse quaerit, accipit!"')

if __name__ == "__main__":
    main()

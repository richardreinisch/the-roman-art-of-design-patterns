#!/usr/bin/env python3
"""
ADAPTER PATTERN — The Roman Interpreter (Interpres)
"Interpres pontem verborum aedificat"

Run: python3 interpres.py
"""
from abc import ABC, abstractmethod

class BarbarianPaymentSystem:
    """Legacy Celtic payment system — we cannot change this"""
    def __init__(self):
        self._torcs = 500.0
    def pay_in_celtic_coins(self, gold_torcs: float) -> str:
        if gold_torcs > self._torcs:
            raise ValueError("Non satis torc!")
        self._torcs -= gold_torcs
        return f"Celtic transfer: {gold_torcs:.2f} gold torcs sent"
    def get_exchange_rate(self) -> float: return 3.7
    def get_torc_balance(self) -> float:  return self._torcs

class RomanPaymentInterface(ABC):
    @abstractmethod
    def pay_in_denarii(self, denarii: float, payer: str) -> str: ...
    @abstractmethod
    def get_balance(self) -> float: ...

class BarbarianToRomanAdapter(RomanPaymentInterface):
    def __init__(self, barbarian: BarbarianPaymentSystem):
        self._barbarian = barbarian
        self._balance   = 5000.0
    def pay_in_denarii(self, denarii: float, payer: str) -> str:
        torcs  = denarii / self._barbarian.get_exchange_rate()
        result = self._barbarian.pay_in_celtic_coins(torcs)
        self._balance -= denarii
        return f"[ADAPTER] {payer} pays {denarii:.0f} den → {torcs:.2f} torcs | {result}"
    def get_balance(self) -> float:
        return self._balance

def roman_merchant_transaction(payment: RomanPaymentInterface, payer: str, amount: float):
    print(payment.pay_in_denarii(amount, payer))
    print(f"  Balance remaining: {payment.get_balance():.0f} denarii")

def main():
    print("╔═══════════════════════════════════════════════╗")
    print("║   ADAPTER PATTERN — Python                    ║")
    print("║   The Roman Interpreter (Interpres)           ║")
    print("╚═══════════════════════════════════════════════╝\n")
    celtic_bank = BarbarianPaymentSystem()
    adapter     = BarbarianToRomanAdapter(celtic_bank)
    print("── ROMAN MERCHANT USING ADAPTER ────────────────")
    roman_merchant_transaction(adapter, "Marcus Aurelius", 370)
    roman_merchant_transaction(adapter, "Gaius Petronius", 185)
    print("\n── DIRECT CELTIC BANK CHECK ────────────────────")
    print(f"  Torc reserve remaining: {celtic_bank.get_torc_balance():.2f} torcs")
    print("\n── KEY INSIGHT ─────────────────────────────────")
    print("roman_merchant_transaction() only knows RomanPaymentInterface.")
    print("It has NO IDEA a Celtic torc system exists underneath.")
    print('"Interpres pontem verborum aedificat!"')

if __name__ == "__main__":
    main()

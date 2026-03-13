# 🔗 05 — Adapter Pattern
### *Interpres pontem verborum aedificat — The interpreter builds a bridge of words*

> **Category:** Structural Pattern

---

## The Roman Analogy

**The Interpres** — Rome's professional interpreters, stationed at every frontier and in every provincial court.

A Celtic merchant arrives in Lugdunum with gold torcs to pay his taxes. The Roman tax collector speaks Latin and thinks in *denarii*. The merchant speaks Gaulish and thinks in *gold torcs*. Neither will change their language.

The *Interpres* stands between them. He takes the merchant's torcs, converts them at the current exchange rate (3.7 denarii per torc), and hands the Roman collector a proper receipt in denarii. Both parties deal with their native system. Neither knows — or needs to know — what happens in between.

> *"Interpres pontem verborum aedificat!"* — The interpreter builds a bridge of words!

---

## Intent

Convert the interface of a class into another interface that clients expect. The Adapter lets classes work together that couldn't otherwise because of **incompatible interfaces**.

Also known as: *Wrapper*.

---

## Structure

```
RomanPaymentInterface  (Target — what the client expects)
├── + payInDenarii(amount, payer): string
└── + getBalance(): float

BarbarianPaymentSystem  (Adaptee — the existing, incompatible system)
├── + payInCelticCoins(goldTorcs): string
├── + getExchangeRate(): float
└── + getTorcBalance(): float

BarbarianToRomanAdapter  (Adapter — bridges the two)
├── - barbarian: BarbarianPaymentSystem   ← wraps the adaptee
├── + payInDenarii(amount, payer): string ← converts and delegates
└── + getBalance(): float
```

---

## When to Use

- ✅ Integrating a legacy system with a new interface
- ✅ Using a third-party library with an incompatible API
- ✅ ODBC and JDBC database drivers (classic real-world adapters)
- ✅ Wrapping an external API to match your domain model
- ✅ Adapting old code to new interfaces during a refactor

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Reuse existing classes without modifying them | Increases overall code complexity |
| Single Responsibility — conversion in one place | Sometimes simpler to just change the adaptee |
| Open/Closed — add adapters without touching either side | Double indirection can be a performance concern |

---

## Run the Examples

```bash
# From the repository root:
make adapter-cpp
make adapter-py
make adapter-php
make adapter-java
make adapter-ts
make adapter-js
make adapter-cs

# Or directly:
cd cpp        && make
cd python     && python3 interpres.py
cd php        && php interpres.php
cd java       && java Interpres.java
cd typescript && tsc --module commonjs --target ES2022 interpres.ts && node interpres.js
cd javascript && node interpres.js
cd csharp     && dotnet script Interpres.cs
```

---

## Key Implementation Notes

### Object Adapter vs. Class Adapter
This implementation uses the **Object Adapter** form — the adapter *contains* the adaptee (composition). The alternative *Class Adapter* uses multiple inheritance to extend both sides, which is only possible in languages like C++ and is rarely recommended.

### Exchange Rate
The demo uses a rate of 3.7 denarii per gold torc. The adapter converts transparently — the Roman client never sees torcs.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | Composition over inheritance, interface via pure virtual |
| Python | Duck typing — no explicit interface needed for the target |
| PHP | `interface` for the target, `class` composition for the adapter |
| Java | `interface` + `record` for the adaptee values |
| TypeScript | `interface` enforces the target contract |
| JavaScript | Private `#balance` field; no interface needed |
| C# | `interface IRomanPayment`, composition in the adapter |

---

## Related Patterns

- **Facade** — also wraps a complex system, but provides a *simplified* interface rather than a *compatible* one
- **Proxy** — similar structure but different intent: Proxy controls access, Adapter converts interfaces
- **Decorator** — adds behaviour; Adapter changes the interface

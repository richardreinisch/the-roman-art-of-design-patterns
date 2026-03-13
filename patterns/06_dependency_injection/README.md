# 💉 06 — Dependency Injection Pattern
### *Non ipse quaerit, accipit — He does not seek it himself, he receives it*

> **Category:** Architectural Pattern (Inversion of Control)

---

## The Roman Analogy

**The Officium** — the Praetorian Quartermaster's supply system.

Caesar prepares for the Gallic campaign. He needs a messenger to send orders, a scribe to record his dispatches, and weapons for his troops. Does he visit the armourers himself? Does he write his own letters? No — the *Praefectus Castrorum* (Camp Prefect) **assembles everything and delivers it to Caesar**.

Today, dispatches go by scroll. Tomorrow, Caesar might be in the field — dispatches go by mounted courier. Caesar never changes. The *Officium* swaps the messenger silently.

This is the essence of Dependency Injection: **give the object what it needs, don't let it go fetch it.**

> *"Non ipse quaerit, accipit!"* — He does not seek it himself, he receives it!

---

## Intent

Provide an object's dependencies **from the outside** rather than having it create them internally. This inverts the control of object creation — the object declares what it needs; something else supplies it.

Also known as: *Inversion of Control (IoC)*, *Constructor Injection*, *Service Injection*.

---

## Structure

```
IMessenger  (interface)
└── + send(to, message)

ILogger  (interface)
└── + log(event)

ScrollMessenger  ──implements──▶ IMessenger  (production)
MockMessenger    ──implements──▶ IMessenger  (testing — records calls)
ConsoleLogger    ──implements──▶ ILogger

MilitaryCampaign  (the consumer — knows nothing about concrete classes)
├── - messenger: IMessenger    ← injected via constructor
├── - logger:    ILogger       ← injected via constructor
└── + launchAttack(target)
```

---

## When to Use

- ✅ Unit testing — inject mocks instead of real services
- ✅ Swapping implementations (MySQL ↔ PostgreSQL, SendGrid ↔ Mailgun)
- ✅ Framework and library development
- ✅ Any time an object's behaviour should vary by environment (dev/test/prod)
- ✅ Reducing coupling between application layers

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Easy to swap implementations | More boilerplate setup code |
| Excellent testability (inject mocks) | Can make object creation complex |
| Explicit dependencies — no hidden coupling | Requires discipline to avoid over-injection |
| Open/Closed — add new implementations without touching consumers | DI containers add their own learning curve |

---

## Run the Examples

```bash
# From the repository root:
make injection-cpp
make injection-py
make injection-php
make injection-java
make injection-ts
make injection-js
make injection-cs

# Or directly:
cd cpp        && make
cd python     && python3 officium.py
cd php        && php officium.php
cd java       && java Officium.java
cd typescript && tsc --module commonjs --target ES2022 officium.ts && node officium.js
cd javascript && node officium.js
cd csharp     && dotnet script Officium.cs
```

---

## Key Implementation Notes

### Constructor vs. Setter Injection
All implementations use **constructor injection** — the dependencies are passed at creation time and cannot change. This is the preferred form: it makes dependencies explicit and guarantees the object is always in a valid state.

### The Mock Messenger
The `MockMessenger` in each demo records all sent messages in a list. After the test, you can assert exactly which messages were sent to whom — this is the key testing benefit of DI.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | Constructor injection via const references, interface via pure virtual |
| Python | Duck typing; no interface required, but `ABC` can be used |
| PHP | Constructor promotion, `readonly` properties |
| Java | Records for mock capture, `interface` for both services |
| TypeScript | `interface` + constructor injection, private readonly fields |
| JavaScript | Constructor parameters stored as instance fields |
| C# | `record` types for lightweight implementations, `interface` |

### DI Containers (not shown)
Real applications often use DI containers (Spring, .NET DI, Dagger, tsyringe) that wire dependencies automatically. The examples here show **manual DI** — the foundation that all DI containers build on.

---

## Related Patterns

- **Factory Method** — often used inside DI containers to create instances
- **Strategy** — DI delivers a strategy to an object
- **Service Locator** — the anti-pattern alternative: object pulls its own deps from a registry (harder to test)

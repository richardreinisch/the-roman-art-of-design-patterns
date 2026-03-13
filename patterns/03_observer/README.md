# 👁 03 — Observer Pattern
### *Una specula ardet, omnes vident — One tower burns, all see*

> **Category:** Behavioral Pattern

---

## The Roman Analogy

**The Speculae** — Rome's network of watchtowers and signal stations stretching from Hadrian's Wall to the Syrian desert.

When a Pictish warband crosses the Wall, the nearest tower lights its beacon. No courier rides to each camp. No general checks manually every hour. The moment the fire is lit, **every subscribed observer reacts simultaneously**: the local Legate mobilises his cohort, the Emperor in Rome receives word, the Chronicler records it in the Annales.

When the threat passes, the tower extinguishes its fire — and all observers know to stand down. Observers can also choose to unsubscribe: when the Emperor travels east, he stops receiving Wall signals.

> *"Una specula ardet, omnes vident!"* — One tower burns, all see!

---

## Intent

Define a **one-to-many dependency** between objects so that when one object (the Subject) changes state, all its dependents (Observers) are **notified and updated automatically**.

Also known as: *Publish/Subscribe*, *Event Listener*, *Dependents*.

---

## Structure

```
SignalTower  (Subject)
├── - observers: List<SignalObserver>
├── + subscribe(observer)
├── + unsubscribe(observer)
└── + fireSignal(message, urgency)    ← notifies all

SignalObserver  (interface)
├── + onSignal(message, urgency)
└── + observerName: string

RomanLegate       ──implements──▶ onSignal() → mobilise if urgency ≥ 4
EmperorInRome     ──implements──▶ onSignal() → act based on urgency level
ChroniclerAnnales ──implements──▶ onSignal() → always record, track count
```

---

## When to Use

- ✅ Event handling systems (DOM events, GUI frameworks)
- ✅ Real-time notifications (chat, live feeds)
- ✅ MVC: keeping Views in sync with Model changes
- ✅ Logging and audit systems that react to application events
- ✅ Messaging and pub/sub infrastructure

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Open/Closed — add observers without touching the subject | Observers notified in unpredictable order |
| Loose coupling — subject knows nothing about observers | Memory leaks if observers aren't unsubscribed |
| Dynamic subscribe/unsubscribe at runtime | Can trigger cascading updates that are hard to trace |
| Broadcast to unlimited observers | Performance hit with many observers on frequent events |

---

## Run the Examples

```bash
# From the repository root:
make observer-cpp
make observer-py
make observer-php
make observer-java
make observer-ts
make observer-js
make observer-cs

# Or directly:
cd cpp        && make
cd python     && python3 speculae.py
cd php        && php speculae.php
cd java       && java Speculae.java
cd typescript && tsc --module commonjs --target ES2022 speculae.ts && node speculae.js
cd javascript && node speculae.js
cd csharp     && dotnet script Speculae.cs
```

---

## Key Implementation Notes

### Urgency Levels
The demo uses an urgency integer (1–5) to show how different observers react differently to the same event — a core Observer strength: each observer has its own logic.

### Unsubscribe Demonstration
The Emperor unsubscribes mid-demo to show dynamic observer management. Forgetting to unsubscribe is the classic Observer memory-leak bug.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | `std::vector<Observer*>`, `remove_if` for unsubscribe |
| Python | List of callables; duck typing means no interface needed |
| PHP | `SplObserver` / `SplSubject` built-in interfaces available |
| Java | `ArrayList`, `removeIf`, var records for the signal |
| TypeScript | Interface enforces `observerName` + `onSignal()` contract |
| JavaScript | Private `#observers` field with array filter |
| C# | `List<T>`, `ISignalObserver` interface, event-style design |

---

## Related Patterns

- **Mediator** — centralises communication; Observer distributes it
- **Event Aggregator** — a registry of many subjects and many observers
- **Command** — observers often execute Command objects upon notification

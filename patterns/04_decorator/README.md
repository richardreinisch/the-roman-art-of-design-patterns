# 🎭 04 — Decorator Pattern
### *Miles ornatur, non mutatur — The soldier is adorned, not changed*

> **Category:** Structural Pattern

---

## The Roman Analogy

**The Triumphator's Dressing Room** — the ritual preparation of a Roman general awarded a Triumph.

A bare *Tiro* (recruit) enters the room. Layer by layer, his equipment is added: first the *Lorica Segmentata* (plate armour), then the *Gallic Helmet* with its bronze cheek-guards, then the *Paludamentum* (the general's crimson cloak), and finally — for the greatest honour — the *Laurel Wreath of Triumph*.

At each step, the **same soldier** has new capabilities. His combat power increases with each layer. The layers can be applied in any order, combined in any combination. And crucially: none of the layers *change* who the soldier is — they only *extend* what he can do.

> *"Miles ornatur, non mutatur!"* — The soldier is adorned, not changed!

---

## Intent

Attach **additional responsibilities to an object dynamically**. Decorators provide a flexible alternative to subclassing for extending functionality.

---

## Structure

```
Soldier  (interface / abstract)
├── + describe(): string
├── + combatPower(): int
└── + status(): string

BareSoldier ──implements──▶ Soldier  (the base object)

SoldierDecorator  (abstract, wraps a Soldier)
└── - soldier: Soldier               ← the wrapped object

LoricaSegmentata  ──extends──▶ SoldierDecorator (+30 power)
GallicHelmet      ──extends──▶ SoldierDecorator (+15 power)
PaludamentumCloak ──extends──▶ SoldierDecorator (+20 power, changes status)
LaurelWreath      ──extends──▶ SoldierDecorator (+50 power, adds shout())
```

---

## When to Use

- ✅ Adding behaviour to objects without modifying their class
- ✅ HTTP middleware chains (authentication → logging → caching)
- ✅ Python `@decorators` — this is literally the same pattern
- ✅ I/O streams (Java's `BufferedReader(FileReader(...))`)
- ✅ When subclassing would lead to an explosion of subclass combinations

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Extend behaviour without subclassing | Many small wrapper objects can be confusing |
| Combine decorators freely at runtime | Order of decoration can matter (and surprise) |
| Single Responsibility — each decorator does one thing | Hard to remove a specific decorator mid-chain |
| Open/Closed — add new decorators without changing existing code | Type identity checks (`instanceof`) can fail |

---

## Run the Examples

```bash
# From the repository root:
make decorator-cpp
make decorator-py
make decorator-php
make decorator-java
make decorator-ts
make decorator-js
make decorator-cs

# Or directly:
cd cpp        && make
cd python     && python3 triumphator.py
cd php        && php triumphator.php
cd java       && java Triumphator.java
cd typescript && tsc --module commonjs --target ES2022 triumphator.ts && node triumphator.js
cd javascript && node triumphator.js
cd csharp     && dotnet script Triumphator.cs
```

---

## Key Implementation Notes

### The Wrapping Chain
Each decorator holds a reference to the object it wraps and calls it inside its own methods — then adds something. The chain can be arbitrarily deep:

```
LaurelWreath(PaludamentumCloak(GallicHelmet(LoricaSegmentata(BareSoldier()))))
```

### Power Accumulation
`combatPower()` chains all the way down: `LaurelWreath` calls `PaludamentumCloak` which calls `GallicHelmet` which calls `LoricaSegmentata` which calls `BareSoldier`. The total is the sum of all layers.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | Abstract base class, virtual methods, constructor chaining |
| Python | Python's own `@decorator` syntax is this pattern; demo uses the class-based form |
| PHP | Interface + abstract class, constructor promotion |
| Java | `sealed interface`, records for the base, abstract decorator class |
| TypeScript | Abstract class enforces the interface contract |
| JavaScript | ES2022 class inheritance |
| C# | `abstract` class with `virtual` methods and `override` |

---

## Related Patterns

- **Composite** — Decorator wraps one object; Composite manages a tree of objects
- **Strategy** — changes the inside of an object; Decorator changes the outside
- **Chain of Responsibility** — similar chain structure, but passes a request along; Decorator enhances and always delegates

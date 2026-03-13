# ⚔ 08 — Strategy Pattern
### *Non una via vincimus — We do not win by one road alone*

> **Category:** Behavioral Pattern

---

## The Roman Analogy

**The Ars Bellica** — the Roman art of war, famed for its adaptability.

The same *Legio X Gemina* faces open fields in Hispania, dense forest in Germania, and mountain passes in Judaea. A rigid army using one tactic in all terrains loses. The Roman legion carries **multiple formations in its doctrine** and the general chooses the right one at the moment of engagement:

- **Testudo** (Tortoise) — shields locked overhead and on all sides; slow, nearly impenetrable under missile fire
- **Cuneus** (Wedge) — charging wedge that splits an enemy line; devastating in open ground
- **Orbis** (Circle) — 360° defensive ring when surrounded with no escape
- **Fuga Tactica** (Tactical Retreat) — controlled withdrawal to fight another day

The legion doesn't change. The strategy does.

> *"Non una via vincimus!"* — We do not win by one road alone!

---

## Intent

Define a **family of algorithms**, encapsulate each one, and make them **interchangeable**. Strategy lets the algorithm vary independently from the clients that use it.

---

## Structure

```
BattleStrategy  (interface)
├── + strategyName(): string
└── + execute(battle: Battle): string

Testudo      ──implements──▶ BattleStrategy  (defensive, missile protection)
Cuneus       ──implements──▶ BattleStrategy  (aggressive, wedge charge)
Orbis        ──implements──▶ BattleStrategy  (360° surrounded defence)
FugaTactica  ──implements──▶ BattleStrategy  (tactical withdrawal)

RomanLegion  (Context)
├── - strategy: BattleStrategy   ← the current strategy
├── + setStrategy(strategy)      ← swap at runtime
└── + engage(battle)             ← delegates to strategy.execute()

Battle  (data object)
├── enemies: int
├── terrain: string
└── morale:  int
```

---

## When to Use

- ✅ Multiple algorithms for the same task (sorting, compression, pathfinding)
- ✅ Switching payment methods at runtime (credit card, PayPal, crypto)
- ✅ Authentication strategies (OAuth, JWT, Basic Auth, SAML)
- ✅ Replacing conditional logic (`if type == X ... else if type == Y ...`)
- ✅ When algorithm implementation details should be hidden from the client

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Swap algorithms at runtime | Client must be aware of strategy differences |
| Open/Closed — add strategies without touching the context | Overkill if only 2–3 algorithms are ever needed |
| Eliminates long if/else or switch chains | More objects to manage |
| Isolate algorithm implementation details | Can be replaced by lambdas/first-class functions in modern languages |

---

## Run the Examples

```bash
# From the repository root:
make strategy-cpp
make strategy-py
make strategy-php
make strategy-java
make strategy-ts
make strategy-js
make strategy-cs

# Or directly:
cd cpp        && make
cd python     && python3 ars_bellica.py
cd php        && php ars_bellica.php
cd java       && java ArsBellica.java
cd typescript && tsc --module commonjs --target ES2022 ars_bellica.ts && node ars_bellica.js
cd javascript && node ars_bellica.js
cd csharp     && dotnet script ArsBellica.cs
```

---

## Key Implementation Notes

### Strategy vs. Hardcoded Behaviour
Without Strategy, `RomanLegion.engage()` would contain a long chain of `if terrain == "open" && morale > 7 ...`. With Strategy, that logic is removed entirely — the right strategy object is set before `engage()` is called.

### Runtime Switching
The demo shows `setStrategy()` being called mid-scenario to show the pattern's core power: the **context object stays the same** while the **algorithm changes dynamically**.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | Pure virtual `execute()`, `unique_ptr<BattleStrategy>` |
| Python | `@dataclass` for Battle, duck typing for strategies |
| PHP | `interface`, type hints, constructor promotion |
| Java | `interface` with `record Battle`, sealed implementations |
| TypeScript | `interface Battle`, strict typing throughout |
| JavaScript | No interface needed; duck typing in the `engage()` call |
| C# | `record Battle`, `IBattleStrategy` interface |

### Strategy vs. State
Strategy and State have nearly identical structure. The difference: **Strategy** algorithms are independent and interchangeable (the context doesn't know which one it has). **State** transitions depend on the current state (the context drives state changes based on conditions).

---

## Related Patterns

- **State** — similar structure; State manages transitions, Strategy manages algorithms
- **Template Method** — defines a skeleton algorithm with overridable steps (inheritance-based alternative)
- **Decorator** — adds behaviour on top; Strategy replaces the whole algorithm

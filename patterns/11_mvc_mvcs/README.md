# 🏰 11 — MVC / MVCS Pattern
### *Divide et impera — Divide and rule*

> **Category:** Architectural Pattern

---

## The Roman Analogy

**The Res Publica** — the Roman Republic's separation of powers, established 509 BCE.

Rome did not give all power to one man. It divided authority:

- The **Lex** (Law / Model) — the written law and state data. It exists independently. It does not know who reads it or displays it.
- The **Contio** (Public Assembly / View) — the physical place where laws are announced to citizens. It shows information; it does not make decisions.
- The **Senate** (Controller) — receives petitions from citizens, interprets the law, and issues commands to the assembly.
- The **Quaestores** (Service) — the financial officers who handle complex cross-cutting duties, sitting between the Senate and the treasury.

The genius of the Republic was **separation of powers** — exactly the same principle as MVC.

> *"Divide et impera!"* — Divide and rule!

---

## Intent

Separate an application into three (or four) distinct layers:
- **Model** — data and business rules, no knowledge of how data is displayed
- **View** — renders data, no business logic
- **Controller** — handles user input, coordinates Model and View
- **Service** *(MVCS extension)* — complex reusable business logic extracted from the Controller

---

## Structure

```
LegionModel  (Model — data + queries)
├── - legions: Map<id, Legion>
├── + add(name, strength, province)
├── + getAll(): List<Legion>
├── + getByProvince(province): List<Legion>
├── + update(legion)
└── + totalStrength(): int

LegionView  (View — presentation only)
├── + renderList(legions)
├── + showMsg(message)
└── + showStrength(total)

LegionService  (Service — reusable business logic)
├── - model: LegionModel
└── + reinforce(province, troops): string

LegionController  (Controller — orchestrates)
├── - model:   LegionModel
├── - view:    LegionView
├── - service: LegionService
├── + addLegion(name, strength, province)
├── + reinforce(province, count)
└── + showStrength()
```

---

## When to Use

- ✅ Any application with a user interface — web, desktop, CLI
- ✅ Rails, Django, Laravel, ASP.NET MVC, Spring MVC — all implement this pattern
- ✅ When you want to swap UIs without changing business logic (render HTML *or* JSON from the same controller)
- ✅ When multiple views need to display the same data differently
- ✅ Any time testability of business logic matters (test Controller/Service without a real View)

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Clear separation of concerns | More files and classes to manage |
| Model and Controller are independently testable | Can be over-engineering for tiny apps |
| Multiple views from one model | Controllers can become "fat" if discipline lapses |
| MVCS Service layer keeps Controllers thin | Adds a learning curve for beginners |

---

## Run the Examples

```bash
# From the repository root:
make mvc-cpp
make mvc-py
make mvc-php
make mvc-java
make mvc-ts
make mvc-js
make mvc-cs

# Or directly:
cd cpp        && make
cd python     && python3 res_publica.py
cd php        && php res_publica.php
cd java       && java ResPublica.java
cd typescript && tsc --module commonjs --target ES2022 res_publica.ts && node res_publica.js
cd javascript && node res_publica.js
cd csharp     && dotnet script ResPublica.cs
```

---

## Key Implementation Notes

### MVC vs MVCS
Pure MVC puts all business logic in the Controller. In MVCS the Controller stays thin — it only *orchestrates* — while a **Service** layer handles the actual business rules. The Service is reusable (multiple controllers can call it) and independently testable.

In the demo: `LegionController.reinforce()` is just two lines — it calls `service.reinforce()` and then `view.renderList()`. All the logic (distribute troops proportionally across legions) lives in `LegionService`.

### The Model is Ignorant
`LegionModel` has no reference to `LegionView`. It doesn't know if anyone is watching. In a real app, the Model might fire Observer events — but the dependency always goes Model → *(notifies)* → View, never Model → *(imports)* → View.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | `struct Legion`, `std::map`, `std::vector` |
| Python | `@dataclass` for Legion, `dict` store, type hints |
| PHP | Typed properties, constructor promotion, `array_filter` |
| Java | Records for Legion, `LinkedHashMap`, streams |
| TypeScript | `interface Legion`, `Map`, full type annotations |
| JavaScript | Spread operator for immutable Legion updates |
| C# | `record Legion` with `with` expression, LINQ, `List.ForEach` |

---

## Related Patterns

- **Observer** — often used to notify Views of Model changes
- **Command** — Controller actions can be implemented as Commands (enables undo)
- **Facade** — Service layer acts as a Facade over multiple Models

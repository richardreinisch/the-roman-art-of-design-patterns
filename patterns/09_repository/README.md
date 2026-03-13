# 📚 09 — Repository Pattern
### *Ubi data est? Tabularius scit — Where is the data? The archivist knows*

> **Category:** Enterprise / Architectural Pattern

---

## The Roman Analogy

**The Tabularium** — Rome's official state archive, built in 78 BCE on the Capitoline Hill, overlooking the Forum Romanum.

Every census record, every legal decree, every land survey, every military roster is stored here on wax tablets and papyrus scrolls. The Senate needs the census figures for Gaul? They send a *Tabularius* (archivist). The Tabularius knows exactly which shelf, which cabinet, which scroll.

The Senate does not rummage through tablets themselves. They do not know how the archive is organised. They ask: *"How many citizens in the Third District?"* — and the Tabularius returns the answer.

Swap the Tabularium from wax tablets to a new papyrus system? The Senate never notices. The interface — *"ask the Tabularius"* — stays the same.

> *"Ubi data est? Tabularius scit!"* — Where is the data? The archivist knows!

---

## Intent

Encapsulate the logic for **accessing a data store** behind a collection-like interface. Business logic talks to the repository; the repository talks to the database (or any storage backend).

---

## Structure

```
ICenturionRepository  (interface)
├── + findById(id): Centurion?
├── + findByLegion(legion): List<Centurion>
├── + findAll(): List<Centurion>
├── + save(centurion): Centurion
└── + delete(id): bool

InMemoryCenturionRepository  ──implements──▶ ICenturionRepository
└── - store: Map<string, Centurion>   ← in-memory backend

CenturionService  (business logic — uses only the interface)
├── - repo: ICenturionRepository
└── + promoteBest(legion): string     ← queries, promotes, saves

Centurion  (domain object)
├── id, name, legion, rank, battlesWon
```

---

## When to Use

- ✅ Abstracting database access from business logic (DDD, Clean Architecture)
- ✅ Testing — swap the real DB repo for an in-memory repo
- ✅ Multiple storage backends (SQL, NoSQL, file system, API)
- ✅ Domain-Driven Design — repositories are a core DDD building block
- ✅ Centralising query logic to avoid scattered database calls

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Business logic is database-agnostic | Extra abstraction layer to maintain |
| Testable without a real database | Can become a thin wrapper that adds no value |
| Centralised data access logic | ORM already provides some of this |
| Swap storage backends without changing business logic | Risk of leaking DB concerns into the interface |

---

## Run the Examples

```bash
# From the repository root:
make repository-cpp
make repository-py
make repository-php
make repository-java
make repository-ts
make repository-js
make repository-cs

# Or directly:
cd cpp        && make
cd python     && python3 tabularium.py
cd php        && php tabularium.php
cd java       && java Tabularium.java
cd typescript && tsc --module commonjs --target ES2022 tabularium.ts && node tabularium.js
cd javascript && node tabularium.js
cd csharp     && dotnet script Tabularium.cs
```

---

## Key Implementation Notes

### In-Memory Repository
All implementations use a `Map`/`dict`/`Dictionary` as the storage backend. This makes the demo runnable with zero infrastructure — but the key point is that swapping in a real SQL backend requires **only a new class implementing the same interface**.

### The Service Layer
The `CenturionService` demonstrates how business logic (find the best centurion in a legion, promote them) lives *above* the repository and talks only to the interface. It has no idea whether data lives in memory, Postgres, or a scroll.

### `save()` for Both Insert and Update
The `save()` method handles both creating new records and updating existing ones — the "upsert" pattern, keyed on `id`. This mirrors how real ORM `save()`/`persist()` methods work.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | `std::unordered_map`, `std::optional<Centurion>` |
| Python | `dict` as store, dataclass for Centurion, `Optional` |
| PHP | Associative array, `?Centurion` nullable return |
| Java | `LinkedHashMap` (preserves insertion order), `Optional<T>`, records |
| TypeScript | `Map<string, Centurion>`, interface for the repo contract |
| JavaScript | `Map`, spread operator for immutable updates |
| C# | `Dictionary<string, Centurion>`, record `with` for updates, LINQ |

---

## Related Patterns

- **Data Access Object (DAO)** — similar concept; DAO is often more table-centric, Repository is more domain-centric
- **Unit of Work** — often used alongside Repository to batch database operations
- **Specification** — encapsulates query criteria to pass into repository methods

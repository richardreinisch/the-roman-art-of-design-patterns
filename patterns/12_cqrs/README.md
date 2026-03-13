# ⚖ 12 — CQRS Pattern
### *Qui legit non scribit; qui scribit non legit*
### *He who reads does not write; he who writes does not read*

> **Category:** Enterprise / Architectural Pattern

---

## The Roman Analogy

**The Two Consuls** — Rome's dual magistracy, the supreme office of the Roman Republic.

Each year, the Roman people elected **two Consuls** of equal rank. The system was designed so that neither could act alone, and their duties were strictly separated:

- The **Consul Prior** commanded the legions in the field — he *wrote* orders, *issued* commands, *changed* the state of the empire. He acted; he did not contemplate.
- The **Consul Posterior** presided over the Senate, *read* the state of affairs, *queried* the treasury, *reported* to the people. He observed; he did not command.

Neither consul read his colleague's correspondence. Neither wrote on behalf of the other. Each was optimised for his role.

> *"Qui legit non scribit; qui scribit non legit!"*

---

## Intent

**Separate the read and write sides** of an application into distinct models:
- **Command side** — handles all state-changing operations (write, create, update, delete). Optimised for consistency.
- **Query side** — handles all read operations. Optimised for speed, uses a separate read model (projection) built from events.

---

## Structure

```
── WRITE SIDE ────────────────────────────────────────────
CqrsEvent  (immutable record of what happened)
├── type:     "ENROLL" | "DEPLOY"
├── legionId, name, province, strength

WriteStore  (write model — source of truth)
├── - legions: Map<id, Legion>
├── - events:  List<CqrsEvent>    ← full event log
└── + apply(event)                ← mutates write model

CommandConsul  (Command side — the only path for writes)
├── + enroll(name, province, strength): id
└── + deploy(id, province)

── READ SIDE ─────────────────────────────────────────────
ReadStore  (read model — optimised projection)
├── - views: Map<id, Legion>
└── + project(event)              ← rebuilds from events
    + query(province?): Legion[]  ← fast filtered reads

QueryConsul  (Query side — the only path for reads)
└── + listActive(province?)
```

---

## When to Use

- ✅ High-traffic systems where read/write loads are very different
- ✅ Event sourcing — when you need a full audit log of every change
- ✅ Microservices — each service owns its own read model
- ✅ Reporting systems that need denormalised, fast read models
- ✅ When complex domain logic makes a single CRUD model unwieldy

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Read and write sides scale independently | Significantly more complexity than CRUD |
| Read model can be optimised for every query | Eventual consistency between write and read sides |
| Full event log enables audit, replay, and time-travel | Overkill for simple applications |
| Clean separation of concerns | Two codebases to maintain |

---

## Run the Examples

```bash
# From the repository root:
make cqrs-cpp
make cqrs-py
make cqrs-php
make cqrs-java
make cqrs-ts
make cqrs-js
make cqrs-cs

# Or directly:
cd cpp        && make
cd python     && python3 consules.py
cd php        && php consules.php
cd java       && java Consules.java
cd typescript && tsc --module commonjs --target ES2022 consules.ts && node consules.js
cd javascript && node consules.js
cd csharp     && dotnet script Consules.cs
```

---

## Key Implementation Notes

### Event as the Source of Truth
Every state change is recorded as an immutable `CqrsEvent`. Both the `WriteStore` and `ReadStore` are built by *replaying* these events. This means the full history is preserved and you can rebuild any projection from scratch.

### Synchronous Projection (simplified)
In production CQRS, the read model is often updated **asynchronously** — events flow through a message bus (Kafka, RabbitMQ) to projections running in separate services. In this demo, `CommandConsul` calls `read.project(event)` synchronously immediately after `write.apply(event)` for simplicity. The structure of the two sides remains identical.

### Query Filtering
`QueryConsul.listActive()` accepts an optional `province` filter. The read model is purpose-built for this query — no joins, no aggregation at query time.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | `struct` for event, `std::unordered_map`, optional string arg |
| Python | `@dataclass(frozen=True)` for immutable events, `Optional[str]` |
| PHP | Readonly properties for events, `array_filter` for queries |
| Java | Records for `Event` and `Legion`, streams, `Optional` |
| TypeScript | `interface CqrsEvent` (renamed from `Event` to avoid DOM conflict), `Map` |
| JavaScript | Spread operator for immutable updates, `Map` for both stores |
| C# | `record CqrsEvent`, `record Legion` with `with`, LINQ `.Where().ToList()` |

### TypeScript Note
The TypeScript implementation renames the `Event` interface to `CqrsEvent` to avoid collision with the browser's built-in `Event` type. This is a common real-world gotcha when working in browser-targeting TypeScript projects.

---

## Related Patterns

- **Event Sourcing** — CQRS's natural companion; store all changes as events, rebuild state by replay
- **Repository** — the Query side often uses a Repository to serve its read model
- **Observer** — events on the write side can notify read-side projections (message bus pattern)
- **Mediator** — command dispatchers often use a Mediator to route commands to handlers

# 🛡 10 — Proxy Pattern
### *Legatus vocem imperatoris habet — The legate has the voice of the emperor*

> **Category:** Structural Pattern

---

## The Roman Analogy

**The Legatus Augusti** — the Emperor's personal representative, sent to govern a province with full imperial authority.

Emperor Hadrian cannot personally receive every petition from Syria, Aegyptus, Britannia, and Hispania. A Legate is appointed: he speaks *with the Emperor's voice*. Crucially, the Legate does three things the Emperor himself would not bother with:

- **Access control** — petitions from unauthorised territories are rejected before they ever reach Rome
- **Caching** — common questions (*"What is the census of Aegyptus?"*) are answered from memory; the Emperor need not be disturbed twice for the same query
- **Logging** — every request is recorded in the Legatus's register, whether granted or denied

The provincial governor sees no difference: he sends a request and receives an imperial answer. He does not know whether Hadrian answered personally or the Legate did.

> *"Legatus vocem imperatoris habet!"* — The legate has the voice of the emperor!

---

## Intent

Provide a **surrogate or placeholder** for another object to control access to it.

---

## Structure

```
IImperialService  (interface — shared by both real and proxy)
├── + issueDecree(province, decree): string
└── + getCensus(province): string

EmperorHadrian  (RealSubject — the actual implementation)
├── + issueDecree(province, decree): string  ← expensive: wakes the emperor
└── + getCensus(province): string

LegateProxy  (Proxy — controls access to the emperor)
├── - emperor: EmperorHadrian?          ← lazy: only created on first real request
├── - cache: Map<province, string>      ← caching proxy
├── - authorized: Set<province>         ← protection proxy
├── - count: int                        ← logging proxy
├── + issueDecree(province, decree)     ← checks authorization, then delegates
└── + getCensus(province)               ← checks cache, then delegates
```

---

## When to Use

- ✅ **Lazy initialisation** — delay creating an expensive object until it's actually needed
- ✅ **Access control** — verify permissions before forwarding the request
- ✅ **Caching** — store results of expensive or repeated operations
- ✅ **Logging / auditing** — record all requests transparently
- ✅ **Remote proxy** — represent an object living in another process or machine (gRPC stubs, REST clients)

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Open/Closed — add proxy behaviour without touching the real service | Extra class and indirection |
| Transparent to the client | Response time may increase if cache misses are frequent |
| Combines multiple cross-cutting concerns (auth + cache + log) | Can make code harder to follow |
| Lazy init avoids expensive startup costs | |

---

## Run the Examples

```bash
# From the repository root:
make proxy-cpp
make proxy-py
make proxy-php
make proxy-java
make proxy-ts
make proxy-js
make proxy-cs

# Or directly:
cd cpp        && make
cd python     && python3 legatus.py
cd php        && php legatus.php
cd java       && java Legatus.java
cd typescript && tsc --module commonjs --target ES2022 legatus.ts && node legatus.js
cd javascript && node legatus.js
cd csharp     && dotnet script Legatus.cs
```

---

## Key Implementation Notes

### Three Proxy Types in One
The `LegateProxy` demonstrates three classic proxy behaviours simultaneously:
1. **Protection Proxy** — the `authorized` set blocks requests from unlisted provinces
2. **Caching Proxy** — `getCensus()` returns cached results on second call
3. **Lazy Initialisation** — `EmperorHadrian` is only instantiated when actually needed (the first authorised request)

### Cache Hit vs Miss
The demo calls `getCensus("Aegyptus")` twice. The second call prints `[Cache HIT]` and never touches the emperor — this is the caching proxy in action.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | Lazy init via raw pointer initialised to `nullptr` |
| Python | `None`-check for lazy init, `dict` cache |
| PHP | `?EmperorHadrian` nullable, `array` cache |
| Java | `null`-check lazy init, `Map`, `Set` for authorization |
| TypeScript | Optional chaining, `Map` and `Set` |
| JavaScript | Private `#emperor`, `#cache`, `#authorized` class fields |
| C# | Nullable `EmperorHadrian?`, `Dictionary`, `HashSet` |

---

## Related Patterns

- **Decorator** — same structure but different intent: Decorator adds behaviour, Proxy controls access
- **Adapter** — changes the interface; Proxy keeps the same interface
- **Facade** — simplifies a complex subsystem; Proxy controls a single object

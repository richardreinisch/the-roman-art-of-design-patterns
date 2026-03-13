# 🏛 01 — Singleton Pattern
### *Unus et Idem — One and the Same*

> **Category:** Creational Pattern

---

## The Roman Analogy

**The Aerarium Saturni** — the Roman State Treasury beneath the Temple of Saturn on the Capitoline Hill.

There is exactly **ONE** treasury for all of Rome. Caesar cannot create his own treasury. Cicero cannot create his own treasury. Even the Emperor himself uses the same vault.

When Julius Caesar wants gold for his Gallic campaigns, and Cicero wants coins for his legal bribes — they both access the **same single instance** of the Aerarium.

> *"Unum tesaurum habemus!"* — We have one treasury!

---

## Intent

Ensure a class has **only one instance** and provide a **global access point** to it.

---

## Structure

```
AerariumSaturni
├── - instance: AerariumSaturni   (static, private)
├── - goldReserves: int
├── - AerariumSaturni()           (private constructor)
├── + getInstance(): AerariumSaturni  (static)
├── + deposit(amount, citizen)
└── + withdraw(amount, citizen)
```

---

## When to Use

- ✅ Database connection pools
- ✅ Logger / audit trail services
- ✅ Application configuration managers
- ✅ Cache managers
- ✅ Thread pool managers

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Guaranteed single instance | Hard to unit test |
| Global access point | Violates Single Responsibility |
| Lazy initialization | Can hide bad design (global state) |
| Controlled shared resource | Multithreading hazards if careless |

---

## Run the Examples

```bash
# From the repository root:
make singleton-cpp
make singleton-py
make singleton-php
make singleton-java
make singleton-ts
make singleton-js
make singleton-cs

# Or directly:
cd cpp        && make
cd python     && python3 aerarium.py
cd php        && php aerarium.php
cd java       && java AerariumSaturni.java
cd typescript && tsc --module commonjs --target ES2022 aerarium.ts && node aerarium.js
cd javascript && node aerarium.js
cd csharp     && dotnet script Aerarium.cs
```

---

## Key Implementation Notes

### Thread Safety
| Language | Thread-safety mechanism |
|----------|------------------------|
| C++ | `std::mutex` + double-checked locking |
| Python | `threading.Lock()` + double-checked locking |
| PHP | Single-threaded per request; `static::$instance` is idiomatic |
| Java | `volatile` + double-checked locking (classic); or `enum Singleton` |
| TypeScript | Single-threaded (JS event loop); no lock needed |
| JavaScript | Single-threaded; private `static #instance` field |
| C# | `Lazy<T>` — guaranteed thread-safe, no manual locking required |

### Preventing Duplicates
| Language | Mechanism |
|----------|-----------|
| C++ | `delete` copy constructor and assignment operator |
| Python | Override `__new__`, return existing instance |
| PHP | `private __clone()`, `private __construct()` |
| Java | `private` constructor; `volatile` instance field |
| TypeScript | `private` constructor; static `null` field |
| JavaScript | Private `static #instance`; constructor throws if called twice |
| C# | `sealed` class; `Lazy<T>` for lazy thread-safe init |

---

## Related Patterns

- **Factory Method** — can return a Singleton
- **Facade** — often implemented as Singleton
- **Flyweight** — similar pool concept but for many shared objects

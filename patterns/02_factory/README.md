# ⚒ 02 — Factory Method Pattern
### *Fabrica dat, miles accipit — The workshop gives, the soldier receives*

> **Category:** Creational Pattern

---

## The Roman Analogy

**The Imperial Fabrica** — Rome's state weapons workshops, scattered across the empire in cities like Carnuntum, Eboracum, and Aquincum.

The General issues an order: *"Arm the Third Cohort."* He does not go to the forge himself. He does not know whether the swords will be cast in Hispania or smelted in Noricum. He simply commands — and the appropriate **Fabrica** produces the weapon.

Each workshop specialises: the infantry fabrica forges *Gladii*, the artillery fabrica builds *Ballistae*, the archer fabrica crafts *Pila*. The General receives exactly what he needs, without knowing — or caring — how it was made.

> *"Fabrica dat, miles accipit!"* — The workshop gives, the soldier receives!

---

## Intent

Define an interface for creating an object, but let **subclasses decide which class to instantiate**. The Factory Method lets a class defer instantiation to subclasses.

---

## Structure

```
WeaponFactory  (abstract)
├── + createWeapon(): Weapon     ← the factory method
└── + armSoldier()               ← uses createWeapon()

InfantryFactory   ──extends──▶  createWeapon() → Gladius
ArcherFactory     ──extends──▶  createWeapon() → Pilum
SiegeFactory      ──extends──▶  createWeapon() → Ballista
ShieldBearerFactory ────────▶  createWeapon() → Scutum

Weapon  (interface)
├── describe(): string
├── attack():   string
└── damage():   int
```

---

## When to Use

- ✅ When you don't know at compile time which class to instantiate
- ✅ Database connection factories (MySQL, PostgreSQL, SQLite)
- ✅ UI component factories (Windows vs macOS vs Web widgets)
- ✅ Plugin and extension systems
- ✅ Logging framework backends

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Open/Closed Principle — add new products without changing existing code | Many subclasses can make hierarchy complex |
| Single Responsibility — creation code in one place | Client must subclass the creator to create a product |
| Loose coupling between creator and products | Can be over-engineering for simple cases |

---

## Run the Examples

```bash
# From the repository root:
make factory-cpp
make factory-py
make factory-php
make factory-java
make factory-ts
make factory-js
make factory-cs

# Or directly:
cd cpp   && make
cd python && python3 fabrica.py
cd php    && php fabrica.php
cd java   && java Fabrica.java
cd typescript && tsc --module commonjs --target ES2022 fabrica.ts && node fabrica.js
cd javascript && node fabrica.js
cd csharp && dotnet script Fabrica.cs
```

---

## Key Implementation Notes

### The Core Idea
The abstract `WeaponFactory` calls `createWeapon()` in its `armSoldier()` method — but `createWeapon()` is abstract. Each subclass overrides it to return a different product. The creator never imports or mentions the concrete product classes.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | Pure virtual `createWeapon()`, polymorphic `unique_ptr<Weapon>` |
| Python | Abstract base class via `ABC` and `@abstractmethod` |
| PHP | `abstract` methods, strict return type hints |
| Java | `abstract` class with records for the concrete products |
| TypeScript | Interface + `abstract` class, full type safety |
| JavaScript | Base class throws if `createWeapon()` isn't overridden |
| C# | `abstract` class with `record` products |

---

## Related Patterns

- **Abstract Factory** — Factory Method is often the building block of Abstract Factories
- **Singleton** — factory methods often return singletons
- **Prototype** — alternative creational pattern; clone instead of instantiate

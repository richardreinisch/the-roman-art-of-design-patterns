# 🏛 The Roman Art of Design Patterns

![The Roman Art of Design Patterns with Imperator Marcus Aurelius](the-roman-art-of-design-patterns.webp)

### *Codex Architecturae Romanae*

> **"Omnes vias ad codicem bonum ducunt"**
> *All roads lead to good code*

[![C++](https://img.shields.io/badge/C++-17-blue?logo=cplusplus)](patterns/)
[![Python](https://img.shields.io/badge/Python-3.10+-yellow?logo=python)](patterns/)
[![PHP](https://img.shields.io/badge/PHP-8.1+-purple?logo=php)](patterns/)
[![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)](patterns/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](patterns/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-yellow?logo=javascript)](patterns/)
[![C#](https://img.shields.io/badge/C%23-.NET8-green?logo=dotnet)](patterns/)
[![CI](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/roman-design-patterns/ci.yml?label=CI&logo=github)](../../actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold)](LICENSE)

---

**12 software design patterns**, each illustrated with **ancient Roman life analogies** and implemented in **7 languages**: C++, Python, PHP, Java, TypeScript, JavaScript, and C#.

Every example is **immediately runnable** — no frameworks, no external dependencies. Just clone and execute.

---

## 📜 Patterns Index

| # | Pattern | Category | Roman Metaphor | C++ | Py | PHP | Java | TS | JS | C# |
|---|---------|----------|---------------|:---:|:--:|:---:|:----:|:--:|:--:|:--:|
| 01 | [Singleton](#-01-singleton--unus-et-idem) | Creational | Imperial Treasury 🏛 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 02 | [Factory Method](#-02-factory-method--fabrica-dat-miles-accipit) | Creational | Imperial Weaponry Workshop ⚒ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 03 | [Observer](#-03-observer--una-specula-ardet-omnes-vident) | Behavioral | Fire-Signal Network 👁 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 04 | [Decorator](#-04-decorator--miles-ornatur-non-mutatur) | Structural | Triumphator's Dressing Room 🎭 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 05 | [Adapter](#-05-adapter--interpres-pontem-verborum-aedificat) | Structural | The Roman Interpreter 🔗 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 06 | [Dependency Injection](#-06-dependency-injection--non-ipse-quaerit-accipit) | Architectural | Praetorian Quartermaster 💉 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 07 | [Command](#-07-command--mandatum-datum-mandatum-executum) | Behavioral | Imperial Building Commands 📜 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 08 | [Strategy](#-08-strategy--non-una-via-vincimus) | Behavioral | Roman Battle Formations ⚔ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 09 | [Repository](#-09-repository--ubi-data-est-tabularius-scit) | Enterprise | The Imperial Archive 📚 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 10 | [Proxy](#-10-proxy--legatus-vocem-imperatoris-habet) | Structural | The Imperial Legatus 🛡 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 11 | [MVC / MVCS](#-11-mvc--mvcs--divide-et-impera) | Architectural | The Roman Republic 🏰 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 12 | [CQRS](#-12-cqrs--qui-legit-non-scribit-qui-scribit-non-legit) | Enterprise | The Two Consuls ⚖ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 🚀 Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/roman-design-patterns.git
cd roman-design-patterns
```

### Run all patterns in one language
```bash
make cpp          # All C++ patterns
make python       # All Python patterns
make php          # All PHP patterns
make java         # All Java patterns
make typescript   # All TypeScript patterns (compiles + runs)
make javascript   # All JavaScript patterns
make csharp       # All C# patterns
make all          # Everything
```

### Run a single pattern in a specific language
```bash
make singleton-cpp        make singleton-py         make singleton-php
make singleton-java       make singleton-ts          make singleton-js
make singleton-cs

make factory-cpp          make factory-py           make factory-php
make factory-java         make factory-ts            make factory-js
make factory-cs

# ... same for: observer, decorator, adapter, injection,
#               command, strategy, repository, proxy, mvc, cqrs
```

---

## 📂 Repository Structure

```
roman-design-patterns/
├── README.md
├── Makefile                    ← run anything from here
├── tsconfig.json               ← shared TypeScript config
├── .github/workflows/ci.yml   ← CI: tests all 7 languages on push
└── patterns/
    ├── 01_singleton/
    │   ├── README.md           ← pattern explanation + Roman analogy
    │   ├── cpp/aerarium.cpp
    │   ├── python/aerarium.py
    │   ├── php/aerarium.php
    │   ├── java/AerariumSaturni.java
    │   ├── typescript/aerarium.ts
    │   ├── javascript/aerarium.js
    │   └── csharp/Aerarium.cs
    ├── 02_factory/ ...
    └── 12_cqrs/ ...
```

Each file is **self-contained**: no external dependencies, a header comment with run instructions, and a full demonstration at the bottom.

---

## 🛠 Requirements

| Language | Version | Run command | Install |
|----------|---------|-------------|---------|
| **C++** | C++17 | `g++ -std=c++17 file.cpp && ./a.out` | `brew install gcc` / `apt install g++` |
| **Python** | 3.10+ | `python3 file.py` | [python.org](https://python.org) |
| **PHP** | 8.1+ | `php file.php` | `brew install php` / `apt install php` |
| **Java** | 21+ | `java File.java` *(no compile step!)* | [adoptium.net](https://adoptium.net) |
| **TypeScript** | 5.0+ | `tsc file.ts && node file.js` | `npm install -g typescript` |
| **JavaScript** | ES2022 | `node file.js` | [nodejs.org](https://nodejs.org) |
| **C#** | .NET 8 | `dotnet script File.cs` | [dotnet.microsoft.com](https://dotnet.microsoft.com) + `dotnet tool install -g dotnet-script` |

---

## 🏛 01 Singleton — *Unus et idem*

> **The Roman Treasury (Aerarium Saturni)** — There is exactly ONE treasury beneath the Temple of Saturn. Caesar, Cicero, and Brutus all queue at the same single vault. Any attempt to create a second treasury is an act of treason.

**When to use:** database connection pools · logger/audit services · configuration managers · cache managers

| File | Run |
|------|-----|
| [`cpp/aerarium.cpp`](patterns/01_singleton/cpp/aerarium.cpp) | `make singleton-cpp` |
| [`python/aerarium.py`](patterns/01_singleton/python/aerarium.py) | `make singleton-py` |
| [`php/aerarium.php`](patterns/01_singleton/php/aerarium.php) | `make singleton-php` |
| [`java/AerariumSaturni.java`](patterns/01_singleton/java/AerariumSaturni.java) | `make singleton-java` |
| [`typescript/aerarium.ts`](patterns/01_singleton/typescript/aerarium.ts) | `make singleton-ts` |
| [`javascript/aerarium.js`](patterns/01_singleton/javascript/aerarium.js) | `make singleton-js` |
| [`csharp/Aerarium.cs`](patterns/01_singleton/csharp/Aerarium.cs) | `make singleton-cs` |

---

## ⚒ 02 Factory Method — *Fabrica dat, miles accipit*

> **The Imperial Weaponry Workshop (Fabrica)** — The General orders weapons without knowing how they're forged. The infantry factory produces swords; the siege factory, ballistae. Each factory knows its craft — the general just orders.

**When to use:** instantiation logic you don't know at compile time · database drivers · plugin/extension systems

| File | Run |
|------|-----|
| [`cpp/fabrica.cpp`](patterns/02_factory/cpp/fabrica.cpp) | `make factory-cpp` |
| [`python/fabrica.py`](patterns/02_factory/python/fabrica.py) | `make factory-py` |
| [`php/fabrica.php`](patterns/02_factory/php/fabrica.php) | `make factory-php` |
| [`java/Fabrica.java`](patterns/02_factory/java/Fabrica.java) | `make factory-java` |
| [`typescript/fabrica.ts`](patterns/02_factory/typescript/fabrica.ts) | `make factory-ts` |
| [`javascript/fabrica.js`](patterns/02_factory/javascript/fabrica.js) | `make factory-js` |
| [`csharp/Fabrica.cs`](patterns/02_factory/csharp/Fabrica.cs) | `make factory-cs` |

---

## 👁 03 Observer — *Una specula ardet, omnes vident*

> **Roman Fire-Signal Network (Speculae)** — One watchtower lights a beacon. Instantly, every tower in the chain reacts — legates mobilise, the emperor is informed, the chronicler records — without anyone polling manually.

**When to use:** event-driven systems · real-time notifications · MVC model ↔ view synchronisation

| File | Run |
|------|-----|
| [`cpp/speculae.cpp`](patterns/03_observer/cpp/speculae.cpp) | `make observer-cpp` |
| [`python/speculae.py`](patterns/03_observer/python/speculae.py) | `make observer-py` |
| [`php/speculae.php`](patterns/03_observer/php/speculae.php) | `make observer-php` |
| [`java/Speculae.java`](patterns/03_observer/java/Speculae.java) | `make observer-java` |
| [`typescript/speculae.ts`](patterns/03_observer/typescript/speculae.ts) | `make observer-ts` |
| [`javascript/speculae.js`](patterns/03_observer/javascript/speculae.js) | `make observer-js` |
| [`csharp/Speculae.cs`](patterns/03_observer/csharp/Speculae.cs) | `make observer-cs` |

---

## 🎭 04 Decorator — *Miles ornatur, non mutatur*

> **The Triumphator's Dressing Room** — Wrap a bare recruit in Lorica Segmentata, add a Gallic helmet, then the general's red cloak, then the laurel wreath of triumph. The same soldier — new capabilities layered on dynamically, in any order.

**When to use:** adding logging/caching without modifying a class · HTTP middleware chains · Python `@decorators` (it's literally this pattern)

| File | Run |
|------|-----|
| [`cpp/triumphator.cpp`](patterns/04_decorator/cpp/triumphator.cpp) | `make decorator-cpp` |
| [`python/triumphator.py`](patterns/04_decorator/python/triumphator.py) | `make decorator-py` |
| [`php/triumphator.php`](patterns/04_decorator/php/triumphator.php) | `make decorator-php` |
| [`java/Triumphator.java`](patterns/04_decorator/java/Triumphator.java) | `make decorator-java` |
| [`typescript/triumphator.ts`](patterns/04_decorator/typescript/triumphator.ts) | `make decorator-ts` |
| [`javascript/triumphator.js`](patterns/04_decorator/javascript/triumphator.js) | `make decorator-js` |
| [`csharp/Triumphator.cs`](patterns/04_decorator/csharp/Triumphator.cs) | `make decorator-cs` |

---

## 🔗 05 Adapter — *Interpres pontem verborum aedificat*

> **The Roman Interpreter (Interpres)** — A Gaul speaks Celtic, Rome speaks Latin. The interpreter stands between them, translating on the fly — without either party changing their language.

**When to use:** integrating legacy systems · third-party libraries with incompatible interfaces · ODBC (literally an adapter)

| File | Run |
|------|-----|
| [`cpp/interpres.cpp`](patterns/05_adapter/cpp/interpres.cpp) | `make adapter-cpp` |
| [`python/interpres.py`](patterns/05_adapter/python/interpres.py) | `make adapter-py` |
| [`php/interpres.php`](patterns/05_adapter/php/interpres.php) | `make adapter-php` |
| [`java/Interpres.java`](patterns/05_adapter/java/Interpres.java) | `make adapter-java` |
| [`typescript/interpres.ts`](patterns/05_adapter/typescript/interpres.ts) | `make adapter-ts` |
| [`javascript/interpres.js`](patterns/05_adapter/javascript/interpres.js) | `make adapter-js` |
| [`csharp/Interpres.cs`](patterns/05_adapter/csharp/Interpres.cs) | `make adapter-cs` |

---

## 💉 06 Dependency Injection — *Non ipse quaerit, accipit*

> **The Praetorian Quartermaster (Officium)** — Caesar doesn't forge his own sword. The Praefectus assembles equipment and delivers it. Swap the messenger from scroll to trumpet — Caesar never notices.

**When to use:** unit testing with mocks · swapping implementations (DB engines, email providers) · framework development

| File | Run |
|------|-----|
| [`cpp/officium.cpp`](patterns/06_dependency_injection/cpp/officium.cpp) | `make injection-cpp` |
| [`python/officium.py`](patterns/06_dependency_injection/python/officium.py) | `make injection-py` |
| [`php/officium.php`](patterns/06_dependency_injection/php/officium.php) | `make injection-php` |
| [`java/Officium.java`](patterns/06_dependency_injection/java/Officium.java) | `make injection-java` |
| [`typescript/officium.ts`](patterns/06_dependency_injection/typescript/officium.ts) | `make injection-ts` |
| [`javascript/officium.js`](patterns/06_dependency_injection/javascript/officium.js) | `make injection-js` |
| [`csharp/Officium.cs`](patterns/06_dependency_injection/csharp/Officium.cs) | `make injection-cs` |

---

## 📜 07 Command — *Mandatum datum, mandatum executum*

> **Imperial Building Commands (Mandatum)** — Orders sealed in wax: written, queued, executed, reversed, replayed. Vespasian orders the Colosseum — then changes his mind — then changes it back. Every command is an object.

**When to use:** undo/redo · task queues · transactional operations · macro recording

| File | Run |
|------|-----|
| [`cpp/mandatum.cpp`](patterns/07_command/cpp/mandatum.cpp) | `make command-cpp` |
| [`python/mandatum.py`](patterns/07_command/python/mandatum.py) | `make command-py` |
| [`php/mandatum.php`](patterns/07_command/php/mandatum.php) | `make command-php` |
| [`java/Mandatum.java`](patterns/07_command/java/Mandatum.java) | `make command-java` |
| [`typescript/mandatum.ts`](patterns/07_command/typescript/mandatum.ts) | `make command-ts` |
| [`javascript/mandatum.js`](patterns/07_command/javascript/mandatum.js) | `make command-js` |
| [`csharp/Mandatum.cs`](patterns/07_command/csharp/Mandatum.cs) | `make command-cs` |

---

## ⚔ 08 Strategy — *Non una via vincimus*

> **Roman Battle Formations (Ars Bellica)** — Testudo on the march, Cuneus in the charge, Orbis when surrounded. The legion doesn't change — the strategy swaps at runtime based on battlefield conditions.

**When to use:** multiple algorithms for one problem · runtime payment method switching · authentication strategies (OAuth, JWT, Basic Auth)

| File | Run |
|------|-----|
| [`cpp/ars_bellica.cpp`](patterns/08_strategy/cpp/ars_bellica.cpp) | `make strategy-cpp` |
| [`python/ars_bellica.py`](patterns/08_strategy/python/ars_bellica.py) | `make strategy-py` |
| [`php/ars_bellica.php`](patterns/08_strategy/php/ars_bellica.php) | `make strategy-php` |
| [`java/ArsBellica.java`](patterns/08_strategy/java/ArsBellica.java) | `make strategy-java` |
| [`typescript/ars_bellica.ts`](patterns/08_strategy/typescript/ars_bellica.ts) | `make strategy-ts` |
| [`javascript/ars_bellica.js`](patterns/08_strategy/javascript/ars_bellica.js) | `make strategy-js` |
| [`csharp/ArsBellica.cs`](patterns/08_strategy/csharp/ArsBellica.cs) | `make strategy-cs` |

---

## 📚 09 Repository — *Ubi data est? Tabularius scit*

> **The Imperial Archive (Tabularium)** — Rome's state archive on the Capitoline Hill. The Tabularius knows where every tablet is filed. The Senate never digs through tablets themselves — they ask the Tabularius.

**When to use:** abstracting the database from business logic · in-memory testing · Domain-Driven Design (DDD)

| File | Run |
|------|-----|
| [`cpp/tabularium.cpp`](patterns/09_repository/cpp/tabularium.cpp) | `make repository-cpp` |
| [`python/tabularium.py`](patterns/09_repository/python/tabularium.py) | `make repository-py` |
| [`php/tabularium.php`](patterns/09_repository/php/tabularium.php) | `make repository-php` |
| [`java/Tabularium.java`](patterns/09_repository/java/Tabularium.java) | `make repository-java` |
| [`typescript/tabularium.ts`](patterns/09_repository/typescript/tabularium.ts) | `make repository-ts` |
| [`javascript/tabularium.js`](patterns/09_repository/javascript/tabularium.js) | `make repository-js` |
| [`csharp/Tabularium.cs`](patterns/09_repository/csharp/Tabularium.cs) | `make repository-cs` |

---

## 🛡 10 Proxy — *Legatus vocem imperatoris habet*

> **The Imperial Legatus** — Emperor Hadrian can't answer every provincial request. His legates speak with imperial authority — but add access control (only authorised provinces pass), caching (no need to wake the emperor twice), and logging.

**When to use:** lazy initialisation of expensive objects · protection proxies · request caching

| File | Run |
|------|-----|
| [`cpp/legatus.cpp`](patterns/10_proxy/cpp/legatus.cpp) | `make proxy-cpp` |
| [`python/legatus.py`](patterns/10_proxy/python/legatus.py) | `make proxy-py` |
| [`php/legatus.php`](patterns/10_proxy/php/legatus.php) | `make proxy-php` |
| [`java/Legatus.java`](patterns/10_proxy/java/Legatus.java) | `make proxy-java` |
| [`typescript/legatus.ts`](patterns/10_proxy/typescript/legatus.ts) | `make proxy-ts` |
| [`javascript/legatus.js`](patterns/10_proxy/javascript/legatus.js) | `make proxy-js` |
| [`csharp/Legatus.cs`](patterns/10_proxy/csharp/Legatus.cs) | `make proxy-cs` |

---

## 🏰 11 MVC / MVCS — *Divide et impera*

> **The Roman Republic (Res Publica)** — *Lex* (Model) is the written law. *Contio* (View) announces it publicly. *Senate* (Controller) debates and decides. *Quaestores* (Service) handle the treasury. Separation of powers — the original software architecture principle, 500 BCE.

**When to use:** every web application ever (Rails, Django, Laravel, ASP.NET MVC — all of them)

| File | Run |
|------|-----|
| [`cpp/res_publica.cpp`](patterns/11_mvc_mvcs/cpp/res_publica.cpp) | `make mvc-cpp` |
| [`python/res_publica.py`](patterns/11_mvc_mvcs/python/res_publica.py) | `make mvc-py` |
| [`php/res_publica.php`](patterns/11_mvc_mvcs/php/res_publica.php) | `make mvc-php` |
| [`java/ResPublica.java`](patterns/11_mvc_mvcs/java/ResPublica.java) | `make mvc-java` |
| [`typescript/res_publica.ts`](patterns/11_mvc_mvcs/typescript/res_publica.ts) | `make mvc-ts` |
| [`javascript/res_publica.js`](patterns/11_mvc_mvcs/javascript/res_publica.js) | `make mvc-js` |
| [`csharp/ResPublica.cs`](patterns/11_mvc_mvcs/csharp/ResPublica.cs) | `make mvc-cs` |

---

## ⚖ 12 CQRS — *Qui legit non scribit; qui scribit non legit*

> **The Two Consuls (Consules)** — One consul commands (writes). The other reads. They never swap roles. Each is optimised for their duty — the write side captures every event, the read side serves fast queries from a projection.

**When to use:** high-traffic systems with asymmetric read/write load · event sourcing · microservices

| File | Run |
|------|-----|
| [`cpp/consules.cpp`](patterns/12_cqrs/cpp/consules.cpp) | `make cqrs-cpp` |
| [`python/consules.py`](patterns/12_cqrs/python/consules.py) | `make cqrs-py` |
| [`php/consules.php`](patterns/12_cqrs/php/consules.php) | `make cqrs-php` |
| [`java/Consules.java`](patterns/12_cqrs/java/Consules.java) | `make cqrs-java` |
| [`typescript/consules.ts`](patterns/12_cqrs/typescript/consules.ts) | `make cqrs-ts` |
| [`javascript/consules.js`](patterns/12_cqrs/javascript/consules.js) | `make cqrs-js` |
| [`csharp/Consules.cs`](patterns/12_cqrs/csharp/Consules.cs) | `make cqrs-cs` |

---

## 📖 Further Reading

- 📗 *Design Patterns: Elements of Reusable Object-Oriented Software* — Gang of Four (1994)
- 📘 *Patterns of Enterprise Application Architecture* — Martin Fowler (2002)
- 📙 *Domain-Driven Design* — Eric Evans (2003)
- 📕 *Clean Architecture* — Robert C. Martin (2017)

---

## 🪙 License

MIT — *"Liber et gratis, sicut aqua Romana"* — Free and open, like Roman aqueduct water.

---

*SPQR — Senatus Populusque Romanus Programmandi* 🦅

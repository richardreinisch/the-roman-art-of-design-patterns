# 📜 07 — Command Pattern
### *Mandatum datum, mandatum executum — Order given, order executed*

> **Category:** Behavioral Pattern

---

## The Roman Analogy

**The Mandata Imperatoris** — Imperial orders, sealed in wax and carried by *tabellarii* (imperial couriers).

Emperor Vespasian dictates: *"Build the Colosseum on the site of Nero's lake."* The order is written, sealed, and handed to the Master of Works. It is logged in the imperial records. It can be deferred, executed later, or — if the Emperor changes his mind — **rescinded**.

When Domitian later orders the Colosseum demolished to build a new palace, his *cancellation order* looks exactly like the original *construction order*. The system stores every command. Any command can be undone. Any undone command can be redone. The palace keeps the full history.

> *"Mandatum datum, mandatum executum!"* — Order given, order executed!

---

## Intent

Encapsulate a request as an **object**, thereby letting you parameterise clients with different requests, queue or log requests, and support **undoable operations**.

---

## Structure

```
ImperialCommand  (interface)
├── + execute(): string
└── + undo(): string

BuildCmd  ──implements──▶ ImperialCommand
├── - architect: RomeArchitect
├── - building:  string
├── + execute() → architect.build(building)
└── + undo()    → architect.demolish(building)

ImperialPalace  (Invoker — stores and replays commands)
├── - history: Stack<ImperialCommand>
├── - undone:  Stack<ImperialCommand>
├── + issue(command)
├── + undoLast()
└── + redoLast()

RomeArchitect  (Receiver — does the actual work)
├── + build(name): string
└── + demolish(name): string
```

---

## When to Use

- ✅ Undo / Redo functionality (text editors, drawing apps, IDEs)
- ✅ Task queues and job schedulers
- ✅ Transactional operations with rollback
- ✅ Macro recording and playback
- ✅ Deferred execution — queue commands for later

---

## Pros & Cons

| Virtutes ✓ | Vitia ✗ |
|-----------|---------|
| Single Responsibility — separate invocation from execution | Many small command classes |
| Undo/Redo is straightforward with a history stack | State snapshot for undo can be expensive |
| Open/Closed — add commands without changing the invoker | Overkill for simple, non-reversible actions |
| Commands are composable (macro = list of commands) | |

---

## Run the Examples

```bash
# From the repository root:
make command-cpp
make command-py
make command-php
make command-java
make command-ts
make command-js
make command-cs

# Or directly:
cd cpp        && make
cd python     && python3 mandatum.py
cd php        && php mandatum.php
cd java       && java Mandatum.java
cd typescript && tsc --module commonjs --target ES2022 mandatum.ts && node mandatum.js
cd javascript && node mandatum.js
cd csharp     && dotnet script Mandatum.cs
```

---

## Key Implementation Notes

### Undo Stack
The `ImperialPalace` (invoker) maintains two stacks: `history` (executed commands) and `undone` (undone commands). `undoLast()` pops from history, calls `undo()`, pushes to undone. `redoLast()` reverses this. Issuing a new command clears the undo stack — just like a text editor.

### Command as Object
The key insight: a command is not a method call — it is an **object**. It can be stored, serialised, transmitted over a network, logged, and replayed. This is what separates the Command pattern from a simple function call.

### Language Highlights
| Language | Notable feature used |
|----------|---------------------|
| C++ | `std::stack`, `std::deque`, virtual `execute()`/`undo()` |
| Python | `collections.deque` as stack, `ABC` for the interface |
| PHP | `SplStack` or `array_pop`/`array_push` |
| Java | `Deque<ImperialCommand>` as stack, sealed interface |
| TypeScript | Generic `ImperialCommand[]` stacks, optional chaining |
| JavaScript | Array-as-stack (`push`/`pop`), no type checking needed |
| C# | `Stack<IImperialCommand>`, `Stack.Clear()` on new command |

---

## Related Patterns

- **Memento** — stores state snapshots for more complex undo (Command stores the *action*, Memento stores the *state*)
- **Observer** — commands are often fired as a result of observed events
- **Strategy** — similar structure; Command focuses on reversibility and queueing, Strategy on interchangeable algorithms

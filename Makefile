# ============================================================
#  THE ROMAN ART OF DESIGN PATTERNS — Root Makefile
#  "Omnes vias ad codicem bonum ducunt"
#
#  Usage:
#    make all            — all languages, all patterns
#    make cpp            — all C++ patterns
#    make python         — all Python patterns
#    make php            — all PHP patterns
#    make java           — all Java patterns
#    make typescript     — all TypeScript patterns
#    make javascript     — all JavaScript patterns
#    make csharp         — all C# patterns
#
#    make singleton-cpp  make singleton-py   make singleton-php
#    make singleton-java make singleton-ts   make singleton-js
#    make singleton-cs
#    ... (same for every pattern, see 'make help')
# ============================================================

PATTERN_DIRS = \
	patterns/01_singleton \
	patterns/02_factory \
	patterns/03_observer \
	patterns/04_decorator \
	patterns/05_adapter \
	patterns/06_dependency_injection \
	patterns/07_command \
	patterns/08_strategy \
	patterns/09_repository \
	patterns/10_proxy \
	patterns/11_mvc_mvcs \
	patterns/12_cqrs

.PHONY: all cpp python php java typescript javascript csharp help clean \
	singleton-cpp singleton-py singleton-php singleton-java singleton-ts singleton-js singleton-cs \
	factory-cpp   factory-py   factory-php   factory-java   factory-ts   factory-js   factory-cs \
	observer-cpp  observer-py  observer-php  observer-java  observer-ts  observer-js  observer-cs \
	decorator-cpp decorator-py decorator-php decorator-java decorator-ts decorator-js decorator-cs \
	adapter-cpp   adapter-py   adapter-php   adapter-java   adapter-ts   adapter-js   adapter-cs \
	injection-cpp injection-py injection-php injection-java injection-ts injection-js injection-cs \
	command-cpp   command-py   command-php   command-java   command-ts   command-js   command-cs \
	strategy-cpp  strategy-py  strategy-php  strategy-java  strategy-ts  strategy-js  strategy-cs \
	repository-cpp repository-py repository-php repository-java repository-ts repository-js repository-cs \
	proxy-cpp     proxy-py     proxy-php     proxy-java     proxy-ts     proxy-js     proxy-cs \
	mvc-cpp       mvc-py       mvc-php       mvc-java       mvc-ts       mvc-js       mvc-cs \
	cqrs-cpp      cqrs-py      cqrs-php      cqrs-java      cqrs-ts      cqrs-js      cqrs-cs

# ─── DEFAULT ─────────────────────────────────────────────────────────────────
help:
	@printf "\n  \033[33m🏛  THE ROMAN ART OF DESIGN PATTERNS\033[0m\n"
	@printf "  ══════════════════════════════════════════\n\n"
	@printf "  \033[1mRun all patterns in one language:\033[0m\n"
	@printf "    make all          — all 7 languages, all 12 patterns\n"
	@printf "    make cpp          — C++ (g++ -std=c++17)\n"
	@printf "    make python       — Python 3\n"
	@printf "    make php          — PHP 8\n"
	@printf "    make java         — Java 21 (single-file launch)\n"
	@printf "    make typescript   — TypeScript (tsc + node)\n"
	@printf "    make javascript   — JavaScript (node)\n"
	@printf "    make csharp       — C# (dotnet-script)\n"
	@printf "\n  \033[1mRun one pattern in one language:\033[0m\n"
	@printf "    make <pattern>-<lang>\n\n"
	@printf "  Patterns : singleton  factory   observer  decorator  adapter\n"
	@printf "             injection  command   strategy  repository proxy\n"
	@printf "             mvc        cqrs\n\n"
	@printf "  Langs    : cpp  py  php  java  ts  js  cs\n\n"
	@printf "  Examples :\n"
	@printf "    make singleton-java    make observer-ts     make cqrs-cs\n"
	@printf "    make factory-js        make strategy-cpp    make mvc-py\n\n"
	@printf "  \033[1mClean compiled binaries:\033[0m\n"
	@printf "    make clean\n\n"

# ─── RUN ALL ─────────────────────────────────────────────────────────────────
all: cpp python php java typescript javascript csharp

cpp:
	@printf "\n\033[34m⚔  ══ C++ (g++ -std=c++17) ══════════════════════════════\033[0m\n"
	@for dir in $(PATTERN_DIRS); do \
		$(MAKE) -C $$dir/cpp --no-print-directory 2>/dev/null || true; \
	done

python:
	@printf "\n\033[33m🐍 ══ Python 3 ═══════════════════════════════════════════\033[0m\n"
	@for dir in $(PATTERN_DIRS); do \
		printf "\n--- $$(basename $$dir) ---\n"; \
		python3 $$dir/python/*.py 2>/dev/null || true; \
	done

php:
	@printf "\n\033[35m🐘 ══ PHP 8 ═══════════════════════════════════════════════\033[0m\n"
	@for dir in $(PATTERN_DIRS); do \
		printf "\n--- $$(basename $$dir) ---\n"; \
		php $$dir/php/*.php 2>/dev/null || true; \
	done

java:
	@printf "\n\033[33m☕ ══ Java 21 (single-file launch) ════════════════════════\033[0m\n"
	@for dir in $(PATTERN_DIRS); do \
		printf "\n--- $$(basename $$dir) ---\n"; \
		java $$dir/java/*.java 2>/dev/null || true; \
	done

typescript:
	@printf "\n\033[34m🔷 ══ TypeScript (tsc + node) ════════════════════════════\033[0m\n"
	@for dir in $(PATTERN_DIRS); do \
		printf "\n--- $$(basename $$dir) ---\n"; \
		f=$$(ls $$dir/typescript/*.ts 2>/dev/null | head -1); \
		[ -z "$$f" ] && continue; \
		js="$${f%.ts}.js"; \
		tsc --module commonjs --target ES2022 "$$f" 2>/dev/null && node "$$js" && rm -f "$$js" || true; \
	done

javascript:
	@printf "\n\033[33m🟨 ══ JavaScript (Node) ══════════════════════════════════\033[0m\n"
	@for dir in $(PATTERN_DIRS); do \
		printf "\n--- $$(basename $$dir) ---\n"; \
		node $$dir/javascript/*.js 2>/dev/null || true; \
	done

csharp:
	@printf "\n\033[35m💜 ══ C# (dotnet-script) ═════════════════════════════════\033[0m\n"
	@for dir in $(PATTERN_DIRS); do \
		printf "\n--- $$(basename $$dir) ---\n"; \
		dotnet script $$dir/csharp/*.cs 2>/dev/null || true; \
	done

# ─── INDIVIDUAL: SINGLETON ───────────────────────────────────────────────────
singleton-cpp:  ; @$(MAKE) -C patterns/01_singleton/cpp --no-print-directory
singleton-py:   ; @python3 patterns/01_singleton/python/aerarium.py
singleton-php:  ; @php patterns/01_singleton/php/aerarium.php
singleton-java: ; @java patterns/01_singleton/java/AerariumSaturni.java
singleton-ts:   ; @tsc --module commonjs --target ES2022 patterns/01_singleton/typescript/aerarium.ts 2>/dev/null && node patterns/01_singleton/typescript/aerarium.js; rm -f patterns/01_singleton/typescript/aerarium.js
singleton-js:   ; @node patterns/01_singleton/javascript/aerarium.js
singleton-cs:   ; @dotnet script patterns/01_singleton/csharp/Aerarium.cs

# ─── INDIVIDUAL: FACTORY ─────────────────────────────────────────────────────
factory-cpp:    ; @$(MAKE) -C patterns/02_factory/cpp --no-print-directory
factory-py:     ; @python3 patterns/02_factory/python/fabrica.py
factory-php:    ; @php patterns/02_factory/php/fabrica.php
factory-java:   ; @java patterns/02_factory/java/Fabrica.java
factory-ts:     ; @tsc --module commonjs --target ES2022 patterns/02_factory/typescript/fabrica.ts 2>/dev/null && node patterns/02_factory/typescript/fabrica.js; rm -f patterns/02_factory/typescript/fabrica.js
factory-js:     ; @node patterns/02_factory/javascript/fabrica.js
factory-cs:     ; @dotnet script patterns/02_factory/csharp/Fabrica.cs

# ─── INDIVIDUAL: OBSERVER ────────────────────────────────────────────────────
observer-cpp:   ; @$(MAKE) -C patterns/03_observer/cpp --no-print-directory
observer-py:    ; @python3 patterns/03_observer/python/speculae.py
observer-php:   ; @php patterns/03_observer/php/speculae.php
observer-java:  ; @java patterns/03_observer/java/Speculae.java
observer-ts:    ; @tsc --module commonjs --target ES2022 patterns/03_observer/typescript/speculae.ts 2>/dev/null && node patterns/03_observer/typescript/speculae.js; rm -f patterns/03_observer/typescript/speculae.js
observer-js:    ; @node patterns/03_observer/javascript/speculae.js
observer-cs:    ; @dotnet script patterns/03_observer/csharp/Speculae.cs

# ─── INDIVIDUAL: DECORATOR ───────────────────────────────────────────────────
decorator-cpp:  ; @$(MAKE) -C patterns/04_decorator/cpp --no-print-directory
decorator-py:   ; @python3 patterns/04_decorator/python/triumphator.py
decorator-php:  ; @php patterns/04_decorator/php/triumphator.php
decorator-java: ; @java patterns/04_decorator/java/Triumphator.java
decorator-ts:   ; @tsc --module commonjs --target ES2022 patterns/04_decorator/typescript/triumphator.ts 2>/dev/null && node patterns/04_decorator/typescript/triumphator.js; rm -f patterns/04_decorator/typescript/triumphator.js
decorator-js:   ; @node patterns/04_decorator/javascript/triumphator.js
decorator-cs:   ; @dotnet script patterns/04_decorator/csharp/Triumphator.cs

# ─── INDIVIDUAL: ADAPTER ─────────────────────────────────────────────────────
adapter-cpp:    ; @$(MAKE) -C patterns/05_adapter/cpp --no-print-directory
adapter-py:     ; @python3 patterns/05_adapter/python/interpres.py
adapter-php:    ; @php patterns/05_adapter/php/interpres.php
adapter-java:   ; @java patterns/05_adapter/java/Interpres.java
adapter-ts:     ; @tsc --module commonjs --target ES2022 patterns/05_adapter/typescript/interpres.ts 2>/dev/null && node patterns/05_adapter/typescript/interpres.js; rm -f patterns/05_adapter/typescript/interpres.js
adapter-js:     ; @node patterns/05_adapter/javascript/interpres.js
adapter-cs:     ; @dotnet script patterns/05_adapter/csharp/Interpres.cs

# ─── INDIVIDUAL: DEPENDENCY INJECTION ────────────────────────────────────────
injection-cpp:  ; @$(MAKE) -C patterns/06_dependency_injection/cpp --no-print-directory
injection-py:   ; @python3 patterns/06_dependency_injection/python/officium.py
injection-php:  ; @php patterns/06_dependency_injection/php/officium.php
injection-java: ; @java patterns/06_dependency_injection/java/Officium.java
injection-ts:   ; @tsc --module commonjs --target ES2022 patterns/06_dependency_injection/typescript/officium.ts 2>/dev/null && node patterns/06_dependency_injection/typescript/officium.js; rm -f patterns/06_dependency_injection/typescript/officium.js
injection-js:   ; @node patterns/06_dependency_injection/javascript/officium.js
injection-cs:   ; @dotnet script patterns/06_dependency_injection/csharp/Officium.cs

# ─── INDIVIDUAL: COMMAND ─────────────────────────────────────────────────────
command-cpp:    ; @$(MAKE) -C patterns/07_command/cpp --no-print-directory
command-py:     ; @python3 patterns/07_command/python/mandatum.py
command-php:    ; @php patterns/07_command/php/mandatum.php
command-java:   ; @java patterns/07_command/java/Mandatum.java
command-ts:     ; @tsc --module commonjs --target ES2022 patterns/07_command/typescript/mandatum.ts 2>/dev/null && node patterns/07_command/typescript/mandatum.js; rm -f patterns/07_command/typescript/mandatum.js
command-js:     ; @node patterns/07_command/javascript/mandatum.js
command-cs:     ; @dotnet script patterns/07_command/csharp/Mandatum.cs

# ─── INDIVIDUAL: STRATEGY ────────────────────────────────────────────────────
strategy-cpp:   ; @$(MAKE) -C patterns/08_strategy/cpp --no-print-directory
strategy-py:    ; @python3 patterns/08_strategy/python/ars_bellica.py
strategy-php:   ; @php patterns/08_strategy/php/ars_bellica.php
strategy-java:  ; @java patterns/08_strategy/java/ArsBellica.java
strategy-ts:    ; @tsc --module commonjs --target ES2022 patterns/08_strategy/typescript/ars_bellica.ts 2>/dev/null && node patterns/08_strategy/typescript/ars_bellica.js; rm -f patterns/08_strategy/typescript/ars_bellica.js
strategy-js:    ; @node patterns/08_strategy/javascript/ars_bellica.js
strategy-cs:    ; @dotnet script patterns/08_strategy/csharp/ArsBellica.cs

# ─── INDIVIDUAL: REPOSITORY ──────────────────────────────────────────────────
repository-cpp:  ; @$(MAKE) -C patterns/09_repository/cpp --no-print-directory
repository-py:   ; @python3 patterns/09_repository/python/tabularium.py
repository-php:  ; @php patterns/09_repository/php/tabularium.php
repository-java: ; @java patterns/09_repository/java/Tabularium.java
repository-ts:   ; @tsc --module commonjs --target ES2022 patterns/09_repository/typescript/tabularium.ts 2>/dev/null && node patterns/09_repository/typescript/tabularium.js; rm -f patterns/09_repository/typescript/tabularium.js
repository-js:   ; @node patterns/09_repository/javascript/tabularium.js
repository-cs:   ; @dotnet script patterns/09_repository/csharp/Tabularium.cs

# ─── INDIVIDUAL: PROXY ───────────────────────────────────────────────────────
proxy-cpp:      ; @$(MAKE) -C patterns/10_proxy/cpp --no-print-directory
proxy-py:       ; @python3 patterns/10_proxy/python/legatus.py
proxy-php:      ; @php patterns/10_proxy/php/legatus.php
proxy-java:     ; @java patterns/10_proxy/java/Legatus.java
proxy-ts:       ; @tsc --module commonjs --target ES2022 patterns/10_proxy/typescript/legatus.ts 2>/dev/null && node patterns/10_proxy/typescript/legatus.js; rm -f patterns/10_proxy/typescript/legatus.js
proxy-js:       ; @node patterns/10_proxy/javascript/legatus.js
proxy-cs:       ; @dotnet script patterns/10_proxy/csharp/Legatus.cs

# ─── INDIVIDUAL: MVC ─────────────────────────────────────────────────────────
mvc-cpp:        ; @$(MAKE) -C patterns/11_mvc_mvcs/cpp --no-print-directory
mvc-py:         ; @python3 patterns/11_mvc_mvcs/python/res_publica.py
mvc-php:        ; @php patterns/11_mvc_mvcs/php/res_publica.php
mvc-java:       ; @java patterns/11_mvc_mvcs/java/ResPublica.java
mvc-ts:         ; @tsc --module commonjs --target ES2022 patterns/11_mvc_mvcs/typescript/res_publica.ts 2>/dev/null && node patterns/11_mvc_mvcs/typescript/res_publica.js; rm -f patterns/11_mvc_mvcs/typescript/res_publica.js
mvc-js:         ; @node patterns/11_mvc_mvcs/javascript/res_publica.js
mvc-cs:         ; @dotnet script patterns/11_mvc_mvcs/csharp/ResPublica.cs

# ─── INDIVIDUAL: CQRS ────────────────────────────────────────────────────────
cqrs-cpp:       ; @$(MAKE) -C patterns/12_cqrs/cpp --no-print-directory
cqrs-py:        ; @python3 patterns/12_cqrs/python/consules.py
cqrs-php:       ; @php patterns/12_cqrs/php/consules.php
cqrs-java:      ; @java patterns/12_cqrs/java/Consules.java
cqrs-ts:        ; @tsc --module commonjs --target ES2022 patterns/12_cqrs/typescript/consules.ts 2>/dev/null && node patterns/12_cqrs/typescript/consules.js; rm -f patterns/12_cqrs/typescript/consules.js
cqrs-js:        ; @node patterns/12_cqrs/javascript/consules.js
cqrs-cs:        ; @dotnet script patterns/12_cqrs/csharp/Consules.cs

# ─── CLEAN ───────────────────────────────────────────────────────────────────
clean:
	@find patterns/*/cpp -type f ! -name "*.cpp" ! -name "Makefile" -delete 2>/dev/null || true
	@find patterns -name "*.o" -o -name "*.out" | xargs rm -f 2>/dev/null || true
	@find patterns/*/typescript -name "*.js" -delete 2>/dev/null || true
	@printf "🧹 Cleaned compiled binaries\n"

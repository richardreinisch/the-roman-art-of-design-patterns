CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -pthread
TARGET   = aerarium

.PHONY: all run clean

all: $(TARGET)
	@echo "── Running Singleton (C++) ──────────────────────────────"
	@./$(TARGET)

$(TARGET): aerarium.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<

run: all

clean:
	@rm -f $(TARGET)

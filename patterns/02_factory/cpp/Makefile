CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = fabrica

.PHONY: all run clean
all: $(TARGET)
	@echo "── Running Factory Method (C++) ─────────────────────────"
	@./$(TARGET)
$(TARGET): fabrica.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

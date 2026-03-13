CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = tabularium

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 09_repository (C++)"
	@./$(TARGET)
$(TARGET): tabularium.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

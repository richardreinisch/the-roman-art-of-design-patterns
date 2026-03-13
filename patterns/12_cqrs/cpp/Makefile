CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = consules

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 12_cqrs (C++)"
	@./$(TARGET)
$(TARGET): consules.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

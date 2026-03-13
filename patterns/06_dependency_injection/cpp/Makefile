CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = officium

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 06_dependency_injection (C++)"
	@./$(TARGET)
$(TARGET): officium.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

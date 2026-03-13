CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = ars_bellica

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 08_strategy (C++)"
	@./$(TARGET)
$(TARGET): ars_bellica.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

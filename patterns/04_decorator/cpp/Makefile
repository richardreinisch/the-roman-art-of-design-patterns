CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = triumphator

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 04_decorator (C++)"
	@./$(TARGET)
$(TARGET): triumphator.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

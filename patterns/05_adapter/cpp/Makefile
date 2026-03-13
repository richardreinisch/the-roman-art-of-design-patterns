CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = interpres

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 05_adapter (C++)"
	@./$(TARGET)
$(TARGET): interpres.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

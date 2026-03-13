CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = mandatum

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 07_command (C++)"
	@./$(TARGET)
$(TARGET): mandatum.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

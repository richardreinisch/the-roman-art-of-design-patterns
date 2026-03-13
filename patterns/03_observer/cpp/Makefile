CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = speculae

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 03_observer (C++)"
	@./$(TARGET)
$(TARGET): speculae.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

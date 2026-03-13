CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = legatus

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 10_proxy (C++)"
	@./$(TARGET)
$(TARGET): legatus.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

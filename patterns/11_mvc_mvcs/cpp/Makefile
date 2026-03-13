CXX      = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET   = res_publica

.PHONY: all run clean
all: $(TARGET)
	@echo "Running 11_mvc_mvcs (C++)"
	@./$(TARGET)
$(TARGET): res_publica.cpp
	@$(CXX) $(CXXFLAGS) -o $@ $<
run: all
clean:
	@rm -f $(TARGET)

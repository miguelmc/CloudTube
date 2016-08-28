#!/bin/bash

c++  -I./ezpwd-reed-solomon/c++ -std=c++11 -Wall -Wextra -pedantic -Wno-missing-braces -Wwrite-strings -Wpointer-arith -Wnon-virtual-dtor -Woverloaded-virtual -Wsign-promo -Wswitch -Wreturn-type -O3 -c -o osea.o osea.cpp

c++  -I./c++ -std=c++11 -Wall -Wextra -pedantic -Wno-missing-braces -Wwrite-strings -Wpointer-arith -Wnon-virtual-dtor -Woverloaded-virtual -Wsign-promo -Wswitch -Wreturn-type -O3   -o osea osea.o

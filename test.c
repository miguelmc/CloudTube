#include "./longhair/include/cauchy_256.h"
#include "stdlib.h"

int main() {
  if (cauchy_init()) {
    // Wrong static library
    exit(1);
  }

  return 0;
}

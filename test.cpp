#include "./longhair/include/cauchy_256.h"

#include <sys/stat.h>

#include <iostream>
#include <cstring>
#include <cstdlib>
#include <fstream>
#include <cassert>

using namespace std;

char* encode(char* raw_binary, int data_len) {
  int k = 91; // Choose a number of pieces to split the data into.
  int m = 12; // Choose a number of redundant pieces to generate.
  int bytes = 1000; // Chose a number of bytes per chunk, a multiple of 8 bytes.

  assert(bytes % 8 == 0);
  assert(data_len == k * bytes);

  char *recovery_blocks = new char[m * bytes];
  char *data_ptrs[k];

  for (int i=0; i<k; i++) {
    data_ptrs[i] = raw_binary + bytes * i;
  }


  // Encode the data using this library
  if (cauchy_256_encode(k, m, (const unsigned char**)data_ptrs, recovery_blocks, bytes)) {

    // Input was invalid
    cerr << "Input was invalid" << endl;
    return 0;
  }


  ofstream out("rec_blocks", ios::out|ios::binary);

  // For each recovery block,
  for (int ii = 0; ii < m; ++ii) {
    char *block = recovery_blocks + ii * bytes;
    char row = k + ii; // Transmit this with block (just one byte)

    // Transmit or store block bytes and row
    
    out.write(block, bytes);
    out.write(&row, sizeof(char));
  }

  delete []recovery_blocks;
  out.close();

  return 0;
}


void decode(char* data, int data_len) {
  int k = 91;
  int m = 12;
  int bytes = 1000;

  // Allocate block info array
  // There should be exactly k blocks
  Block *block_info = new Block[k];

  // Fill block_info here with data and rows from the encoder
  // Rows under k are original data, and the rest are redundant data

  // Attempt decoding
  if (cauchy_256_decode(k, m, block_info, bytes)) {
    // Decoding should never fail - indicates input is invalid
    assert(k + m <= 256);
    assert(block_info != 0);
    assert(bytes % 8 == 0);
    return false;
  }

  // Now the block_info elements that used to have redundant data are
  // corrected in-place and contain the original data.
}


int main() {
  if (cauchy_256_init()) {
    // Wrong static library
    exit(1);
  }

  int size;
  char* memblock;

  ifstream file("./data/lorem_ipsum", ios::in|ios::binary);
  ofstream out("file_for_youtube", ios::out|ios::binary);


  if (file.is_open()) {

    size = file.tellg();

    struct stat results;

    if (stat("./data/lorem_ipsum", &results) == 0) {
      size = results.st_size;
    } else {
      cerr << "Failed to open file" << endl;
      exit(1);
    }

    memblock = new char[size];

    if (file.read(memblock, size)) {
      cout << size << endl;

      encode(memblock, size);

      out.write(memblock, size);

    } else {
      cerr << "Failed to read file" << endl;
      exit(1);
    }

    file.close();

  
    //delete[] memblock;
  } else {
    exit(1);
  }


  return 0;
}

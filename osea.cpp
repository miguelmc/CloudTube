#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <string>
#include <sys/time.h>
#include <array>
#include <vector>

#include <fstream>

#include <ezpwd/rs>
#include <ezpwd/corrector>
#include <ezpwd/definitions>


using namespace std;

int main() {
   
  string line, lorem = "";
  ifstream file("./data/lorem_ipsum", ios::in);

  if (file.is_open()) {
    while ( getline (file,line) ) {
      lorem += line;
    }
    file.close();
     cout << lorem.size() << endl;
  }
  string loremm = "AAAAAAAAAAAA";

  const int P = 1024;
  const int N = 20;

  ezpwd::corrector<N>::encode( lorem, 10)

}

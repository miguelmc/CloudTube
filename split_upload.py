#!/usr/bin/env python
import sys
import os
import subprocess

# INPUT:
# Takes in the name of a file to read (filein), a resolution
# (res), and the name of a file to write to (fileout). 

# OUTPUT:
# Doesn't return a value, but writes the encoded filein to
# fileout.

def main(argv):
        filein = str(sys.argv[1])
        filename = str(sys.argv[1])
        i = 1

        with open(filein, "rb") as f:
            while True:
                fullname = os.path.basename(filename) + str(i)
                byte = f.read(65536)

                outfile = open(fullname, "wb")

                if byte == "":
                    break
                if len(byte) % 2 == 1:
                    byte += '0'

                outfile.write(byte)
                outfile.close()

                subprocess.call("cat " + fullname + " |  ./ezpwd-reed-solomon/rsencode_16 > rs" + str(i) + fullname, shell=True)

                print i
                i += 1


        sys.exit()


if __name__ == '__main__':
        main(sys.argv[1:])

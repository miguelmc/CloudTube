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


                if byte == "":
                    break

                outfile = open(fullname, "wb")
                
                if len(byte) % 2 == 1:
                    byte += '0'

                outfile.write(byte)
                outfile.close()

                # Do rsencode
                subprocess.call("cat " + fullname + " |  ./ezpwd-reed-solomon/rsencode_16 > rs" + fullname, shell=True)
                subprocess.call("rm " + fullname, shell=True)

                rsname = "rs" + fullname

                subprocess.call("cat " + rsname + " | ./lvdo/src/lvdoenc -s 640x480 -q 6 --qmin 1 --qmax 4 | x264 --input-res 640x480 --fps 1 --profile high --level 5.1 --tune stillimage --crf 22 --colormatrix bt709 --me dia --merange 0 -o " + fullname + ".mp4 -", shell=True)
                subprocess.call("rm " + rsname, shell=True)

                i += 1


        sys.exit()


if __name__ == '__main__':
        main(sys.argv[1:])

#!/usr/bin/env python
import sys
import os
import subprocess

# INPUT:
# Takes in an array of youtube linksa (filein)
# and a file name for the final result.

# OUTPUT:
# Doesn't return a value, but writes a the wanted file

def main(argv):
  filein = str(sys.argv[1])
  filename = str(sys.argv[2])

  i = 0
  for video in videos:
    i +=1
    subprocess.call("youtube-dl " + video + " -o chunk" + str(i) + ".mp4", shell=True)

    subprocess.call("ffmpeg -i chunk" + i + ".mp4 -r 1 -f rawvideo temp", shell=True)
    subprocess.call("cat temp | ./lvdo/src/lvdodec -s 640x480 -q 6 --qmin 1 --qmax 4 | cat > chunk" + str(i), shell=True)
    subprocess.call("rm temp", shell=True)
    subprocess.call("rm chunk"+str(i)+".mp4", shell=True)

    subprocess.call("cat chunk" + str(i) + " | ./ezpwd-reed-solomon/rsencode_16 --decode > part" + str(i), shell=True)

  full_file = bytearray()
  for i in range(i):
    f = open("part" + str(i), "rb")
    byte = f.read(65536)
    full_file.extend(byte)
    f.close()


  f = open(filename, "wb")
  f.write(full_file)
  f.close()

  sys.exit()

if __name__ == '__main__':
        main(sys.argv[1:])

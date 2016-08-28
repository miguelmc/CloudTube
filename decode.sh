#!/bin/bash


ffmpeg -i "$1" -r 1 -f rawvideo temp
cat temp | ./lvdo/src/lvdodec -s 640x480 -q 6 --qmin 1 --qmax 4 | cat > tres 
rm temp

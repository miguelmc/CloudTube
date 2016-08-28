#!/bin/bash

# Using descrete cosine transorms

# x264 -> H264 codec (optimial video codec for youtube)
# colormatrix bt709 (youtube's color matrix)

cat $1 | ./lvdo/src/lvdoenc -s 640x480 -q 6 --qmin 1 --qmax 4 | x264 --input-res 640x480 --fps 1 --profile high --level 5.1 --tune stillimage --crf 22 --colormatrix bt709 --me dia --merange 0 -o dos.mp4 -

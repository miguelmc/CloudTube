#!/bin/bash

cat $1 | ./ezpwd-reed-solomon/rsencode_16 --decode > cuatro

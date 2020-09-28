#!/bin/bash

/opt/vc/bin/raspivid -w 640 -h 360 -o - -t 0 -vf -hf -fps 24 -b 6000000 | ffmpeg -re -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /dev/zero -f h264 -i - -vcodec copy -acodec aac -ab 128k -g 50 -strict experimental -f flv rtmp://a.rtmp.youtube.com/live2/7khx-ydfk-cz1s-5uxg &

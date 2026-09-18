# ffmpeg

Basic usage:

```shell

ffmpeg -i input_file.mp4 output_file.mp4

```

Make a GIF file out of video file in the specific time range:

```shell

ffmpeg -i "test.mp4" -r 15 -vf scale=512:-1 -ss 00:10:39 -to 00:10:43 test.gif


```

Quick compression:

```shell

fmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k output.mp4

```

Compress to `1080x608` resolution:

```shell

ffmpeg -i input.mp4 -vf scale=1080:-1 -c:v libx264 -crf 28 output.mp4

```

Get resolution of the file:

```shell

ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 input.mp4

```
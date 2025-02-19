# ffmpeg

Basic usage:

```shell

ffmpeg -i input_file.mp4 output_file.mp4

```

Make a GIF file out of video file in the specific time range:

```shell

ffmpeg -i "test.mp4" -r 15 -vf scale=512:-1 -ss 00:10:39 -to 00:10:43 test.gif


```
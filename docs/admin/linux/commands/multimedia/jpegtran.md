# jpegtran

Rotate image counterclockwise:

```shell

ls *.jpg | xargs -n 1 jpegtran -perfect -rotate 270

```

Rotate image clockwise:

```shell

ls *.jpg | xargs -n 1 jpegtran -perfect -rotate 90

```
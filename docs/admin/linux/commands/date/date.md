# date

## General

- System NTP server should be turned off to be able to change date:

```shell

sudo timedatectl set-ntp false

```

## Examples

```shell

sudo date -s "13 MAR 2020 21:47:00"

```

```shell

sudo date -s "30 MAR 2020 21:47:00"

```

```shell

sudo date -s "23 DEC 2020 22:11:00"

```


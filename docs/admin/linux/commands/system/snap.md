# SNAP

Add snap to 'bin':

```shell

Edit /etc/environment and add /snap/bin in the list then restart your system.

```

Start snapd service:

```shell

service snapd start

```

Disable snap packages:

```shell

sudo systemctl stop snapd.service
sudo systemctl disable snapd.service

```

Reenable snap packages:

```shell

sudo systemctl reenable snapd.service
sudo systemctl start snapd.service

```

Start snapd apparmor service:

```shell

service snapd.apparmor start 

```
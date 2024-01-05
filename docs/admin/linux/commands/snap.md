# SNAP

Add snap to 'bin':

```text

Edit /etc/environment and add /snap/bin in the list then restart your system.

```

Start snapd service:

```text

service snapd start

```

Disable snap packages:

```text

sudo systemctl stop snapd.service
sudo systemctl disable snapd.service

```

Reenable snap packages:

```text

sudo systemctl reenable snapd.service
sudo systemctl start snapd.service

```

Start snapd apparmor service:

```text

service snapd.apparmor start 

```
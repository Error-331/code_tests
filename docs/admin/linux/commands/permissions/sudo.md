# sudo

The root account is disabled by default in Ubuntu, `su` will, uses this instead:

```shell

sudo -i  

```

Add user to `sudo` users group:

```shell

sudo adduser username sudo
sudo sh -c "echo 'username ALL=NOPASSWD: ALL' >> /etc/sudoers"

```
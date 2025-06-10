# Notes

- To make Dolphin work on Linux, run following command:

```shell

sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0

```

Link: https://github.com/electron/electron/issues/42510

- Permanently Permanently elevate privileges:

```shell

echo 'kernel.apparmor_restrict_unprivileged_userns = 0' | sudo tee /etc/sysctl.d/20-apparmor-donotrestrict.conf

sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0

```
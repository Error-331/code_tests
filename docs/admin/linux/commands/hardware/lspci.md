# lspci

How to "identify" the PCI-like devices:

```shell

lspci -nn

```

PCI devices are identified by a pair of hexadecimal numbers. 1014:003E for example.

- the 4 first hexadecimal digits are the Vendor ID (1014 = IBM);
- the 4 last hexadecimal digits are the Device ID (003e = 16/4 Token ring);

How to find "GPU" related devices:

```shell

lspci -k -d ::03xx

```

How to find "Nvidia" related devices:

```shell

lspci | grep -i “nvidia”
lsmod | grep -i “nvidia”

```
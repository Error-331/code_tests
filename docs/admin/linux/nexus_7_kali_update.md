# Nexus 7 kali update

- Open sources list with text editor:

```shell

nano /etc/apt/source.list

```

- Add following lines:

```text

deb http://old.kali.org/kali sana main non-free contrib
# deb-src http://old.kali.org/kali sana main non-free contrib

```

- Comment other lines and save;
- Add key to keyring:

```shell

wget --no-check-certificate -q -O - https://archive.kali.org/archive-key.asc  | apt-key add

```

- Update packages:

```shell

sudo apt-get update

```

- Upgrade packages:

```shell

sudo apt-get upgrade

```

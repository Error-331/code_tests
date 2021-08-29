# Fluxion

## Dependencies

### Cowpatty

#### Installation

```bash

cd ~
wget http://www.wirelessdefence.org/Contents/Files/cowpatty-4.6.tgz
tar zxfv cowpatty-4.6.tgz
cd cowpatty-4.6
make cowpatty
sudo cp cowpatty /usr/bin

```

### mdk4

```bash

git clone https://github.com/aircrack-ng/mdk4
cd mdk4
sudo make
sudo make install1

```

### Other

#### Installation

```bash

sudo apt-get install build-essential autoconf automake libtool pkg-config libnl-3-dev libnl-genl-3-dev libssl-dev ethtool shtool rfkill zlib1g-dev libpcap-dev libsqlite3-dev libpcre3-dev libhwloc-dev libcmocka-dev hostapd wpasupplicant tcpdump screen iw usbutils clang

```
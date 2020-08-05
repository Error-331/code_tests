# Aircrack-ng

Show interfaces, chipsets and drivers:


```bash

airmon-ng

```

Start monitor mode on specific interface (network card):


```bash

sudo airmon-ng start wlx0008caa46de5

```


Start packet capture on specific interface (network card):

```bash

sudo airodump-ng wlx0008caa46de5

```

Test packet injection and quality:

```bash

sudo aireplay-ng --test wlan0mon

```

Crack a WEP or WPA key without user intervention and collaborate with WPA cracking statistics:

```bash

besside-ng

```

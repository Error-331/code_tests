Linux networking
================

ifconfig - check network configuration;
iwconfig - check wireless configuration;

ifconfig eth0 192.168.181.115 - change local IP address;
ifconfig eth0 192.168.181.115 netmask 255.255.0.0 broadcast 192.168.1.255 - change netmask, broadcast address and IP address;

ifconfig output example
-----------------------

```

kali> ifconfig

eth0Linkencap:EthernetHWaddr 00:0c:29:ba:82:0f
inet addr:192.168.181.131  Bcast:192.168.181.255  Mask:255.255.255.0
--snip--
lo Linkencap:Local Loopback
inet addr:127.0.0.1 Mask:255.0.0.0
--snip--
wlan0 Link encap:EthernetHWaddr 00:c0:ca:3f:ee:02

```

eth0 - Ethernet0 (Linux starts counting at 0 rather than 1)
lo - local (loopback) connection
wlan0 - WiFi

Spoof MAC address
-----------------

```

kali >ifconfig eth0 down
kali >ifconfig eth0 hw ether 00:11:22:33:44:55
kali >ifconfig eth0 up

```

Request an IP address from DHCP
-------------------------------

```

kali >dhclient eth0

```

Get nameserver for specific address
-----------------------------------

```

kali >dig hackers-arise.com ns

```

Get mailserver for specific address
-----------------------------------

```

kali >dig hackers-arise.com mx

```

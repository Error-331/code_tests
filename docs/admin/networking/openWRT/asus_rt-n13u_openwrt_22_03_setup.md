# ASUS RT-N13U OpenWRT 22.03 Setup

1. Download necessary files: `openwrt-22.03.7-ramips-rt305x-asus_rt-n13u-squashfs-sysupgrade.bin`;
2. Add dedicated connection on your pc:
  - Set static IP address: `192.168.1.15`;
  - Set mask: `255.255.255.0`;
3. Use this connection;
4. Turn on the router into recovery mode;
5. Connect the router;
6. Execute the following command: `curl -T openwrt-22.03.7-ramips-rt305x-asus_rt-n13u-squashfs-sysupgrade.bin tftp://192.168.1.1`;
7. Access the device using command: `ssh root@192.168.1.1`;
8. Remove WAN interface:
9. Enable STP;
10. Enable DHCP client;
11. Disable DHCP server;



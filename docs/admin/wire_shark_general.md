# WireShark

## Cases

### Monitor WiFi traffic

- Find WiFi device using `iwconfig` (example: `wlx0008caa46de5`);
- Turn off current WiFi connection: `sudo ifconfig wlx0008caa46de5 down`;
- Turn on monitor mode for WiFi connection: `sudo iwconfig wlx0008caa46de5 mode monitor`;
- Turn on current WiFi connection: `sudo ifconfig wlx0008caa46de5 up`;
- Find appropriate channel in WireShark (mon0-mon2);
- Sometimes may need to start airmon-ng: `sudo airmon-ng start wlx0008caa46de5`;
- Sometimes may need to start airodump-ng: `sudo airodump-ng wlx0008caa46de5`;

## Usage

- Monitor HTTP traffic and not DNS:

```bash

host 192.168.0.104 and port 80 and not arp

```

- Monitor HTTP traffic:

```bash

port 80 and not arp (tun0 - vpn)

```

## Capture filters

### Examples

- All traffic associated with host 192.168.1.1: `host 192.168.1.1`;
- All traffic associated with port 8080: `port 8080`;
- All traffic originating from host 192.168.1.1: `src host 192.168.1.1`;
- All traffic destined  to  host 192.168.1.1: `dst host 192.168.1.1`;
- All traffic originating from port 53: `src port 53`;
- All traffic destined to port 21: `dst port 21`;
- All traffic originating from 192.168.1.1 and associated with port 21: `src 192.168.1.1 and tcp port 21`;
- All traffic destined to 192.168.1.1 or destined to host 192.168.1.2: `dst 192.168.1.1 or dst 192.168.1.2`;
- All traffic not associated with port 80: `not port 80`;
- All traffic not originating from host 192.168.1.1: `not src host 192.168.1.1`;
- All traffic not associated with port 21 or port 22: `not port 21 and not port 22`;
- All ipv6 traffic: `Ipv6`;
- All TCP or UDP traffic: `tcp or udp`;
- All traffic to and from Google’s IP address: `host www.google.com`;
- All traffic associated with the specified MAC address: `ether host 07:34:aa:b6:78:89`;

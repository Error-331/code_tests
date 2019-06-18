Capture filters examples
========================

host 192.168.1.1                   - All traffic associated with host 192.168.1.1;
port 8080                          - All traffic associated with port 8080;
src host 192.168.1.1               - All traffic originating from host 192.168.1.1;
dst host 192.168.1.1               - All traffic destined  to  host 192.168.1.1;
src port 53                        - All traffic originating from port 53;
dst port 21                        - All traffic destined to port 21;
src 192.168.1.1 and tcp port 21    - All traffic originating from 192.168.1.1 and associated with port 21;
dst 192.168.1.1 or dst 192.168.1.2 - All traffic destined to 192.168.1.1 or destined to host 192.168.1.2;
not port 80                        - All traffic not associated with port 80;
not src host 192.168.1.1           - All traffic not originating from host 192.168.1.1;
not port 21 and not port 22        - All traffic not associated with port 21 or port 22;
Ipv6                               - All ipv6 traffic;
tcp or udp                         - All TCP or UDP traffic;
host www.google.com                - All traffic to and from Google’s IP address;
ether host 07:34:aa:b6:78:89       - All traffic associated with the specified MAC address;


Frequent usage
==============

host 192.168.0.104 and port 80 and not arp - HTTP traffic and now DNS;
port 80 and not arp (tun0 - vpn) - monitor HTTP traffic;

Cases
=====

Monitor WiFi traffic
--------------------

1.) Find WiFi device using iwconfig (example: wlx0008caa46de5);
2.) Turn off current WiFi connection: sudo ifconfig wlx0008caa46de5 down;
3.) Turn on monitor mode for WiFi connection: sudo iwconfig wlx0008caa46de5 mode monitor;
4.) Turn on current WiFi connection: sudo ifconfig wlx0008caa46de5 up;
5.) Find appropriate channel in WireShark (mon0-mon2);

* sometimes may need to start airmon-ng: sudo airmon-ng start wlx0008caa46de5;
* sometimes may need to start airodump-ng: sudo airodump-ng wlx0008caa46de5;
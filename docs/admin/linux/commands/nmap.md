# nmap

## TCP related flags

- Pn - no host discovery;
- PS - TCP SYN Request;
- PA - TCP ACK Request;
- PU - UDP Request;
- PE - ICMP Echo Request;
- PR - ARP Request;
- sS - TCP SYN Scan;
- sT - TCP Connection Scan;
- sN - TCP NULL Scan;
- sF - TCP FIN Scan;
- sX - TCP Xmas Scan;
- sA - TCP ACK Scan;
- sW - TCP Window Scan;
- sM - TCP MaimMON Scan;

## Speed template

- T5 - Insane;
- T4 - Aggressive;
- T3 - Normal (default);
- T2 - Polite;
- T1 - Sneaky;
- T0 - Paranoid;


## Output options

- oN - output to human readable text file;
- oX - output to machine readable XML file;
- oG - output to `grapable` text file;
- oA - output to `all` file formats;

## Usage

### General

- scan ports (find which of them are open and what services occupies them) using list (internal) of most used ports:

```bash

nmap victim.com

```

- same as above:

```bash

nmap --top-ports 1000 victim.com

```

- same as above but also shows how `nmap` reaches its conclusions:

```bash

nmap --reason victim.com

```

- scan ports and detect service version:

```bash

nmap -sV victim.com

```

- scan ports and save output to log file (`test.log`):

```bash

nmap victim.com -oA test.log

```

- perform scan using `Insane` time template and save output to human readable text file:

```bash

nmap -oN mysacn.txt -T5 10.16.18.0/29

```

- perform scan using `Insane` time template and save output to machine readable xml file:

```bash

nmap -oX myscan.xml -T5 10.16.18.0/29

```

- scan ports 1 to 1024:

```bash

nmap -p1-1024 victim.com

```

- scan all 65,535 ports:

```bash

nmap -p- victim.com

```

- perform fast scan (only 1000 ports):

```bash

nmap -F 10.16.18.7 (fast scan - only 1000 ports)

```

- perform scan on one port:

```bash

nmap -p 80 10.16.18.7 (only one port)

```

- perform scan on multiple ports:

```bash

nmap -p 80,443 10.16.18.7 (multiple ports)

```

- scan multiple systems:

```bash

nmap 10.16.18.6 10.16.18.7 10.16.18.8

nmap 10.16.18.6,7,8

nmap 10.16.18.6-8

nmap 10.16.18.0/29

```

- scan multiple services on one system:

```bash

nmap -p http,https 10.16.18.7

```

- scan list of IPs stored in a file:

```bash

nmap -iL scan_targets.txt

```

scan_targets.txt: 

```text

10.16.18.7
10.16.18.13
10.16.18.14
10.16.18.28

```

- scan using current privilege level (for example, sniffing network traffic with libpcap):

```bash

sudo nmap victim.com

```

- perform only `ping` scan without port scan (just to find out which hosts are online)

```bash

nmap -sn victim.com

```

- perform scan without DNS resolution

```bash

nmap -n 45.33.32.156 (no DNS)

```

- perform scan skipping ping sweep (treat all hosts as online) and no DNS resolution:

```bash

nmap -Pn -n victim.com

```

- list targets for scan (either using ping or scan the target ranges), useful to get reverse DNS lookups, and to understand how many hosts are online in a specified range:

```bash

nmap 194.247.12.172 -sL

```

- perform scan with DNS resolution by using system DNS:

```bash

nmap --system-dns 45.33.32.156 (using current system dns resolution)

```

- perform scan with DNS resolution by using custom DNS server:

```bash

nmap --dns-servers 8.8.8.8 45.33.32.156 (custom dns server)

```

- perform UDP scan (can much time, better to use TCP scan first):

```bash

sudo nmap -sU victim.com

```

- perform TCP SYN (Stealth) scan (default):

```bash

sudo nmap -sS victim.com

```

- perform TCP connect scan:

```bash

sudo nmap -sT victim.com

```

- perform TCP FIN scan:

```bash

sudo nmap -sF victim.com

```

- perform `Xmas Tree` scan:

```bash

sudo nmap -sX victim.com

```

- perform TCP (SYN) and UDP scan: 

```bash

nmap -sU -sS 10.16.18.7 UDP/TCP SYN Scan

```

- perform TCP (SYN) and UDP scan for specific ports: 

```bash

nmap -sS -sU -p T:80,T:443,U:161 10.16.18.7

```

- perform scan and try tp guess OS:

```bash

sudo nmap -O victim.com 

```

- perform scan with traceroute:

```bash

nmap -A scanme.nmap.org (service, OS, Traceroute)

```

- perform scan using different level of verbosity:

```bash

nmap -v victim.com
nmap -vv victim.com
nmap -vvv victim.com

```

- perform packet trace (`-Pn -p80 -n`):

```bash

sudo nmap victim.com --packet-trace

```

- search for ssh service:

```bash

nmap -PS22 10.16.18.0/29

```

- Perform scan using `Insane` time template:

```ssh

nmap -T5 10.16.18.7

```

- Perform scan using `Polite` time template:

```ssh

nmap -T2 10.16.18.7

```

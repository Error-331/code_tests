# nmap

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

- scan ports 1 to 1024:

```bash

nmap -p1-1024 victim.com

```

- scan all 65,535 ports:

```bash

nmap -p- victim.com

```

- scan using current privilege level (for example, sniffing network traffic with libpcap):

```bash

sudo nmap victim.com

```

- perform only `ping` scan without port scan (just to find out which hosts are online)

```bash

nmap -sn victim.com

```

- perform scan skipping ping sweep (treat all hosts as online) and no DNS resolution:

```bash

nmap -Pn -n victim.com

```

- list targets for scan (either using ping or scan the target ranges), useful to get reverse DNS lookups, and to understand how many hosts are online in a specified range:

```bash

nmap 194.247.12.172 -sL

```

- perform UDP scan (can much time, better to use TCP scan first):

```bash

sudo nmap -sU victim.com

```

- perform TCP SYN (Stealth) scan:

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

- perform scan and try tp guess OS:

```bash

sudo nmap -O victim.com 

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

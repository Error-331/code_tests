# Metasploit

## Tasks

### Preparation

```bash

service postgresql start
msfconsole

db_status
exit

msfdb init
msfconsole

db_connect -y

```

### Create workspace

```bash

workspace -a target1

```

### Perform a service scan without pinging hosts, and using verbose output:

```bash

msfconsole
db_nmap -sV -Pn -v 10.0.5.198

```

### Show all discovered HTTP services

```bash

msfconsole
db_nmap -sV -Pn -v 10.0.5.198
services -s http

```
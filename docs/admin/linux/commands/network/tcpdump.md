# tcpdump

In tcpdump, each line also represents one packet, which is formatted differently based on the protocol being used. Since tcpdump doesn’t use
Wireshark’s protocol dissectors, layer 7 protocol information isn’t interpreted by the tool. This is one of tcpdump’s biggest limitations. 
Instead, single-line packets are formatted based on their transport layer protocol, which is either TCP or UDP.

## Installation

```bush

sudo apt-get update
sudo apt-get install tcpdump

```

## Formats

### TCP packet format


```shell

[Timestamp] [Layer 3 Protocol] [Source IP].[Source Port] > 
[Destination IP].[Destination Port]: [TCP Flags], [TCP Sequence Number], [TCP Acknowledgement Number], [TCP Windows Size], [Data Length]

```

### UDP packet format

```shell

[Timestamp] [Layer 3 Protocol] [Source IP].[Source Port] > [Destination IP].
[Destination Port]: [Layer 4 Protocol], [Data Length]

```

## Usage

- Start packet capture:

```shell

tcpdump

```

- Capture on specific interface:

```shell

tcpdump –i eth0


```

- Capture on specific interface and write to file:

```shell

tcpdump –i eth0 –w packets.pcap


```

- Read from file:

```shell

tcpdump –r packets.pcap


```

- Read from file and show only first 10 lines:

```shell

tcpdump –r packets.pcap –c10


```

- Capture first 10 packets and write to file:

```shell

tcpdump –i eth0 –w packets.pcap –c10


```

- Control level of verbosity:

```shell

tcpdump –r packets.pcap –vvv


```

- Read from file and view the hex and ASCII representation by using the –X switch:
  
```shell

tcpdump –Xr packets.pcap


```  
  
- Disable IP name resolution with `–n`, disable port name resolution with `-nn` as well:


```shell

tcpdump –nni eth1


```  

- Save only packets destined to TCP port 80 and apply inline filters:

```shell

tcpdump –nni eth0 –w packets.pcap 'tcp dst port 80'


```  

- Read file and apply inline filters:

```shell

tcpdump –r packets.pcap 'tcp dst port 80'


```

- Read file, apply filters and write result to file:

```shell

tcpdump –r packets.pcap 'tcp dst port 80' –w http_packets.pcap


```

- Filter packets using external file which contains filters:

```shell

tcpdump –nni eth0 –F dns_servers.bpf

```

- Capture packets on any network interface on port 53 (tcp/udp, service DNS)

```shell

tcpdump -n -i any port 53

```

- Capture packets which are coming to port 1337 from IP 1.2.3.4:

```shell

tcpdump -i any port 1337 and host 1.2.3.4

```

- Show all DNS queries that fail (checks for a flag in the 11th byte of the UDP packet):

```shell

tcpdump 'udp[11]&0xf==3'

```

- Capture only first 30000 packets:

```shell

tcpdump host 8.8.8.8 -c 30000

```

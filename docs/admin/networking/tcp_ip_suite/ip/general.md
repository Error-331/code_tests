# IP Addressing Overview and Fundamentals

- Network Interface Identification - unique identification of the interface between a device and the network;
- Routing - when the source and destination of an IP datagram are not on the same network, the datagram must be delivered indirectly using 
intermediate systems;

## Number of IP Addresses Per Device

- any device that has data sent to it at the network layer will have at least one IP address (one per network interface);
- normal hosts such as computers and network-capable printers usually get one IP address;
- routers get more than one IP address;
- special hosts may have more than one IP address (if they are multihomed—connected to more than one network);
- lower-level network interconnection devices (repeaters, bridges, and switches) don’t require an IP address;
- network segments connected by bridges and switches form a single broadcast domain;

## Address Uniqueness and Network Specificity

- each IP address on a single internetwork must be unique (there are exceptions in IPv6, in the form of special anycast addresses);
- the IP address is specific to the network to which it is connected;

## Private and Public IP Network Addresses

- On a private network, a single organization controls the assignment of the addresses for all devices (each address should bbe unique); 
- On a public network, a mechanism is required to ensure that organizations don’t use overlapping addresses and that they enable efficient 
  routing of data between organizations;
  
## IP Address Configuration and Addressing Types

- IP addresses can be set up as either a static or dynamic configuration;
- In a static configuration setup, each device is manually configured with an IP address that doesn’t change;
- In a dynamic configuration setup, allows IP addresses to be assigned to devices and changed under software control (BOOTP and DHCP);

## IP Address Size, Address Space, and Notation

The IP address is a 32-bit binary number: a set of 32 ones or zeros.

### IP Address Dotted Decimal Notation

- Each of the octets in an IP address can take on the values from 0 to 255;
- The lowest value is 0.0.0.0;
- The highest value is 255.255.255.255;

Different representation types:

|                | 0    -   8 | 8   -   16 | 16  -  24 | 24   -  32 |
|----------------|:----------:|:----------:|:---------:|:----------:|
| Binary         |  11100011  |  01010010  | 10011101  |  10110001  |
| Hexadecimal    |     E3     |     52     |    9D     |     B1     |
| Dotted Decimal |    227     |     82     |    157    |    177     |

### IP Address Space

- 4,294,967,296 different address combination possible to create using IP4;

- all IP addresses starting with 127 in the first octet are reserved for the **loopback** function;

- techniques such as **Classless Inter-Domain Routing (CIDR)**, or **supernetting**, and **NAT** were designed in part to utilize the existing Internet IP address 
space more efficiently;

- Pv6 expands the IP address size from 32 bits to 128;

## IP Basic Address Structure and Main Components

### Network ID and Host ID

- **Network Identifier (Network ID)** - A number of bits, starting from the leftmost bit, identifies the network where the host or other network interface is located (*network prefix*);
- **Host Identifier (Host ID)** - The remainder of the bits is used to identify the host on the network;

Example (227.82.157.177):

|                | 0    -   8 | 8   -   16 | 16  -  24 | 24   -  32 |
|----------------|:----------:|:----------:|:---------:|:----------:|
| Binary         |  11100011  |  01010010  | 10011101  |  10110001  |
| Dotted Decimal |    227     |     82     |    157    |    177     |
|                | Network ID | Host ID    | Host ID   |  Host ID   |

### Location of the Division Between Network ID and Host ID

To express the network and host IDs as 32-bit addresses - add zeros to replace the missing pieces.

Example:

- a network ID of 227 and a host ID of **82.157.177**;
- network address - **227.0.0.0**;
- host address - **0.82.157.177**;

### How network ID and host ID are divided

- the division must always be between whole octets of the address;
- it’s also possible to divide it in the middle of an octet;
- often the division shown (on different educational resources) between the network ID and host ID occurring on an octet boundary;
- it’s essential to remember that the dividing point often appears in the middle of one of the eight-bit numbers;

Example:

- IP Address - 227.82.157.177;
- network ID is 20 bits long;
- host ID is 12 bits long;
- third number of the original IP address, 157, being split into 144 and 13;
- it is also possible to use network ID or host ID components either one or the other by itself, depending on context (addresses with special meanings);
- if the network ID is used with all ones as the host ID, this indicates a broadcast to the entire network;
- if the host ID is used by itself with all zeros for the network ID - IP address sent to the host of that ID on the local network;
- inclusion of the network ID in the IP address of each host on the network that causes the IP addresses to be network-specific;
- if the device moved from one network to a different one - the network ID must change to that of the new network;

_IP Address - 227.82.157.177_

|                | 0    -   8 | 8   -   16 | 16  -  24 | 24   -  32 |
|----------------|:----------:|:----------:|:---------:|:----------:|
| Binary         |  11100011  |  01010010  | 1001/1101 |  10110001  |


_Network ID - 227.82.144.0_

|                | 0    -   8 | 8   -   16 | 16  -  24 | 24   -  32 |
|----------------|:----------:|:----------:|:---------:|:----------:|
| Binary         |  11100011  |  01010010  | 1001/0000 |  00000000  |
| Dotted Decimal |    227     |     82     |    144    |     0      |


_Host ID - 0.0.13.177_

|                | 0    -   8 | 8   -   16 | 16  -  24 | 24   -  32 |
|----------------|:----------:|:----------:|:---------:|:----------:|
| Binary         |  00000000  |  00000000  | 0000/1101 |  10110001  |
| Dotted Decimal |     0      |     0      |    13     |    177     |

## IP Addressing Categories and IP Address Adjuncts

- the devices must know how to use IP addresses on the network (must be able to tell which bits are used for each ID);
- the dividing line in IP address is not predefined (depends on the type of addressing used in the network);
- three main categories of IP addressing schemes: classful, subnetted, and classless;

### Conventional (Classful) Addressing

- three main classes of addresses—A, B, and C—are differentiated based on how many octets are used for the network ID and how many for the host ID;
- this most basic addressing type uses the simplest method to divide the network and host IDs;
- the class (dividing point), are encoded into the first few bits of each address;
- routers can tell from these bits which octets belong to which identifier;

Example:

- Class C addresses devote 24 bits to the network ID and 8 bits to the host ID;

### Subnetted Classful Addressing

- the two-tier network and host division is made into a three-tier system by taking some number of bits from a Class A, B, or C host ID and using them 
  for a subnet identifier (subnet ID); 
- the network ID is unchanged; 
- the subnet ID is used for routing within the different subnetworks that constitute a complete network; 
- the dividing line between the subnet ID and the “subhost” ID is indicated by a 32-bit number called a *subnet mask*;

Example: 

- class C address that normally uses the first 24 bits for the network ID and remaining 8 bits for the host ID;
- the host ID can be split into 3 bits for a subnet ID and 5 bits for the host ID;
- this system is based on the original classful scheme (the dividing line between the network ID and full host ID is based on the first few bits 
  of the address);
- the subnet mask would be 27 ones followed by 5 zeros—the zeros indicate what part of the address is the host; 
- in dotted decimal notation, this would be 255.255.255.224;

### Classless Addressing

- the division between the network ID and host ID can occur at an arbitrary point, not just on octet boundaries;
- the dividing point is indicated by putting the number of bits used for the network ID, called the prefix length, after the address;

Example:

- 227.82.157.177 is part of a network where the first 27 bits are used for the network ID;
- that network would be specified as 227.82.157.160/27; 
- the /27 is conceptually the same as the 255.255.255.224 subnet mask, since it has 27 one bits followed by 5 zeros;

### Subnet Mask and Default Gateway

- if either subnetting or classless addressing is used, then the subnet mask (or slash number) is required to fully qualify the address; 
- these numbers are considered adjuncts to the IP address and usually mentioned with the address itself;
- one other number that is often specified along with the IP address for a device is the *default gateway identifier*; 
- this is the IP address of the router that provides default routing functions for a particular device;

## Number of IP Addresses and Multihoming

- host = network interface;
- if a device has more than one interface to the internetwork, it will have more than one IP address (example: router);
- **multihomed** - when host have more than one IP address;
- when **subnetting** is used, the same distinction can be made between multihoming to the same subnet or a different subnet;

### Two or More Interfaces to the Same Network

Devices such as servers or high-powered workstations may be equipped with two physical interfaces to the same network for performance and reliability reasons.

### Interfaces to Two or More Different Networks

- devices may have multiple interfaces to different networks;
- the IP addresses will typically have different network IDs in them;

## IP Address Management and Assignment Methods and Authorities

- Internet Assigned Number Authority (IANA) - responsible for allocating IP addresses, along with other important centralized coordination functions 
  such as managing universal parameters used for TCP/IP protocols;
- Internet Corporation for Assigned Names and Numbers (ICANN) - successor to IANA;
- Addressing is classless, using **CIDR’s** hierarchical addressing scheme;
- IANA doesn’t assign addresses directly, but rather delegates them to regional Internet registries (RIRs);
- RIRs: APNIC, ARIN, LACNIC, RIPE NCC;
- Each RIR can, in turn, delegate blocks of addresses to lower-level registries such as national Internet registries (NIRs) and local Internet registries (LIRs);
- Blocks of addresses are obtained by ISPs for distribution to end-user organizations;

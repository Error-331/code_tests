# TCP/IP (suite)

- uses its own four-layer architecture (which corresponds roughly to the OSI Reference Model);

- addressing system allows devices to be addressed regardless of the lower-level details of how each constituent network is constructed;

- conceptually concerned more with connecting networks than with connecting devices;

- TCP/IP routers enable data to be delivered between devices on different networks by moving it one step at a time from one network to the next;

- TCP/IP protocol suite is oriented around the notion of client/server network communication;

## Important factors

- Integrated Addressing System, TCP/IP includes within it (as part of IP primarily) a system for identifying and addressing devices on both small and large networks;

- Design for Routing, TCP/IP is specifically designed to facilitate the routing of information over a network of arbitrary complexity;

- Underlying Network Independence, TCP/IP operates primarily at layers 3 and above, and includes provisions to allow it to function on almost any lower-layer technology;

- Scalability;

- Open Standards and Development Process;

- Universality Everyone uses TCP/IP because everyone uses it! This last point is, perhaps ironically, arguably the most important. Not only is TCP/IP the underlying language of the Internet, it is also used in most private networks today. Even former competitors to TCP/IP, such as Novell’s NetWare, now use TCP/IP to carry traffic.

## OSI to TCP layers

- 7 Application (OSI) - Application (TCP/IP);

- 6 Presentation (OSI) - Application (TCP/IP);

- 5 Session (OSI) - Application (TCP/IP);

- 4 Transport (OSI) - (Host - to - Host) Transport (TCP/IP);

- 3 Network (OSI)- Internet (TCP/IP);

- 2 Data Link (OSI) - Network Interface (TCP/IP);

- 1 Physical (OSI) - Hardware (TCP/IP);

## Layers

### Network Interface Layer 

- where the actual TCP/IP protocols running at higher layers interface to the local network

- Ethernet handles layer 2 (and layer 1) functions;
 
- Serial Line Internet Protocol (SLIP) and the Point-to-Point Protocol (PPP), fill the gap between the network layer and the physical layer;

### Internet Layer 

- responsible for logical device addressing, data packaging, manipulation and delivery, and routing;

### Host-to-Host Transport Layer 

- facilitate end-to-end communication over an internetwork;

- in charge of allowing logical connections to be made between devices that allow data to be sent either unreliably  or reliably;

- identification of the specific source and destination application process;

- can maintain a session;

- TCP (connection-oriented);
- User Datagram Protocol (UDP) (connectionless);

### Application Layer 

- broad layer, encompassing layers 5 through 7 in the OSI model;

## The Internet Protocol (IP)

- layer 3 protocol;
- provides addressing, datagram routing, and other functions in an internetwork

## Summary  of the TCP/IP protocols

### Network Interface (Layer 2)

#### Serial Line Internet Protocol (SLIP)

- Provides basic TCP/IP functionality by creating a layer 2 connection between two devices over a serial line.

#### Point-to-Point Protocol (PPP)

- Provides layer 2 connectivity like SLIP, but is much more sophisticated and capable. 

- isf a suite of sub-protocols (used for authentication, data encapsulation, encryption, and aggregation);

### Network Interface/Internet (Layer 2/3)

#### Address Resolution Protocol (ARP)

- Used to map layer 3 IP addresses to layer 2 physical network addresses;

#### Reverse Address Resolution Protocol (RARP)

- Determines the layer 3 address of a machine from its layer 2 address (superseded by BOOTP and DHCP);

### Internet Layer (Layer 3)

#### Internet Protocol (IP)

- Provides encapsulation and connectionless delivery of transport layer messages over a TCP/IP network;

- Responsible for addressing and routing functions;

#### Internet Protocol Version 6 (Pv6)

- Provides encapsulation and connectionless delivery of transport layer messages over a TCP/IP network;

- Responsible for addressing and routing functions;

#### IP Network Address Translation (IP NAT)

- Allows addresses on a private network to be automatically translated to different addresses on a public network;

#### IP Security (IPsec)

- Improve the security of IP transmissions;

#### Internet Protocol Mobility Support

- Resolves certain problems with IP associated with mobile devices;

#### Internet Control Message Protocol (ICMP/ICMPv4, ICMPv6)

- A support protocol for IP and IPv6 that provides error reporting and information request-and-reply capabilities to hosts;

#### Neighbor Discovery Protocol (NDP)

- protocol for IPv6 that includes several functions performed by ARP and ICMP in conventional IP;

#### Routing Information Protocol (RIP)

- Protocols used to support the routing of IP datagrams and the exchange of routing information;

#### Open Shortest Path First (OSPF)

- Protocols used to support the routing of IP datagrams and the exchange of routing information;

#### Gateway-to-Gateway Protocol (GGP)

- Protocols used to support the routing of IP datagrams and the exchange of routing information;

#### HELLO Protocol (HELLO)

- Protocols used to support the routing of IP datagrams and the exchange of routing information;

#### Interior Gateway Routing Protocol (IGRP)

- Protocols used to support the routing of IP datagrams and the exchange of routing information;

#### Enhanced Interior Gateway Routing Protocol (EIGRP)

- Protocols used to support the routing of IP datagrams and the exchange of routing information;

#### Border Gateway Protocol (BGP)

- Protocols used to support the routing of IP datagrams and the exchange of routing information;

#### Exterior Gateway Protocol (EGP)

- Protocols used to support the routing of IP datagrams and the exchange of routing information;

### Host-to-Host Transport Layer (Layer 4)

#### Transmission Control Protocol (TCP)

- Establishes and manages connections between devices; 

- Ensures reliable and flow-controlled delivery of data using IP;

- Used for applications that require the establishment of connections (as well as TCP’s other service features), such as FTP;

- Responsible for reliable data transport between software processes on devices;

#### User Datagram Protocol (UDP)

- Severely stripped-down version of TCP;

- More efficient than TCP;

- Less reliable than TCP;

- Less flow-management features than in TCP;

- Used by applications that don’t need connections or other features, but do need the faster performance that UDP can offer by not needing to make such connections before sending data;

### Application Layer (Layer 5/6/7)

#### Domain Name System (DNS)

- Provides the ability to refer to IP devices using names;

#### Network File System (NFS)

- Allows files to be shared seamlessly across TCP/IP networks;

#### Bootstrap Protocol (BOOTP)

- Address some of the issues with RARP 

- Used in a similar manner as RARP (configuration of a TCP/IP device at startup); 

- Superseded by DHCP;

#### Dynamic Host Configuration Protocol (DHCP)

- Protocol for configuring TCP/IP devices and managing IP addresses;

- The successor to RARP and BOOTP;

#### Simple Network Management Protocol (SNMP)

- Protocol for remote management of networks and devices;

#### Remote Monitoring (RMON)

- Part of SNMP;
 
- Used for remote monitoring of network devices;

#### File Transfer Protocol (FTP) / Trivial File Transfer Protocol (TFTP)

- Protocols designed to permit the transfer of all types of files from one device to another;

#### RFC 822

- Protocol that define the formatting, delivery, and storage of email messages on TCP/IP networks;

#### Multipurpose Internet Mail Extensions (MIME)

- Protocol that define the formatting, delivery, and storage of email messages on TCP/IP networks;

#### Simple Mail Transfer Protocol (SMTP)

- Protocol that define the formatting, delivery, and storage of email messages on TCP/IP networks;

#### Post Office Protocol (POP)

- Protocol that define the formatting, delivery, and storage of email messages on TCP/IP networks;

#### Internet Message Access Protocol (IMAP)

- Protocol that define the formatting, delivery, and storage of email messages on TCP/IP networks;
 
#### Network News Transfer Protocol (NNTP)        

- Enables the operation of the Usenet online community by transferring Usenet news messages between hosts;

#### Hypertext Transfer Protocol (HTTP)

- Transfers hypertext documents between hosts;
 
- Implements the World Wide Web;

#### Gopher Protocol (Gopher)

- An older document-retrieval protocol;
 
- Replaced by the World Wide Web;

#### Telnet Protocol (Telnet)

- Allows a user on one machine to establish a remote terminal session on another;

#### Berkeley “r” Commands

- Permit commands and operations on one machine to be performed on another;

#### Internet Relay Chat (IRC)

- Allows real-time chatting between TCP/IP users;

#### Administration and Troubleshooting Utilities and Protocols

- A collection of software tools that allows administrators to manage, configure, and troubleshoot TCP/IP internetworks;
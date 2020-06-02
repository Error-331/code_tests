# TCP/IP

## TCP

- used for applications that require the establishment of connections (as well as TCP’s other service features), such as FTP;

## UDP

- used by other applications that don’t need connections or other features, but do need the faster performance that UDP can offer by not needing to make such connections before sending data;

## Transport layer 

- TCP (connection-oriented);
- User Datagram Protocol (UDP) (connectionless);

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

#### User Datagram Protocol (UDP)

- Severely stripped-down version of TCP;

- More efficient than TCP;

- Less reliable than TCP;

- Less flow-management features than in TCP;

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
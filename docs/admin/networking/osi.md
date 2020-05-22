# OSI

## Physical Layer (Layer 1)

### General

- defines a number of network functions in addition to interfaces with hardware cables and cards;

- physical layer technologies deal with the actual ones and zeros that are sent over the network;

- closely related to the data link layer (Layer 2);

### Devices

- repeaters;
- conventional hubs;
- transceivers;

### Responsibilities

- Hardware Specifications Definition, the details of operation of cables, connectors, wireless radio transceivers, network interface cards, and other hardware devices;

- Encoding and Signaling, functions that transform the data from bits that reside within a computer or another device into signals that can be sent over the network;

- Data Transmission and Reception;

- Topology and Physical Network Design;

## Data Link Layer (Layer 2)

### General

- The layer where many wired and wireless LAN technologies primarily function (Ethernet, Token Ring, FDDI, and 802.11 - wireless Ethernet or Wi-Fi);

- The data link layer is often conceptually divided into two sublayers: logical link control (LLC) and media access control (MAC);

- Logical Link Control (LLC) - provides functions required for the establishment and control of logical links between local devices on a network;

- Media Access Control (MAC) - provides procedures used by devices to control access to the network medium (single network cable, or a series of cables that are electrically connected into a single virtual medium);
                               
#### Media Access Control (MAC)

- Ethernet uses the CSMA/CD method of media;
- Token Ring uses token passing;

### Responsibilities
       
- Data Framing, final encapsulation of higher-level messages into frames that are sent over the network at the physical layer (Layer 1);

- Addressing, labels information with a particular destination location (MAC address);

- Error Detection and Handling, cyclic redundancy check (CRC) and other methods;

- Physical Layer Standards, certain physical layer hardware and encoding aspects are specified by the data link layer;


### Related technologies

- Ethernet cards;
- Token Ring cards;

### Related technologies

- Ethernet;
- Token Ring;
- FDDI (plus CDDI);
- HomePNA;
- IEEE 802.11;
- Asynchronous Transfer Mode (ATM);
- TCP/IP’s Serial Line Interface Protocol (SLIP);
- TCP/IP’s Point-to-Point Protocol (PPP);

## Network Layer (Layer 3)

### General

- defines how internetworks (interconnected networks) function;

- concerned with actually getting data from one computer to another even if it is on a remote network; 

- can either connection-oriented or connectionless;

### Responsibilities

- Logical Addressing, for example by IP; 

- Routing, moving data across a series of interconnected networks;

- Datagram Encapsulation, encapsulation of messages received from higher layers by placing them into datagrams (also called packets) with a network layer header;

- Fragmentation and Reassembly, split the packet up (fragment it), send each piece to the data link layer, and then have the pieces reassembled;

- Error Handling and Diagnostics, uses special protocols to exchange information about the status of hosts on the network or the devices themselves;

### Related technologies

- IPsec;
- IP NAT;
- Mobile IP;
- Internet Control Message Protocol (ICMP);
- Novell Internetworking Packet Exchange (IPX) protocol;

### Devices

- routers;
- brouters (switches);

## Transport Layer (Layer 4)

### General

- provide the necessary functions to enable communication between software application processes on different computers;

- provides means by which applications can all send and receive data using the same lower-layer protocol implementation;

- track the data from each application, then combine it into a single flow of data to send to the lower layers;

### Responsibilities

- This intelligence, encompasses several related jobs, including lost transmission detection and handling, and managing the rate at which data is sent;

- Process-Level Addressing, enables many different software programs to use a network layer protocol simultaneously;

- Multiplexing and Demultiplexing, multiplex the data received from many application programs for transport, combining them into a single stream of data to be sent. The same protocols receive data and 
then demultiplex it from the incoming stream of datagrams, and direct each one to the appropriate recipient application processes;

- Segmentation, Packaging, and Reassembly, segments the large amounts of data it sends over the network into smaller pieces on the source machine, and then reassembles them on the destination machine. 

- Connection Establishment, Management, and Termination, for connection-oriented protocols;

- Acknowledgments and Retransmissions, guarantee reliable delivery of data;

- Flow Control, features which allow one device in a communication to specify to another that it must throttle back the rate at which it is sending data;

### Related technologies

- TCP (TCP/IP suite);
- UDP (TCP/IP suite);
- SPX (NetWare protocol suite);
- NetBEUI (NetBIOS/NetBEUI/NBF suite);

## Session Layer (Layer 5)

### General

- provide the necessary means for setting up, managing, and ending sessions (through APIs);

### Common APIs

- NetBIOS;
- TCP/IP Sockets;
- Remote Procedure Calls (RPCs);

## Presentation Layer (Layer 6)

### General

- charged with taking care of any issues that might arise when data sent from one system needs to be viewed in a different way by the receiving system;

- handles any special processing that must be done to data from the time an application tries to send it until the time it is sent over the network;

### Responsibilities

- Translation, the presentation layer hides the differences between machines (PCs, Macs, UNIX systems, AS/400 servers, and mainframes);

- Compression(and decompression);

- Encryption,
 
### Related technologies
 
- Secure Sockets Layer (SSL) protocol;

## Application Layer (Layer 7)

### General

- provides services for user applications to employ (sending an email message, firing up a web browser, and using a chat program);

### Responsibilities

- Implement the functions that are needed by users of the network and to issue the appropriate commands to make use of the services provided by the lower layers;

### Related technologies

- HTTP; 
- FTP; 
- SMTP; 
- DHCP; 
- NFS;
- Telnet;
- SNMP;
- POP3; 
- NNTP;
- IRC;
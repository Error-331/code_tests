# Networking

## General

- The most common general model: Open Systems Inter-connection (OSI) Reference Model (7 levels);
- TCP/IP spans many layers of the OSI model;
- Transmission Control Protocol (TCP): level 4;
- Internet Protocol (IP): level 3;
- IP provides services to layer 4 and uses services from layer 2 below it;
- Protocol Suites - set of protocols;

## Important

- protocol is formally defined as a set of rules governing communication between entities at the same layer;
- TCP is responsible for a specific set of functions on TCP/IP networks (each host on a TCP/IP network has a TCP implementation, level 4);
- TCP/IP is a large set of protocols;
- Windows TCP/IP protocol suite supports full stack of TCP/IP;
- RMON is not protocol, it is just enhancement of Simple Network Management Protocol (SNMP);

## Connection

### Connection types

- Connection-Oriented Protocols. These protocols require you to establish a logical connection between two devices before transferring data. This is generally accomplished by following a specific set of rules 
that specify how a connection should be initiated, negotiated, managed, and eventually terminated. Usually, one device begins by sending a request to open a connection, and the other responds. The devices pass 
control information to determine if and how the connection should be set up;

- Connectionless Protocols. These protocols do not establish a connection between devices. As soon as a device has data to send to another, it just sends it;

#### Connectionless protocols

- UDP;
- IP;

#### Connection-Oriented protocols

- Asynchronous Transfer Mode (ATM)

### Packet transfer types

- Circuit-switching, specific path is used for data transfer. The circuit may be either a fixed one that is always present or one that is created on an as-needed basis;
- Packet-switching, no specific path is used for data transfer. Instead, the data is chopped up into small pieces called packets and sent over the network;

### Message types

- Unicast - messages that are sent from one device to another device (they are not intended for others); 

- Broadcast - messages that are sent to every device on a network. Broadcast Addressing Broadcasts are normally implemented via a special address that is reserved for that function;

- Multicast - messages that are sent to a group of stations that meet a particular set of criteria. Some mechanism is needed to manage which devices are in which groups;

- Anycast - This term identifies a message that should be sent to the closest member of a group of devices (IPv6);


### Network setup types

- Peer-to-Peer - every computer is an equal, a peer in the network. Each machine can have resources that are shared with any other machine.
- Client-Server - a small number of computers are designated as centralized servers and are given the task of providing services to a larger number of user machines called clients;

### Network types

- Local Area Networks (LANs) - networks that connect computers that are relatively close to each other—generally, within the same room or building;

- Wireless LANs (WLANs) - LANs that connect devices without wires, using radio frequencies or light. WLANs can be entirely wireless, but most are not;

- Wide Area Networks (WANs) - networks that connect devices or other networks over a greater distance than that which is practical for LANs;

- Campus Area Networks (CANs) - networks that are created to span multiple buildings in the same location, such as the campus of a university. 

- Metropolitan Area Networks (MANs) - network that spans a particular small region or a city;

- Personal area network (PAN) - very small LAN with a range of only a few feet;

## Misc

- Circuit-switched networking technologies are inherently connection-oriented, but not all connection-oriented technologies use circuit switching. Logical connection-oriented protocols can be implemented on 
top of packet-switching networks to provide higher-layer services to applications that require connections;

- Hardware devices generally implement multiple layers of the OSI model in addition to the physical layer (Ethernet network interface card performs functions at both the physical layer and the data link layer);

- Sockets is not a protocol, but rather a programming method;

## Terms

- Packet - a message sent by protocols operating at the network layer of the OSI Reference Model, synonymous to datagram (network layer);
- Frame - This term is most commonly associated with messages that travel at low levels of the OSI Reference Model (mostly link layer);
- Protocol Data Unit (PDU) and Service Data Unit (SDU) - these are the formal terms used in the OSI Reference Model to describe protocol messages;

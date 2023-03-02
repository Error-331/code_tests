# TCP and UDP Addressing (Ports and sockets)

Ports and sockets enable many applications to function simultaneously on an IP device.

## TCP/IP Processes, Multiplexing, and Client/Server Application Roles

- all datagrams are packaged and routed in the same way;
- IP is mainly concerned with lower-level aspects of moving them between devices in an efficient manner;
- the entire point of having networks, internetworks, and protocol suites like TCP/IP is to enable networking applications;

### Multiplexing and Demultiplexing

- most communication in TCP/IP takes the form of exchanges of information between a program running on one device and a matching program running on another device;
- each instance of an application represents a copy of that application’s software that needs to send and receive information;
- such application instances are commonly called processes;
- datagrams are sent using the same interface to the internetwork using the IP layer;
- data from all applications is initially funneled down to the transport layer, where TCP or UDP handles it;
- from there, messages pass to the device’s IP layer, where they are packaged in IP datagrams and sent out over the internetwork to different destinations;

The process described above called **multiplexing** (the opposite process is called **demultiplexing**).

### TCP/IP Client Processes and Server Processes

- TCP/IP software is asymmetric (client/server processes on different machines are usually not exactly the same);
- a **client process** usually runs on a **client machine** and initiates contact to perform some sort of function;
- a **server process** usually runs on a **hardware server**, listens for requests from clients, and responds to them;
- many application processes run simultaneously and have their data multiplexed for transmission;

## TCP/UDP Addressing (TCP/IP Ports)

- each host on a TCP/IP **internetwork** has many different software application processes running concurrently;
- each process generates data that it sends to either TCP or UDP, which then passes it to IP for transmission;
- the **IP layer** sends out **multiplexed** stream of datagrams to various destinations;
- each device’s IP layer is receiving datagrams that originated in numerous application processes on other hosts;

### Multiplexing and Demultiplexing Using Ports

- every datagram received by the IP layer will have **IP Address** in the **IP Destination Address field**;
- **Protocol field** carries a code that identifies the protocol that sent the data in the datagram to IP;
- **port** - transport layer address which specifies software process;

### Source Port and Destination Port Numbers

- UDP and TCP messages have two addressing fields: **source port** and **destination port**;
- **source port** and **destination port** are analogous to the **source address** and **destination address** fields at the IP level;
- **source port** and **destination port** identify the **originating process** on the source machine and the **destination process** on the destination machine;
- the TCP or UDP software fills **port fields**, and they direct the data to the correct **process** on the **destination device**;
- TCP and UDP port numbers are **16 bits** in length;
- valid port numbers can theoretically take on values from **0** to **65,535**;
- both UDP and TCP use the same range of port numbers, but they are **independent**;
- each IP datagram contains a **Protocol field** that specifies whether it is carrying a TCP message or a UDP message;
- the source and destination **port numbers** are encapsulated as part of the TCP or UDP message, within the IP datagram’s **data area**;

## TCP/IP Application Assignments and Server Port Number Ranges

TCP/IP **reserves** certain port numbers for particular applications.

### Reserved Port Numbers

- server processes, assign each common application a specific port number;
- the software that implements a particular server process normally uses the same reserved port number on every IP device so that clients can find it easily;
- **IANA** is responsible for the assignment and coordination of **port numbers**;

### TCP/UDP Port Number Ranges

- there are 65,536 port numbers that can be used for processes;
- port 68 is reserved for a client using the Bootstrap Protocol (BOOTP) or Dynamic Host Configuration Protocol (DHCP) - **client processes**;

#### Well-Known (Privileged) Port Numbers (0 to 1023)

- most universal TCP/IP applications;
- protocols that have been standardized using the TCP/IP RFC process;
- protocols that are in the process of being standardized;
- protocols that are likely to be standardized in the future;
- on most computers, only server processes run by system administrators or privileged users use these port numbers;
- these processes generally correspond to processes that implement key IP applications (web servers, FTP servers and etc.);
- these processes are sometimes called **system port numbers**;

#### Registered (User) Port Numbers (1024 to 49151)

- anyone who creates a viable TCP/IP server application can request to reserve one of these port numbers;
- any user on a system can generally access registered port numbers;
- these processes are sometimes called **user port numbers**;

#### Private/Dynamic Port Numbers (49152 to 65535)

- IANA neither reserves nor maintains these ports;
- anyone can use them for any purpose without registration;
- they are appropriate for a private protocol that only a particular organization uses;

## TCP/IP Client (Ephemeral) Ports and Client/Server Application Port Use

- to know where to send the reply, the server must know the port number the client is using;
- the client supplies the port number as the **source port** in the request;
- the server uses the **source port** as the destination port to send the reply;
- each client process is assigned a **temporary port number** for its use (_ephemeral port number_);

### Ephemeral Port Number Assignment

- each client process that’s running concurrently needs to use a **unique** ephemeral port number;
- software generally assigns these port numbers in a **pseudo-random** manner from a **reserved pool** of numbers;

#### Ephemeral Port Number Ranges

- BSD UNIX defines the range as 1024 to 4999, thereby providing 3,976 ephemeral ports;
- many applications use more than one process;

#### TCP/IP Sockets and Socket Pairs: Process and Connection Identification

- _socket_ - combination of the **IP address** of the **host** (or the network interface) and the **port number**;
- sockets are specified using the notation _<IP Address>:<Port Number>_;
- each device may have **multiple TCP connections** active at any given time;
- each connection is **uniquely** identified using the combination of the **client socket** and **server socket**;
- Winsock - API for windows;
- the socket pair for UDP doesn’t have the significance that it does in TCP;
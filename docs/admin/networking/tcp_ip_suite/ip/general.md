# IP Addressing Overview and Fundamentals

Network Interface Identification - unique identification of the interface between a device and the network;
Routing - when the source and destination of an IP datagram are not on the same network, the datagram must be delivered indirectly using 
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

### IP Address Size and Binary Notation

- the IP address is just a 32-bit binary number: a set of 32 ones or zeros. At their lowest levels, computers always work in binary, and this also applies to networking hardware and software. While different meanings are ascribed to different bits in the address, the address itself is just a 32-digit binary number.



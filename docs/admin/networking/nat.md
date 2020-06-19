# IP network address translation (nat) protocol 

Acts as a gateway between local network and external network using a range of public IP`s which is used to dynamically map local IP to public IP.

## General

- extend the life of the Internet Protocol version 4 (IPv4) addressing scheme;

- allows a small number of public IP addresses to be shared by a large number of hosts using private addresses;

- provides some security benefits by making hosts more difficult to address directly by foreign machines on the public Internet;

- usually implemented on router side;

## Misc

- described in RFC 1631 (informational);

## Terminology

- Inside Address, address of a device on the organization’s private network;
- Outside Address, everything outside the local network is considered the outside network;

- Local Address, an address that appears in a datagram on the inside network, whether it refers to an inside or outside address;
- Global Address, an address that appears in a datagram on the outside network, whether it refers to an inside or outside address;

- Inside Local Address, an address of a device on the local network, expressed using its normal local device representation (for example, address 10.0.0.207 on 10.0.0.0 private address block);
- Inside Global Address, global, publicly routable IP address that’s used to represent an inside device to the outside world. 

- Outside Global Address, an address of an external (public Internet) device as it is referred to on the global Internet.
- Outside Local Address, an address of an external device as it is referred to by devices on the local network;

#### Inside Device Designations

For an inside device, the inside local address is its normal, or native, address. The inside global address is a translated address used to
represent the inside device on the outside network, when necessary.

#### Outside Device Designations 

For an outside device, the outside global address is its normal, or native, address. The outside local address is a translated address used to
represent the outside device on the inside network, when necessary.

## Basic components

- organization’s internal network (with private address range);
- one or more public (Internet) addresses;
- one or more NAT-capable routers;
 
## Advantages / Disadvantages of IP NAT 

### Advantages 

- Public IP Address Sharing, large number of hosts can share a small number of public IP addresses;
- Easier Expansion, local network devices are privately addressed and a public IP address isn’t needed for each one;
- Greater Local Control Administrators, get all the benefits of control that come with a private network, but can still connect to the Internet;
- Greater Flexibility, only the public addresses change - it isn’t necessary to renumber all the client machines on the network;
- Increased Security, creates a type of firewall between the organization’s network and the public Internet;
- Transparent NAT implementation is mostly transparent, because the changes take place in one or perhaps a few routers;

### Disadvantages

- Complexity;
- Problems Due to Lack of Public Addresses;
- Compatibility Problems with Certain Applications, NAT tinkers with the IP header fields in datagrams but not in the application data (like the File Transfer Protocol);
- Problems with Security Protocols Protocols, for example, IPsec are designed to detect modifications to headers and commonly balk at the changes that NAT makes;
- Poor Support for Client Access, Peer-to-peer applications are harder to set up, and something like an organizational website (accessed from the Internet as a whole) usually needs to be set up without NAT;
- Performance Reduction, each time a datagram transitions between the private network and the Internet, an address translation is required;

## NAT operation types

### Unidirectional (Traditional/Outbound)

In unidirectional (traditional) NAT, the NAT router translates the source address of an outgoing request from inside local to inside global form. It then transforms the destination address of the response from 
inside global to inside local. The outside local and outside global addresses are the same in both request and reply.

### Bidirectional (Two-Way/Inbound)

In traditional NAT, a transaction must begin with a request from a client on the local network, but in bidirectional (two-way/inbound) NAT, it is possible for a device on the public Internet to access a local 
network server. This requires the use of either static mapping or DNS to provide to the outside client the address of the server on the inside network. Then the NAT transaction is pretty much the same as in the 
unidirectional case, except in reverse: The incoming request has its destination address changed from inside global to inside local; the response has its source changed from inside local to inside global.

### IP NAT Port-Based (Overloaded) Operation

Port-Based or overloaded NAT is an enhancement of regular NAT that allows a large number of devices on a private network to simultaneously share a single inside global address by changing the port numbers 
used in TCP and UDP messages.

### IP NAT Overlapping/Twice NAT Operation

Translates both the source address and the destination address on each transition from the inside to the outside or the other direction.

#### Solves following cases: 

- Private Network–to–Private Network Connections. The example network using 10.0.0.0 block addresses might want to connect to another network using the same method. This situation might occur if two corporations 
merged and happened to be using the same addressing scheme (and there aren’t that many private IP blocks, so this isn’t that uncommon).

- Invalid Assignment of Public Address Space to Private Network. Some networks might have been set up, not by using a designated private address block, but rather by using a block containing valid Internet addresses. 
For example, suppose an administrator decided that the network he was setting up would never be connected to the Internet (ha!), and numbered the whole thing using 18.0.0.0 addresses, which belong to the 
Massachusetts Institute of Technology (MIT). Then later, this administrator’s shortsightedness would backfire when the network did indeed need to be connected to the Internet.

- Stale Public Address Assignment. Company A might have been using a particular address block for years that was reassigned or reallocated for whatever reason to Company B. Company A might not want to go 
through the hassle of renumbering its network, and would then keep its addresses, even while Company B started using them on the Internet.
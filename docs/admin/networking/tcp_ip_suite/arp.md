# Address resolution and the tcp/ip address resolution protocol (ARP)

- communication on an internetwork is accomplished by sending data at layer 3 (network layer address);

- actual transmission of that data occurs at layer 2 (link layer address);

- every device with a fully specified networking protocol stack will have both a layer 2 and a layer 3 address;

- address resolution is done by taking a network layer address and determining what data link layer address goes with it;

## Address Resolution Concepts and Issues

### Addressing at Layer 2 and Layer 3

- layer 2 addresses are used for local transmissions between hardware devices that can communicate directly (basic LAN, WLAN, WAN);

- layer 3 addresses (IP) are used in internetworking (massive virtual network) at the network layer;

- internetworked devices communicate logically using layer 3 addresses, but the actual transmissions between devices take place using layer 2 (hardware) addresses;

### General Address Resolution Methods

- translation occurs for each hop of every datagram sent over an internetwork;

- manner of translation process is important;

- address resolution can be accomplished in two basic ways: direct mapping and dynamic resolution;

- implementation must be specific to the technologies used in each of these layers;

- only method that could really be considered generic would be the use of static, manually updated tables;

## Address Resolution Through Direct Mapping

- a formula is used to map the higher-layer address into the lower-layer address;
- choose a scheme for layer 2 and layer 3 addresses so that you can determine one from the other using a simple algorithm;
- when the layer 2 address is smaller than the layer 3 address, it is possible to define a direct mapping between them so that the hardware address can be determined directly from the network layer address; 
- used in ARCNet;

### Problems with Direct Mapping

- works only when it is possible to express the data link layer address as a function of the network layer address;

- when the hardware address size exceeds the network layer address size, partial mapping should be used (use IP address to get part of the MAC address and hope that there will be no duplication in the 
bits that were not used);

- direct mapping is not possible when the layer 3 address is smaller than the layer 2 address;

## Dynamic Address Resolution

- allows a device with only an IP address to determine the corresponding data link layer address (ven if the two address types take completely different forms);
- done by interrogating one or more other devices on a local network to determine what data link layer address corresponds to a given IP address;
- more complex and less efficient than direct mapping, but it’s more flexible;

### How Dynamic Addressing Works

- implemented using a special protocol;
- the device that wants to send data broadcasts a request asking for a response with a hardware address from the other device;
- device A needs to send data to device B, but knows only its IP address (IPB) and not its hardware address;
- device A broadcasts a request asking to be sent the hardware address of the device using the IP address IPB;
- device B responds back to device A directly with the hardware address;

### Dynamic Address Resolution Caching and Efficiency Issues

- the link between the two is kept in the memory of the device for a period of time;
- when it needs the layer 2 address the next time, the device just does a quick lookup in its cache;
- cache entries must be set to expire periodically (to accommodate changes to network layer addresses);


### Other Enhancements to Dynamic Resolution

- cross-resolution, when device A resolves the address of device B, device B also adds the entry for device A to its cache;
- if device A is resolving device B’s network layer address, it will broadcast a frame to devices C, D, E, and so on which will update their cache tables as well;

## ARP Message Types and Address Designations

### Sender/Target identities

- request, for the initial request, the sender is the source (the device with the IP datagram to send), and the target is the destination;
- reply, for the reply to the ARP request, the sender is the destination, it replies to the source, which becomes the target;

### Addresses types

- Sender Hardware Address - the layer 2 address of the sender of the ARP message;
- Sender Protocol Address - the layer 3 (IP) address of the sender of the ARP message;
- Target Hardware Address - the layer 2 address of the target of the ARP message;
- Target Protocol Address - the layer 3 (IP) address of the target;

## ARP General Operation

- Source Device Checks Cache - the source device checks if address has been resolved and in cache, if not - skip to `Source Device Updates ARP Cache`;

- Source Device Generates ARP Request Message - the source device generates an ARP Request message (it puts its own data link layer address as the `Sender Hardware Address` and its own IP address as the `Sender Protocol Address`, it
fills in the IP address of the destination as the `Target Protocol Address`, it must leave the `Target Hardware Address` blank);

- Source Device Broadcasts ARP Request Message - the source broadcasts the ARP Request message on the local network;

- Local Devices Process ARP Request Message - the message is received by each device on the local network and processed, with each device looking for a match on the `Target Protocol Address`;

- Destination Device Generates ARP Reply Message - the one device whose IP address matches the contents of the `Target Protocol Address` of the message will generate an ARP Reply message (it takes the `Sender Hardware Address` and
`Sender Protocol Address` fields from the ARP Request message and uses these as the values for the `Target Hardware Address` and `Target Protocol Address` of the reply, it then fills in its own layer 2 address as the 
`Sender Hardware Address` and its IP address as the `Sender Protocol Address`;

- Destination Device Updates ARP Cache - the destination device will add an entry to its own ARP cache that contains the hardware and IP addresses of the source that sent the ARP Request;

- Destination Device Sends ARP Reply Message - the destination device sends the ARP Reply message (sent unicast to the source device, because there is no need to broadcast it);

- Source Device Processes ARP Reply Message - the source device processes the reply (it stores the `Sender Hardware Address` as the layer 2 address of the destination and uses that address for sending its IP datagram);

- Source Device Updates ARP Cache - the source device uses the `Sender Protocol Address` and `Sender Hardware Address` to update its ARP cache for use in the future when transmitting to this device;

### ARP Message Format

- HRD (size 2) - hardware type used for the local network transmitting the ARP message; 
- PRO (size 2) - protocol type of layer 3 addresses used in the message (for IPv4 - 2048 (0800 hex), which corresponds to the EtherType code for IP);
- HLN (size 1) - hardware address length, specifies how long hardware addresses are in this message (for Ethernet or other networks using IEEE 802 MAC addresses, the value is 6);
- PLN (size 1) - protocol address length, specifies how long protocol (layer 3) addresses are in this message (for IPv4 addresses, this value is 4);
- OP  (size 2) - opcode, specifies the nature of the ARP message being sent (first two values (1 and 2) are used for regular ARP);
- SHA (variable, equals value in HLN field) - sender hardware address, the hardware (layer 2) address of the device sending this message;
- SPA Variable, equals value in PLN field - sender protocol address (the IP address of the device sending this message);
- THA Variable, equals value in HLN field - target hardware address, the hardware (layer 2) address of the device this message is being sent to (IP datagram destination device on a request, and the IP datagram source on a reply);
- TPA Variable, equals value in PLN field - target protocol address, the IP address of the device this message is being sent to;

#### ARP Hardware Type (HRD) Field Values

- 1, Ethernet (10 Mb);
- 6, IEEE 802 Networks;
- 7, ARCNeT;
- 15, Frame Relay;
- 16, Asynchronous Transfer Mode (ATM);
- 17, HDLC;
- 18, Fibre Channel;
- 19, Asynchronous Transfer Mode (ATM);
- 20, Serial Line;

#### ARP Opcode (OP) Field Values

- 1, ARP Request;
- 2, ARP Reply;
- 3, RARP Request;
- 4, RARP Reply;
- 5, DRARP Request;
- 6, DRARP Reply;
- 7, DRARP Error;
- 8, InARP Request;
- 9, InARP Reply;

### ARP Caching

In addition to reducing network traffic, caching also ensures that the resolution of commonly used addresses is fast, thereby making overall performance comparable to direct mapping.

#### Static and Dynamic ARP Cache Entries

- Static ARP Cache Entries - address resolutions that are manually added to the cache table for a device and are kept in the cache on a permanent basis;
- Dynamic ARP Cache Entries - hardware and IP address pairs that are added to the cache by the software itself as a result of past ARP resolutions that were successfully completed (they are kept in the cache for only a period of time);

#### Cache Entry Expiration

- Device Hardware Changes - second device might experience a hardware failure that requires its network interface card to be replaced, the mapping in first device cache would become invalid;
- Device IP Address Changes - the mapping in first device cache also would become invalid if second device IP address changed;
- Device Removal - self explanatory;

### Proxy ARP

Since ARP relies on broadcasts for address resolution, and broadcasts are not propagated beyond a physical network, ARP cannot function between devices on different physical networks. When such operation is required, 
a device, such as a router, can be configured as an ARP proxy to respond to ARP requests on the behalf of a device on a different network.
 
#### Disadvantages 
 
- added complexity;
- if more than one router connects two physical networks using the same network ID, problems may arise;
- introduces potential security risks, since it essentially means that a router impersonates devices by acting as a proxy for them;

### TCP/IP Address Resolution for IP Multicast Addresses

- IP multicast addresses are resolved to IEEE 802 (Ethernet) MAC addresses using a direct mapping technique that uses 23 of the 28 bits in the IP multicast group address;
- devices must not assume that all multicast messages they receive are for their groups; 
- devices must pass up the messages to the IP layer to check the full IP multicast address to make sure that they really were supposed to get the multicast datagram they received;
- if devices accidentally get one that was intended for a multicast group they are not a member of, they discard it;

#### Bits arrangement

- data link layer addresses have 48 bits, arranged into two blocks of 24;
- the upper 24 bits are arranged into a block called the organizationally unique identifier (OUI), with different values assigned to individual organizations; 
- the lower 24 bits are then used for specific devices;

### TCP/IP Address Resolution for IP Version 6

- uses the new Neighbor Discovery (ND) Protocol instead of the Address Resolution Protocol (ARP);
- first device trying to send an IPv6 datagram sends a Neighbor Solicitation message to get the address of second device;
- second device responds with a Neighbor Advertisement;
- when possible, to improve efficiency, the request is sent using a special type of multicast address rather than broadcast;

## Attacks

### ARP spoofing (ARP spoofing, ARP cache poisoning, or ARP poison routing)

The attack can only be used on networks that use ARP, and requires attacker have direct access to the local network segment to be attacked. Basic steps are:

- send (spoofed) Address Resolution Protocol (ARP) messages onto a local area network;
- associate the MAC address with the IP address of another host;
- enable packet forwarding to avoid detection;
- listen/modify traffic or launch a denial-of-service attack by causing some or all of the packets on the network to be dropped.;

#### Vulnerabilities

- ARP is a stateless protocol;
- network hosts will automatically cache any ARP replies they receive, regardless of whether network hosts requested them;
- ARP entries that have not yet expired will be overwritten when a new ARP reply packet is received;
- there is no method in the ARP protocol by which a host can authenticate the peer from which the packet originated;

#### Defenses

##### Static ARP entries

- does not scale on a large network;
- on each machine there must be an ARP entry for every other machine on the network; 

##### ARP spoofing detection and prevention software

- software that detects ARP spoofing generally relies on some form of certification or cross-checking of ARP responses;
- AntiARP provides Windows-based spoofing prevention at the kernel level;
- ArpStar is a Linux module for kernel 2.6 and Linksys routers that drops invalid packets that violate mapping, and contains an option to repoison/heal;
- some virtualized environment such as KVM also provides security mechanism to prevent MAC spoofing between guest running on the same host;
- additionally some ethernet adapters provides MAC and VLAN anti-spoofing features;
- OpenBSD watches passively for hosts impersonating the local host and notifies in case of any attempt to overwrite a permanent entry;

##### OS security

- Linux ignores unsolicited replies, but, on the other hand, uses responses to requests from other machines to update its cache;

- Solaris accepts updates on entries only after a timeout;

- in Microsoft Windows, the behavior of the ARP cache can be configured through several registry entries under HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters, 
ArpCacheLife, ArpCacheMinReferenceLife, ArpUseEtherSNAP, ArpTRSingleRoute, ArpAlwaysSourceRoute, ArpRetryCount;

#### Legitimate usage

ARP spoofing is often used by developers to debug IP traffic between two hosts when a switch is in use: 

- the developer configures A to have M's MAC address for B;
- B to have M's MAC address for A;
- M to forward packets;



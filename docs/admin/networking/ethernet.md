# Ethernet

- represents physical layer of OSI model;
- used in local area networks (LAN), metropolitan area networks (MAN) and wide area networks (WAN);
- standardized in 1983 as IEEE 802.3;
- replaced competing wired LAN technologies such as Token Ring, FDDI and ARCNET;
- speed range from 2.94 megabits per second (Mbit/s) to the latest 400 gigabits per second (Gbit/s);
- Ethernet frames are said to be self-identifying, because of the EtherType field;

## Hardware

- coaxial cable (was replaced with point-to-point links connected by Ethernet repeaters or switches);
- twisted pair;
- fiber optic;

## Principal of work

- divide a stream of data into shorter pieces called frames;
- each frame contains source and destination addresses as well as error-checking data;
- higher-layer protocols trigger retransmission of lost frames;
- provides services up to and including the data link layer;
- adapters come programmed with globally unique 48-bit MAC address (used to specify both the destination and the source of each data packet);
- establishes link-level connections, which can be defined using both the destination and source addresses;
- on reception of a transmission, the receiver uses the destination address to determine whether the transmission is relevant to the station or should be ignored;
- does not accept packets addressed to other Ethernet stations;
- EtherType field in each frame is used by the operating system on the receiving station to select the appropriate protocol module (such as IPv4);

## Collision

- A collision happens when two stations attempt to transmit at the same time;
- data is being corrupted and require stations to re-transmit it;
- lost data and re-transmission reduces throughput;
- in a modern Ethernet, the stations do not all share one channel through a shared cable or a simple repeater hub;
- instead, each station communicates with a switch, which in turn forwards that traffic to the destination station;
- 10BASE-T standard introduced a full duplex mode of operation which became common with Fast Ethernet and the de facto standard with Gigabit Ethernet (thus collision-free);

## Frame structure

- packet is used to describe the overall transmission unit and includes the preamble, start frame delimiter (SFD) and carrier extension (if present);
- the frame begins after the start frame delimiter with a frame header featuring source and destination MAC addresses and the EtherType; 
- EtherType field contains protocol type for the payload protocol or the length of the payload;
- middle section of the frame consists of payload data including any headers for other protocols;
- the frame ends with a 32-bit cyclic redundancy check, which is used to detect corruption of data in transit
- Ethernet packets have no time-to-live field, leading to possible problems in the presence of a switching loop;

## Autonegotiation

- is the procedure by which two connected devices choose common transmission parameters, e.g. speed and duplex mode;
- was initially an optional feature, first introduced with 100BASE-TX, while it is also backward compatible with 10BASE-T;
- is mandatory for 1000BASE-T and faster;

## Error conditions

### Switching loop

- occurs in computer networks when there is more than one Layer 2 (OSI model) path between two endpoints (multiple connections between two network switches or two ports on the same switch connected to each other);
- the loop creates broadcast storms as broadcasts and multicasts are forwarded by switches out every port;
- the switch or switches will repeatedly rebroadcast the broadcast messages flooding the network 
- since the Layer 2 header does not support a time to live (TTL) value, if a frame is sent into a looped topology, it can loop forever;

Notes:

- a switched network must not have loops;
- use the shortest path bridging (SPB) protocol or the older spanning tree protocols (STP) on the network switches;

### Jabber

- a node that is sending longer than the maximum transmission window for an Ethernet packet is considered to be jabbering;
- depending on the physical topology, jabber detection and remedy differ somewhat;

Notes:

- an MAU is required to detect and stop abnormally long transmission from the DTE (longer than 20–150 ms) in order to prevent permanent network disruption;
- on an electrically shared medium (10BASE5, 10BASE2, 1BASE5), jabber can only be detected by each end node, stopping reception (no further remedy is possible);
- a repeater/repeater hub uses a jabber timer that ends retransmission to the other ports when it expires (Jabbering ports are partitioned off the network until a carrier is no longer detected);
- end nodes utilizing a MAC layer will usually detect an oversized Ethernet frame and cease receiving (a bridge/switch will not forward the frame);
- a non-uniform frame size configuration in the network using jumbo frames may be detected as jabber by end nodes;
- a packet detected as jabber by an upstream repeater and subsequently cut off has an invalid frame check sequence and is dropped;

### Runt frames

- runts are packets or frames smaller than the minimum allowed size;
- they are dropped and not propagated;

## Attacks

### MAC flooding (media access control attack)

- a technique employed to compromise the security of network switches;
- the attack works by forcing legitimate MAC table contents out of the switch and forcing a unicast flooding behavior (sending sensitive information to portions of the network where it is not normally intended to go);

#### Method

- switches maintain a MAC table that maps individual MAC addresses on the network to the physical ports on the switch;
- this allows the switch to direct data out of the physical port where the recipient is located, as opposed to indiscriminately broadcasting the data out of all ports as an Ethernet hub does;
- the advantage of this method is that data is bridged exclusively to the network segment containing the computer that the data is specifically destined for;
- a switch is fed many Ethernet frames, each containing different source MAC addresses (to consume the limited memory set aside in the switch to store the MAC address table);
- the effect of this attack may vary across implementations;
- the desired effect (by the attacker) is to force legitimate MAC addresses out of the MAC address table, causing significant quantities of incoming frames to be flooded out on all ports;
- a malicious user can use a packet analyzer to capture sensitive data being transmitted between other computers, which would not be accessible were the switch operating normally;
- the attacker may also follow up with an ARP spoofing attack which will allow them to retain access to privileged data after switches recover from the initial MAC flooding attack;

#### Counter measures

- with a feature often called 'port security' by vendors, many advanced switches can be configured to limit the number of MAC addresses that can be learned on ports connected to end stations;
- many vendors allow discovered MAC addresses to be authenticated against an authentication, authorization and accounting (AAA) server and subsequently filtered;
- implementations of IEEE 802.1X suites often allow packet filtering rules to be installed explicitly by an AAA server based on dynamically learned information about clients, including the MAC address;
- security features to prevent ARP spoofing or IP address spoofing in some cases may also perform additional MAC address filtering on unicast packets, however this is an implementation-dependent side-effect;
- 'port security' feature to retain all secure MAC addresses for at least as long as they remain in the ARP table of layer 3 devices (the aging time of learned secure MAC addresses is separately adjustable);




# Arcnet

Attached Resource Computer NETwork (ARCNET or ARCnet) is a communications protocol for local area networks. It was later applied to embedded systems where certain features of the protocol are especially useful. Arcnet is a 
data-link layer technology, without any defined application layer (Arcnet standard defines the two bottom layers of the OSI models that are the data link layer and the physical layer). ARCNET controllers are still sold and 
used in industrial, embedded, and automotive applications

## Key points

- is rarely used for new general networks and it retains a niche in industrial control;

- RCNET Plus ran at 20 Mbit/s, and was backward compatible with original ARCnet equipment;

- ideal real-time networking system;

- some ARCNET twisted-pair products supported cable runs over 2,000 ft (610 m) on standard Cat-3 cable, far beyond anything Ethernet could do on any kind of copper cable;

- layer 2 address can fit into single byte of layer 3 address (function of layer 3 address);

## Topology

- implemented as a distributed star;

- each node is assigned an 8 bit address (usually via DIP switches);

- each node is assigned an 8 bit address (usually via DIP switches);

- when a new node joins the network a "reconfig" occurs, wherein each node learns the address of the node immediately above it;

- token is then passed directly from one node to the next;

## Advantages

- cable distance, cable runs could extend 610 m (2,000 ft) between active hubs or between an active hub and an end node;

- cost of a 4 port ARCNET passive hub was less than cost of the 4 BNC Tee connectors and 2 terminators that thin Ethernet requires to connect 4 computers;

- performance does not degraded drastically if too many peers attempted to broadcast at the same time;

- had slightly lower best-case performance (viewed by a single stream), but is much more predictable;

- has the advantage that it achieved its best aggregate performance under the highest loading, approaching asymptotically its maximum throughput;

- 2.5 Mbit/s ARCNET could at one time outperform a 10 Mbit/s Ethernet in a busy office on slow processors;

- provides the sender with a concrete acknowledgment (or not) of successful delivery at the receiving end before the token passes on to the next node (much faster fault recovery within the higher level protocols);

- doesn't waste network time transmitting to a node not ready to receive the message;

- it guarantees equitable access to the bus by everyone on the network;

## Disadvantages

- requires either an active or passive hub between nodes if there were more than two nodes in the network;

- allows only 255 nodes per network (larger networks would have to be split into smaller networks, and bridged);

- manual configuration of IDs;





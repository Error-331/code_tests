# Point-to-Point Protocol (PPP) Overview and Fundamentals 

## General

- provides full-featured IP transmission over direct links between pairs of devices;

- fill the gap between IP at layer 3 and the physical connection at layer 1;

- includes numerous capabilities and features, including error detection, compression, authentication, and encryption; 

- most popular layer 2 WAN technology;

- often used to provide layer 2 functionality on Integrated Services Digital Network (ISDN);

- is a connection-oriented protocol;

- supported on both synchronous and asynchronous lines;
 
- can operate in half-duplex or full-duplex mode;

- it is actually a protocol suite;

## PPP Function and Architecture 

- enables layer 2 links over a variety of different physical layer connections; 
- designed for point-to-point connections between two devices;
- assumes that frames are sent and received in the same order;
- PPP’s operation follows a specific sequence, including a multistep Link Establishment phase that may include optional authentication;  

### Place in OSI/TCP model

- 7 Application (OSI/TCP) - Upper Layer Protocols;
- 6 Application (OSI/TCP) - Upper Layer Protocols;
- 5 Application (OSI/TCP) - Upper Layer Protocols;
- 4 Transport (OSI/TCP) - TCP/UDP;
- 3 Internet (OSI/TCP) - IP;
- 2 Network Interface (OSI/TCP) - PPP;
- 1 Network Interface (OSI/TCP) - Physical Link (serial, dial-up, ISDN, and so on);

## Advantages and Benefits 

- comprehensive framing mechanism;
- allow multiple layer 3 protocols to be multiplexed on a single link;
- cyclic redundancy check (CRC);
- robust mechanism for negotiating link parameters;
- testing links before datagram transmission takes place;
- support for authentication of the connection using multiple authentication protocols;
- support for additional optional features(compression, encryption, and link aggregation);
- is a complete link layer protocol suite for devices using TCP/IP;  
- includes derivative protocols like PPP over Ethernet (PPPoE) and PPP over ATM (PPPoA); 

## PPP Main Components  

- PPP Encapsulation Method, take higher-layer messages and encapsulate them for transmission over the underlying physical layer link;  
- Link Control Protocol (LCP), responsible for setting up, maintaining, and terminating the link between devices;

## Network Control Protocols (NCPs) 

Once the general link setup is completed with LCP, control is passed to the NCP that is specific to the layer 3 protocol being carried on the PPP link 
(when IP is carried over PPP, the NCP used is the PPP Internet Protocol Control Protocol (IPCP)). Other NCPs are defined for supporting the 
Internetworking Packet Exchange (IPX) protocol, the NetBIOS Frames (NBF) protocol, and so forth.  

## PPP Functional Groups 

- LCP Support Protocols - Several protocols in the PPP suite are used during the link negotiation process (manage it or to configure options);

- LCP Optional Feature Protocols - enhance PPP suite operation once a link has been set up and datagrams are being passed between devices;

### LCP Support Protocols

- Challenge Handshake Authentication Protocol (CHAP); 
- Password Authentication Protocol (PAP);

### LCP Optional Feature Protocols

- PPP Compression Control Protocol (CCP);
- PPP Encryption Control Protocol (ECP);
- PPP Multilink Protocol (PPP MP) allows a single PPP link to be operated over multiple physical links; 

## General Operation 

- Link Operation;  
- Link Termination; 

## PPP Link Setup and Phases 

- LCP is generally in charge of setting up and maintaining PPP links;

- LCP may invoke an authentication protocol (PAP or CHAP) when PPP is configured to use authentication; 

- Once an LCP link has been opened, PPP invokes one or more NCPs for the layer 3 protocol being carried on the link; 

- A PPP link is established, configured, used, and eventually terminated (finite state machine (FSM));

### Link Dead Phase
 
- PPP link always begins and ends in the Link Dead phase; 
- The link remains dead until the physical layer link is set up;

### Link Establishment Phase 

- Device A sends an LCP configuration request message to Device B over the physical link, specifying the parameters it wishes to use;
- If Device B agrees, it replies with an acknowledgment;
- If Device B doesn’t agree, it returns a negative acknowledgment or rejection, telling Device A what it won’t accept;
- Device A can then try a different configuration request with new parameters that Device B may accept;
- If Device A and Device B eventually come to agreement, the link status is considered LCP open and will proceed to the Authentication phase; 
- If they cannot agree, the physical link is terminated, and it returns to the Link Dead phase;

### Authentication Phase 

- Authentication is not mandatory in PPP; 
- When it is used, the appropriate authentication protocol (CHAP or PAP) is employed;
- After successful authentication, the link proceeds to the Network Layer Protocol phase;
- If authentication is not successful, the link fails and transitions to the Link Termination phase;

### Network Layer Protocol Phase 

- appropriate NCP is invoked(IPCP, IPXCP, and so forth);
- More than one NCP can be open on a particular PPP link, and each can be closed independently when it is no longer needed;

### Link Open Phase 

- Data can be passed for each NCP that has been successfully set up;
- The link can be terminated at any time by either device for a variety of reasons; 

### Link Termination Phase 

- link sends a special LCP termination frame, and the other device acknowledges it;
- link then returns to the Link Dead phase;
- if the termination was by request and the physical layer connection is still active, the PPP should signal the physical layer to terminate the layer 1 connection. 
- basic link is established by LCP, and NCP links are set up within the LCP link;
- closing an NCP link does not cause the LCP link to be closed (even if all NCPs are close); 
- to terminate a PPP connection, only the LCP link needs to be terminated in the Link Termination phase (the NCPs do not need to be explicitly closed); 

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

### PPP Function and Architecture 

- enables layer 2 links over a variety of different physical layer connections; 
- designed for point-to-point connections between two devices;
- assumes that frames are sent and received in the same order;
- PPP’s operation follows a specific sequence, including a multistep Link Establishment phase that may include optional authentication;  

#### Place in OSI/TCP model

- 7 Application (OSI/TCP) - Upper Layer Protocols;
- 6 Application (OSI/TCP) - Upper Layer Protocols;
- 5 Application (OSI/TCP) - Upper Layer Protocols;
- 4 Transport (OSI/TCP) - TCP/UDP;
- 3 Internet (OSI/TCP) - IP;
- 2 Network Interface (OSI/TCP) - PPP;
- 1 Network Interface (OSI/TCP) - Physical Link (serial, dial-up, ISDN, and so on);

### Advantages and Benefits 

- comprehensive framing mechanism;
- allow multiple layer 3 protocols to be multiplexed on a single link;
- cyclic redundancy check (CRC);
- robust mechanism for negotiating link parameters;
- testing links before datagram transmission takes place;
- support for authentication of the connection using multiple authentication protocols;
- support for additional optional features(compression, encryption, and link aggregation);
- is a complete link layer protocol suite for devices using TCP/IP;  
- includes derivative protocols like PPP over Ethernet (PPPoE) and PPP over ATM (PPPoA); 

### PPP Main Components  

- PPP Encapsulation Method, take higher-layer messages and encapsulate them for transmission over the underlying physical layer link;  
- Link Control Protocol (LCP), responsible for setting up, maintaining, and terminating the link between devices;

#### Network Control Protocols (NCPs) 

Once the general link setup is completed with LCP, control is passed to the NCP that is specific to the layer 3 protocol being carried on the PPP link 
(when IP is carried over PPP, the NCP used is the PPP Internet Protocol Control Protocol (IPCP)). Other NCPs are defined for supporting the 
Internetworking Packet Exchange (IPX) protocol, the NetBIOS Frames (NBF) protocol, and so forth.  

#### PPP Functional Groups 

- LCP Support Protocols - Several protocols in the PPP suite are used during the link negotiation process (manage it or to configure options);

- LCP Optional Feature Protocols - enhance PPP suite operation once a link has been set up and datagrams are being passed between devices;

##### LCP Support Protocols

- Challenge Handshake Authentication Protocol (CHAP); 
- Password Authentication Protocol (PAP);

##### LCP Optional Feature Protocols

- PPP Compression Control Protocol (CCP);
- PPP Encryption Control Protocol (ECP);
- PPP Multilink Protocol (PPP MP) allows a single PPP link to be operated over multiple physical links; 

### General Operation 

- Link Operation;  
- Link Termination; 

### PPP Link Setup and Phases 

- LCP is generally in charge of setting up and maintaining PPP links;

- LCP may invoke an authentication protocol (PAP or CHAP) when PPP is configured to use authentication; 

- Once an LCP link has been opened, PPP invokes one or more NCPs for the layer 3 protocol being carried on the link; 

- A PPP link is established, configured, used, and eventually terminated (finite state machine (FSM));

#### Link Dead Phase
 
- PPP link always begins and ends in the Link Dead phase; 
- The link remains dead until the physical layer link is set up;

#### Link Establishment Phase 

- Device A sends an LCP configuration request message to Device B over the physical link, specifying the parameters it wishes to use;
- If Device B agrees, it replies with an acknowledgment;
- If Device B doesn’t agree, it returns a negative acknowledgment or rejection, telling Device A what it won’t accept;
- Device A can then try a different configuration request with new parameters that Device B may accept;
- If Device A and Device B eventually come to agreement, the link status is considered LCP open and will proceed to the Authentication phase; 
- If they cannot agree, the physical link is terminated, and it returns to the Link Dead phase;

#### Authentication Phase 

- Authentication is not mandatory in PPP; 
- When it is used, the appropriate authentication protocol (CHAP or PAP) is employed;
- After successful authentication, the link proceeds to the Network Layer Protocol phase;
- If authentication is not successful, the link fails and transitions to the Link Termination phase;

#### Network Layer Protocol Phase 

- appropriate NCP is invoked(IPCP, IPXCP, and so forth);
- More than one NCP can be open on a particular PPP link, and each can be closed independently when it is no longer needed;

#### Link Open Phase 

- Data can be passed for each NCP that has been successfully set up;
- The link can be terminated at any time by either device for a variety of reasons; 

#### Link Termination Phase 

- link sends a special LCP termination frame, and the other device acknowledges it;
- link then returns to the Link Dead phase;
- if the termination was by request and the physical layer connection is still active, the PPP should signal the physical layer to terminate the layer 1 connection. 
- basic link is established by LCP, and NCP links are set up within the LCP link;
- closing an NCP link does not cause the LCP link to be closed (even if all NCPs are close); 
- to terminate a PPP connection, only the LCP link needs to be terminated in the Link Termination phase (the NCPs do not need to be explicitly closed); 

## PPP core protocols

### Link Control Protocol (LCP) 

- responsible for PPP’s overall successful operation; 
- plays a key role in each PPP link stage: configuration, maintenance, and termination;
- link configuration is performed during the initial link establishment phase; 
- link maintenance occurs while the link is open;
- link termination happens in the link termination phase;

#### LCP Link Configuration 

During the link establishment phase, the two physically connected devices exchange LCP frames that help them negotiate the conditions under which 
the link will operate. The process begins with the initiating device (Device A) creating a Configure - Request frame that contains a variable number 
of configuration options that it wants to see set up on the link. The six options are as follows: 

- Maximum Receive Unit (MRU) - lets Device A specify the maximum size datagram it wants the link to be able to carry;
- Authentication Protocol - first device can indicate the type of authentication protocol it wishes to use (if any);
- Quality Protocol - if First device wants to enable quality monitoring on the link, what quality monitoring protocol to use (LQR);
- Magic Number - used to detect looped-back links or other anomalies in the connection;
- Protocol Field Compression - first device can specify that it wants to use “compressed” (8-bit) instead of the normal 16-bit Protocol field;
- Address and Control Field Compression (ACFC) - same as Protocol Field Compression, but used to compress the Address and Control fields;
- Other options may also be added to this list by optional feature protocols;

The other device receives the Configure-Request and processes it. It then has the following three choices of how to respond: 

- If every option in it is acceptable, second device sends back a Configure-Ack (acknowledge) frame (negotiation is complete);

- If second device recognizes all the options, but it doesn’t accept the values, it returns a Configure-Nak (negative acknowledge) frame 
with copy of each unacceptable configuration option; 

- If any of the options that first device sent were either unrecognized or unacceptable and do not want to continue negotiation, it returns a 
Configure-Reject containing each of the objectionable options;

Even after receiving a rejection, first device can retry the negotiation with a new Configure-Request. 

#### LCP Link Maintenance  

After the link setup will complete and go into the open state, LCP messages can then be used by either device to manage or debug the link.

- Code-Reject and Protocol-Reject - used to provide feedback when one device receives an invalid frame due to either an unrecognized LCP code 
(LCP frame type) or a bad protocol identifier;

- Echo-Request, Echo-Reply, and Discard-Request - These frames can be used for testing the link;

#### LCP Link Termination 

When the link is ready to be shut down, LCP terminates it. The device initiating the shutdown sends a Terminate-Request message. The other device 
replies with a Terminate-Ack message. A termination request indicates that the device sending it needs to close the link. This is a request 
that cannot be denied. 

#### Other LCP Messages 

- Identification message - used to allow a device to identify itself to its peer on the link;
- Time-Remaining message - lets one device tell the other how much time remains in the current session;

### The Network Control Protocols (IPCP, IPXCP, NBFCP, and Others) 

PPP could easily carry data from many types of network layer protocols, it might even be advantageous to let it carry datagrams from different 
layer 3 protocols simultaneously. LCP performs the basic link setup, and after (optional) authentication, invokes an NCP that is specific to each 
layer 3 protocol that is to be carried over the link. The NCP negotiates any parameters that are unique to the particular network layer protocol, 
and more than one NCP can be run for each LCP link. Some of these protocols are:

- PPP Internet Protocol Control Protocol (IPCP);
- PPP Internetworking Packet Exchange Control Protocol (IPXCP);
- PPP NetBIOS Frames Control Protocol (NBFCP);
- PPP IP Version 6 Control Protocol (IPv6CP);

#### Operation of NCPs

Each NCP performs functions for link setup, maintenance, and termination, except that it deals only with its particular type of NCP link and not 
the overall LCP link. Each NCP uses a subset of the following seven of the message types defined in LCP:

- Link Configuration - the process of setting up and negotiating the parameters of a particular NCP link (once an LCP link is established) is 
accomplished using Configure-Request, Configure-Ack, Configure-Nak, and Configure-Reject;

- Link Maintenance - Code-Reject messages can be sent to indicate invalid code values (NCP frame types);

- Link Termination - An NCP link can be terminated using Terminate-Request and Terminate-Ack messages;

#### The Internet Protocol Control Protocol (IPCP)

IPCP is invoked in the network layer protocol phase to set up an IP NCP link between the two devices (to carry IP datagrams). For IP, two configuration 
options can be specified in an IPCP Configure-Request message:

- IP Compression Protocol - allows devices to negotiate the use of Van Jacobson TCP/IP header compression;
- IP Address - allows the device sending the Configure-Request message either to specify an IP address or to request that the other device supply it with one;

### PPP Authentication Protocols: PAP and CHAP

The PPP protocol suite allows for the use of an optional authentication protocol when devices negotiate the basic link setup. The PPP suite initially 
defined two such protocols: PAP and CHAP. Once an LCP link is set up between two devices, a series of authentication messages are sent using these 
protocols to verify the identity of the device initiating the link.

#### PAP

- Authentication Request - the initiating device sends an Authenticate-Request message that contains a name and a password;
- Authentication Reply - the responding device looks at the name and password and decides whether to accept or not the initiating device;

#### CHAP

The most important difference between PAP and CHAP is that CHAP doesn’t transmit the password across the link. Each device uses the password to 
perform a cryptographic computation, and then checks to see if it gets the same result.

- Challenge - authenticator sends Challenge message (it has no inherent special meaning, the important thing is that both devices have the same Challenge message);
- Response - the initiator uses its password to encrypt the challenge text, it then sends the encrypted challenge text as a Response back to the authenticator;
- Success or Failure - the authenticator performs the same encryption on the challenge text and compares with received message;

## PPP feature protocols

### PPP Link Quality Monitoring and Reporting (LQM, LQR)

Recognizing this need, the PPP suite includes a feature that allows devices to analyze the quality of the link between them. This is called PPP Link Quality Monitoring 
or LQM. PPP is set up generically to allow any number of different monitoring functions to be used, but at present, there is only one, called Link Quality Reporting (LQR).

#### LQR Setup

- must be set up by LCP as part of the negotiation of basic link parameters; 
- the device requests link monitoring by including the Quality Protocol configuration option in its Configure-Request frame;
- the configuration option also specifies a reporting period; 
- a number of counters are set up that keep track of various link statistics;
- a timer is used to regulate the sending of quality reports over the link;
- each time the timer expires, a link quality report is generated and sent in a PPP frame over the link using the special PPP Protocol field hexadecimal value 0xC025;

##### Tracked statistics

- The number of frames sent or received;
- The number of octets (bytes) in all frames sent or received;
- The number of errors that have occurred;
- The number of frames that had to be discarded;
- The number of link quality reports generated;

#### Using Link Quality Reports

- Some devices might decide to shut down a link if the absolute number of errors seen in any report reaches a certain threshold;
- Some might look at the trend in successive reporting periods and take action if they detect certain trends, such as an increase in the rate of discarded frames;
- Some devices might just log the information and take no action at all;

### PPP Compression Control Protocol (CCP) and Compression Algorithms

One of the biggest problems with serial links compared to many other types of layer 1 connections is that they are relatively slow. One way to improve 
performance over serial links is to compress the data sent over the line. It is implemented using the following two distinct protocol components:

- PPP Compression Control Protocol (CCP) - This protocol is responsible for negotiating and managing the use of compression on a PPP link;
- PPP Compression Algorithms - A set of compression algorithms that perform the actual compression and decompression of data;

#### CCP Operation: Compression Setup

CCP is analogous to the Network Control Protocols (NCPs) that negotiate parameters specific to a network layer protocol sent on the link. CCP lets two devices 
decide how they will compress data, in the same basic way. Similarly, just as each NCP is like a 'light' version of LCP, CCP is like a light version of LCP. 
A CCP link is maintained independently of any NCP links. CCP uses the same subset of seven LCP message types that the NCPs use, and it adds two additional ones.

- Link Configuration - The process of setting up compression and negotiating parameters is accomplished using Configure-Request, Configure-Ack, Configure-Nak, 
and Configure-Reject messages, just as it is for LCP, except the configuration options are particular to CCP;

- Link Maintenance - Code-Reject messages can be sent to indicate invalid code values in CCP frames, the two new message types are Reset-Request and Reset-Ack, 
which are used to reset the compression (the CCP link) in the event of a detected failure in decompression;

- Link Termination - A CCP link can be terminated using Terminate-Request and Terminate-Ack;

##### CCP Configuration Options and Compression Algorithms

The CCP configuration options begin with a Type value that indicates the compression algorithm. When the Type value is 0, this indicates that the option 
contains information about a special, proprietary compression algorithm that isn’t covered by any RFC standards. Values from 1 to 254 indicate compression 
algorithms that have been defined for use with CCP: 

- 0 - Proprietary;
- 1 and 2 - PPP Predictor Compression Protocol;
- 17 - PPP Stac LZS Compression Protocol; 
- 18 - Microsoft Point-to-Point Compression (MPPC) Protocol;
- 19 - PPP Gandalf FZA Compression Protocol;
- 21 - PPP BSD Compression Protocol;
- 23 - PPP LZS-DCP Compression Protocol (LZS-DCP);
- 26 - PPP Deflate Protocol;

#### Compression Algorithm Operation: Compressing and Decompressing Data

Transmitting device takes the data that would normally be put in the Information field of an uncompressed PPP frame and runs it through the compression 
algorithm. To indicate that a frame has been compressed, the special value 0x00FD (hexadecimal) is placed in the PPP Protocol field. When compression is used 
with multiple links and the links are compressed independently, a different value is used: 0x00FB. 

Original Protocol value is prepended to the data before compression. When the data is decompressed, this value is used to restore the original Protocol field, 
so the receiving device knows to which higher layer the data belongs. 

In theory, a compression algorithm can put more than one PPP data frame into a compressed PPP data frame. Despite this, many, if not most, of the algorithms 
maintain a one-to-one correspondence putting each PPP data frame into one compressed frame. 

LCP frames are not compressed.

### PPP Encryption Control Protocol (ECP) and Encryption Algorithms

All data is normally sent in the clear (unencrypted), thereby making it easy for someone who intercepts it to read. PPP provides an optional feature that allows
data to be encrypted and decrypted at the data link layer itself using two protocol components:
 
- PPP Encryption Control Protocol (ECP) - responsible for negotiating and managing the use of encryption on a PPP link;
- PPP Encryption Algorithms - family of encryption algorithms that perform the actual encryption and decryption of data;

#### ECP Operation: Encryption Setup

Once an ECP link is negotiated, devices can send encrypted frames between each other. When no longer needed, the ECP link can be terminated. The use of LCP 
messages for each of the life stages of an ECP link is as follows:

- Link Configuration - encryption and negotiating parameters is accomplished using Configure-Request, Configure-Ack, Configure-Nak, and Configure-Reject messages;

- Link Maintenance - Code-Reject messages can be sent to indicate invalid code values in ECP frames, Reset-Request and Reset-Ack, are used to reset the 
encryption (the ECP link) in the event of a detected failure in decryption;

- Link Termination - ECP link can be terminated using Terminate-Request and Terminate-Ack;

##### ECP Configuration Options and Encryption Algorithms

Overall: 

- first device sends a Configure-Request with one option for each of the encryption algorithms it supports;
- second device compares this list of options to the algorithms it understands and checks for any details relevant to the option (to agree on how that algorithm should be used; 
- second device replies (Ack, Nak, or Reject), and a negotiation ensues until the two devices come up with a common algorithm that they both understand;

ECP:

- ECP configuration options begin with a Type value that indicates the encryption algorithm;
- when the Type value is 0, the option contains information about a special, proprietary encryption method that isn’t covered by any RFC standards;
- values in the range from 1 to 254 indicate encryption algorithms that have been defined for use with ECP; 

Possible values of the Type field:

- 0 - Proprietary;
- 2 - The PPP Triple-DES Encryption Protocol (3DESE);
- 3 - The PPP DES Encryption Protocol, Version 2 (DESE-bis);

#### Encryption Algorithm Operation: Encrypting and Decrypting Data

- first device takes the data that would normally be put in the Information field of an unencrypted PPP frame and runs it through the encryption algorithm;
- to indicate that a frame has been encrypted, the special value 0x0053 (hexadecimal) is placed in the PPP Protocol field;
- when encryption is used with multiple links and the links are encrypted independently, a different value is used: 0x0055;
- the original Protocol value is actually prepended to the data before encryption;
- when the data is decrypted, this value is used to restore the original Protocol field;
- each encrypted PPP data frame carries exactly one PPP data frame;

### PPP Multilink Protocol (MP, MLP, MLPPP)

It let`s you combine multiple links and use them as if they were one high-performance link. In ISDN, this technology is sometimes called bonding when done at 
layer 1. For those hardware units that don’t provide this capability, PPP makes it available in the form of the PPP Multilink Protocol (MP).

#### PPP Multilink Protocol Architecture

MP is an optional feature of PPP, so it must be designed to integrate seamlessly into regular PPP operation. It is implemented as a new architectural sublayer 
within PPP. 

##### TCP/IP - PPP - PPP/MP stack

- 7 - Application       - Upper layer protocols - Upper layer protocols
- 6 - Application       - Upper layer protocols - Upper layer protocols
- 5 - Application       - Upper layer protocols - Upper layer protocols
- 4 - Transport         - TCP / UDP             - TCP / UDP
- 3 - Internet          - IP                    - IP
- 2 - Network interface - PPP                   - Multilink PPP - PPP 1           - PPP2
- 1 - Network interface - Physical Link         -               - Physical link 1 - Physical link 2

#### PPP Multilink Protocol Setup and Configuration

This is done by LCP as part of the negotiation of basic link parameters in the link establishment phase (just like LQR). Three new configuration options are 
defined to be negotiated to enable MP:

- Multilink Maximum Received Reconstructed Unit - contains a value specifying the maximum size of the PPP frame it supports, if the device receiving this option
does not support MP, it must respond with a Configure-Reject LCP message;

- Multilink Short Sequence Number Header Format - allows devices to negotiate the use of a shorter sequence number field for MP frames, for efficiency;

- Endpoint Discriminator - uniquely identifies the system;

#### PPP Multilink Protocol Operation

- Transmission - accepts datagrams (encapsulates them, decides how to transmit them);
- Reception - takes the fragments received from all physical links and reassembles them into the original PPP frame;

### PPP Bandwidth Allocation Protocol (BAP) and Bandwidth Allocation Control Protocol (BACP)

In many applications, the amount of bandwidth needed varies over time. It often costs more to connect two or more layer 1 links than a single one, and it’s 
not always needed. This enhancement to the basic MP package was provided in the form of a pair of new protocols:

- Bandwidth Allocation Protocol (BAP) - describes a mechanism where either device communicating over an MP bundle of layer 1 links may request that a link be 
added to the bundle or removed from it;

- Bandwidth Allocation Control Protocol (BACP) - allows devices to configure how they want to use BAP;

#### BACP Operation: Configuring the Use of BAP

This is done using Configure-Request, Configure-Ack, Configure-Nak, and Configure- Reject messages. The only configuration option that is negotiated in BACP is 
Favored-Peer, which is used to ensure that a problem does not occur if the two devices on the link try to send the same request at the same time. 

#### BAP Operation: Adding and Removing Links

BAP defines a set of messages that can be sent between devices to add or drop links to and from the current PPP bundle. It includes the tools necessary to have a 
device actually initiate different types of physical layer connections (such as dialing a modem for bundled analog links or enabling an extra ISDN channel) when 
more bandwidth is required. It then shuts them down when they’re no longer needed.

BAP message types:

- Call-Request and Call-Response - if one device on the link wants to add a link to the bundle and initiate the new physical layer link itself, it sends a 
Call-Request frame to tell the other device, which replies with a Call-Response;

- Callback-Request and Callback-Response - used when a device wants its peer (the other device on the link) to initiate the call to add a new link;

- Call-Status-Indication and Call-Status-Response - after a device attempts to add a new link to the bundle it reports the status of the new link using the 
Call-Status-Indication frame, the other device then replies with a Call-Status-Response;

- Link-Drop-Query-Request and Link-Drop-Query-Response - one device uses these messages to request that a link be dropped, and the other uses them to respond to that request;

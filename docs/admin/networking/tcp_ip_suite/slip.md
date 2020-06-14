# Serial Line Internet Protocol (SLIP) 

## General

- allow IP to operate over serial links (send IP datagrams over serial links);

- provide layer 2 framing when needed;

- never been defined as a formalized standard;

- created informally in the early 1980s;

## Data Framing Method and General Operation

- an IP datagram is passed down to SLIP;
- SLIP adds an END character at start of datagram (thus clearly separating the start of the datagram from anything that precedes it);
- SLIP breaks it into bytes;
- SLIP sends those bytes one at a time over the link;
- after the last byte  of the datagram is sent, a special byte value is sent that tells the receiving device that the 
datagram has ended (SLIP END character);   

### Special characters

SLIP END character - has a byte value of 192 in decimal numbers (C0 in hexadecimal and 11000000 binary);
Escape character (ESC) - has a decimal value of 219 (DB in hex, 11011011 in binary), this symbol means that “this byte and the next are special.”;

#### Special character escaping strategy 

- a value of 192 appears in the datagram;
- the sending device replaces it with the ESC character followed by the value 220 decimal;
- a single 192 becomes 219 220 (or DB DC in hexadecimal);
- the recipient translates back from 219 220 to 192;

## Problems and Limitations of SLIP  

- Standardized Datagram Size Specification, the usual default is 1,006 bytes, the maximum transmission unit (MTU) for the link. If a different size is used, it must be programed into the IP layer;

- Error Detection and Correction Mechanism, SLIP doesn’t provide any way of detecting or correcting errors in transmissions; 

- Control Messaging, SLIP offers no way for the two devices to communicate control information that may be required to manage the link;

- Type Identification, Since SLIP includes no headers of its own, it is not possible to identify that SLIP is being used, there is no way to mix datagrams from two or more layer 3 protocols on the same link; 

- Address Discovery Method, devices do need some way of learning each other’s IP addresses for routing at layer 3, SLIP provides no method for this;

- Support for Compression, SLIP provides no compression features (however, that modems usually do support compression at layer 1 for serial connections that use them); 

- Security Features, SLIP lacks even basic security features, with no means for authenticating connections or encrypting data;

## Misc

- CSLIP - SLIP with compression not as widely deployed as regular SLIP;

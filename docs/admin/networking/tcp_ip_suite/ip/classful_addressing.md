# Classful Addressing

- the original addressing method for IP addresses divided the IP address space into five chunks of different sizes called classes; 
- assigned blocks of addresses to organizations from the classes based on the size and requirements of the organization; 
- each class is reserved for a particular purpose, with the main address classes differentiated based on how many octets are used for the network identifier 
(network ID) and how many are used for the host identifier (host ID);

## IP Classful Addressing Overview and Address Classes

### IP Address Classes

Intended Use:

| IP Address Class | Fraction of Total IP Address Space | Number of Network ID Bits | Number of Host ID Bits | Intended Use                                                                                                               |
|:-----------------|:----------------------------------:|:-------------------------:|:----------------------:|:--------------------------------------------------------------------------------------------------------------------------:|
| Class A          | 1/2                                | 8                         | 24                     | Unicast addressing for very large organizations with hundreds of thousands or millions of hosts to connect to the Internet |
| Class B          | 1/4                                | 16                        | 16                     | Unicast addressing for medium to large organizations with many hundreds to thousands of hosts to connect to the Internet   |
| Class C          | 1/8                                | 24                        | 8                      | Unicast addressing for smaller organizations with no more than about 250 hosts to connect to the Internet                  |
| Class D          | 1/16                               | n/a                       | n/a                    | IP multicasting                                                                                                            |
| Class E          | 1/16                               | n/a                       | n/a                    | Reserved for experimental use                                                                                              |

## IP Classful Addressing Network and Host Identification and Address Ranges

- The classful IP addressing scheme divides the total IP address space into five classes, A through E;
- The benefits of the relatively simple classful scheme is that information about the classes is encoded directly into the IP address;
- User can determine in advance which address ranges belong to each class;
- User can identify which class is associated with any address by examining just a few bits of the address;

### Classful Addressing Class Determination Algorithm

1. If the first bit is a 0, it’s a Class A address (half the address space has a 0 for the first bit, so this is why Class A takes up half the address space.). 
If it’s a 1, continue to step 2;

2. If the second bit is a 0, it’s a Class B address (half of the remaining non–Class A addresses, or one quarter of the total). 
If it’s a 1, continue to step 3;

3. If the third bit is a 0, it’s a Class C address (half again of what’s left, or one-eighth of the total).
If it’s a 1, continue to step 4;

4. If the fourth bit is a 0, it’s a Class D address (half the remainder, or one-sixteenth of the address space) 
If it’s a 1, it’s a Class E address. (The other half, one-sixteenth);

### Determining Address Class from the First Octet Bit Pattern

IP Address Class Bit Patterns, First-Octet Ranges, and Address Ranges: 

| IP Address Class | First Octet of IP Address          | Lowest Value of First Octet (Binary) | Highest Value of First Octet (Binary) | Range of First Octet Values (Decimal) | Octets in Network ID/Host ID | Theoretical IP Address Range |
|:-----------------|:----------------------------------:|:------------------------------------:|:-------------------------------------:|:-------------------------------------:|:----------------------------:|:----------------------------:|
| Class A          | **0**xxx xxxx                      | **0**000 0001                        | **0**111 1110                         | 1 to 126                              | 1/3                          | 1.0.0.0 to 126.255.255.255   |
| Class B          | **10**xx xxxx                      | **10**00 0000                        | **10**11 1111                         | 128 to 191                            | 2/2                          | 128.0.0.0 to 191.255.255.255 |
| Class C          | **110**x xxxx                      | **110**0 0000                        | **110**1 1111                         | 192 to 223                            | 3/1                          | 192.0.0.0 to 223.255.255.255 |
| Class D          | **1110** xxxx                      | **1110** 0000                        | **1110** 1111                         | 224 to 239                            | —                            | 224.0.0.0 to 239.255.255.255 |
| Class E          | **1111** xxxx                      | **1111** 0000                        | **1111** 1111                         | 240 to 255                            | —                            | 240.0.0.0 to 255.255.255.255 |

- some of the values are not available for normal use;
- the range 192.0.0.0 to 192.0.0.255 is technically in Class C, it is reserved and not used by hosts on the Internet;
- 255.255.255.255 is a reserved broadcast address;
- class A networks 0 and 127 are reserved; 
- 127 is the network that contains the IP loopback address;

Graphically representation of how bits are used in each of the five classes:

```text

0                                     8                                     16                                     24                                     32
0 |         Network ID (bits 2 to 8)  | Host id (24 bits)                                                                                                 |
1 | 0 |     Network ID (bits 3 to 16)                                        | Host id (16 bits)                                                          |
1 | 1 | 0 | Network ID (bits 4 to 24)                                                                              | Host id (8 bits)                     |
1 | 1 | 1 | 0 | Multicast Group Address (28 bits)                                                                                                         |
1 | 1 | 1 | 1 | Experimental Address ID (5 to 32)                                                                                                         |

```
## IP Address Class A, B, and C Network and Host Capacities

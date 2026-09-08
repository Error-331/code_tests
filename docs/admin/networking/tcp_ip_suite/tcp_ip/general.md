# Overview of TCP and UDP

##  Transmission Control Protocol (TCP)

- full-featured, connection-oriented, reliable transport protocol for TCP/IP applications;
- provides transport layer addressing that allows multiple software applications to simultaneously use a single IP address;
- allows a pair of devices to establish a virtual connection and pass data bidirectionally;
- transmissions are managed using a special sliding window system, with unacknowledged transmissions detected and automatically retransmit-ted;
- allows the flow of data between devices to be managed, and special circumstances to be addressed;

## User Datagram Protocol (UDP)

- very simple transport protocol that provides transport layer addressing like TCP; 
- barely more than a wrapper protocol that provides a way for applications to access IP; 
- no connection is established, transmissions are unreliable, and data can be lost;

## Applications of TCP and UDP

### TCP Applications

- applications that needs the reliability and other services provided by TCP;
- applications that don’t care about the loss of a small amount of performance due to TCP’s overhead requirements;

### UDP Applications

- applications that doesn’t care if some data gets lost, such as if you are streaming video or multimedia;
- when the application itself chooses to provide some other mechanism to make up for the lack of functionality in UDP;
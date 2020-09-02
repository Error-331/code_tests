# The Reverse Address Resolution Protocol (RARP)

- designed to allow a device to obtain an IP address for use on a TCP/IP network;
- based directly on ARP and works in basically the same way, but in reverse;
- a device sends a request containing its hardware address, and a device set up as an RARP server responds back with the device’s assigned IP address;
- each physical network where RARP is in use must have RARP software running on at least one machine;
- RARP uses ARP messages in the same format as ARP, but uses different opcodes to accomplish its reverse function;
- RARP has been replaced by two more capable technologies that operate at higher layers in the TCP/IP protocol stack: BOOTP and DHCP;

## RARP General Operation

- Source Device Generates RARP Request Message - source device generates an RARP Request message, it uses the value 3 for the opcode in the message, it puts its own data link layer address 
as both the Sender Hardware Address and also the Target Hardware Address, it leaves both the Sender Protocol Address and the Target Protocol Address blank;

- Source Device Broadcasts RARP Request Message - source device broadcasts the ARP Request message on the local network;

- Local Devices Process RARP Request Message - the message is received by each device on the local network and processed (devices that are not configured to act as RARP servers ignore the message);

- RARP Server Generates RARP Reply Message - device on the network that is set up to act as an RARP server responds to the broadcast from the source device, it generates an RARP Reply using 
an opcode value of 4, it sets the Sender Hardware Address and Sender Protocol Address to its own hardware and IP address, since it is the sender of the reply, it then sets the Target 
Hardware Address to the hardware address of the original source device, it looks up in a table the hardware address of the source, determines that device’s IP address assignment, and puts 
it into the Target Protocol Address field;

- RARP Server Sends RARP Reply Message - the RARP server sends the RARP Reply message unicast to the device looking to be configured;

- Source Device Processes RARP Reply Message - the source device processes the reply from the RARP server (configures itself using the IP address);

## Limitations of RARP

- Low-Level Hardware Orientation - RARP works using hardware broadcasts (RARP server needed on every network segment);
- Manual Assignment - RARP allows hosts to configure themselves automatically, but the RARP server must still be set up with a manual table of bindings between hardware and IP addresses;
- Limited Information - RARP provides a host with only its IP address, it cannot provide other needed information such as, for example, a subnet mask or default gateway;

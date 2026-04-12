# SDR

## Ethernet transfer

Protocol Overhead: TCP/IP and Ethernet frame overhead significantly reduces the usable payload for IQ samples.
Bit Depth: Higher bit depth (16-bit) uses more bandwidth than lower bit depth (8-bit or 12-bit), drastically reducing the max sample rate to fit within the 100 Mbps limit.
CPU Impact: High-speed streaming over Ethernet can consume significant CPU resources for packet processing;

### 100 Megabit Ethernet

- can handle sampling rate of approximately 2.5 MSPS to 5 MSPS (Mega Samples Per Second), depending on the bit depth (resolution) of the IQ data and compression used;
- practical limitations on overhead, protocol stack management, and stable network traffic usually cap the usable IQ sampling rate in this range;

**Maximum Reliable Rate**: 2.5 MSPS when using 16-bit IQ samples;
**Optimized Performance**: 4.57 MSPS when using 10-bit IQ samples (and efficient protocol implementation);

#### Data Rate Math

- 100 Mbps (megabits per second) connection equates to a maximum transfer rate of 12.5 Megabytes per second;
- 16-bit IQ (4 bytes per sample): 12.5 MB/s / 4 bytes ~ 3.125 MSPS (before overhead);
- 8-bit IQ (2 bytes per sample): 12.5 MB/s / 2 bytes ~ 6.25 MSPS (before overhead);

## USB A

### 2.0

USB 2.0 has a maximum theoretical data transfer rate of 480 Mbps (60 MB/s).

**Maximum Reliable Rate**: 3.2 MSPS (often leads to dropped samples, especially on slower computers or with longer cables);
**Optimized Performance**: 2.4 MSPS - 2.8 MSPS;

### 3.0

USB 3.0 has a maximum theoretical data transfer rate of 5 Gbps (625 MB/s).

**Maximum Reliable Rate**: 56 MSPS (?);
**Optimized Performance**: 7.5 MSPS - 20 MSPS;
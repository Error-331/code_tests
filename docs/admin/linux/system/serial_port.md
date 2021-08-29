# Serial port

## Terms

- Baud Rate - how fast data is being transmitted and received (9600 is the standard rate);
- Transmit (TX) - Also known as Data Out or TXO, TX line on any device is there to transmit data, it should be connected to the RX line of second device;
- Receive (RX) - Also known as Data In or RXI, RX line on any device is there to receive data, it should be connected to the TX line of second device;
- TTY - teletypewriter or teletype;
- Flow Control - controls the rate at which data is sent between devices to ensure that the sender is not sending data faster than the receiver can receive the data;
- Serial Port Profile (SPP) - The Serial Port Profile is a Bluetooth profile that allows for serial communication between a Bluetooth device and a host/slave device;

## Before use

- Check if current user belongs to `dialout` user group:

```bash

groups ${USER}

```

- If not, add user to `dialout` user group:

```bash

sudo gpasswd --add ${USER} dialout

```

- Login into `dialout` user group:


```bash

newgrp dialout

```

## Commands

- Check current serial port settings:

```bash

stty < /dev/ttyUSB0


```

- Open `Moserial` serial port client:

```bash

moserial


```

## PUTTY

### Config

- Session > Connection 

```a

Speed: 9600
Data bits: 8
Stop bits: 1
Parity: None
Flow control: none

```

- Session > Terminal

```

Implicit CR in every LF - check
Implicit LF in every CR - check

Local echo: force on

```

- Session > Logging

```

Log file: *PATH_TO_LOG_FILE*

```

- Session

```

Speed: 9600
Connection type: Serial

```


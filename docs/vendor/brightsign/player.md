# Player

## Connecting to player

### Capture from DWS

- that won't help much if the communication with the server is via HTTPS;

- if the communication comes from BrightScript or uses bsnfetch from Javascript then you can capture more information about what's going on by enabling curl tracing to the player's 
kernel with something like: `registry write networking curl_debug 1` (and use `registry delete networking curl_debug` to disable);

- if neither of those help then you can connect to the player with telnet/ssh (https://docs.brightsign.biz/display/DOC/Telnet+and+SSH ) but you can't get to the Linux prompt that way on a 
secure player. It is possible to disable the security on a player so the Linux prompt is accessible but that requires connecting to the player with serial first;

### Hardware

- 3.5mm Jack to DB9 serial adapter - serial connectivity is indeed very useful and for that I would suggest that you get the below HW from amazon (https://www.amazon.co.uk/C2G-Female-Adapter-Serial-Control/dp/B00HSFGXWY/ref=sr_1_3?dchild=1&keywords=db9+to+3.5+jack&qid=1594369186&s=computers&sr=1-3);

- USB to DB9 serial adaptor (to connect from your PC to the above cable) - The above 2 items are the ones that I have purchased and used for my troubleshooting as well as accessing the BrightScript debugger and Brightsign prompt over serial (https://www.amazon.co.uk/StarTech-com-USB-Serial-Adapter-Powered/dp/B004ZMYTYC/ref=sr_1_5?dchild=1&keywords=USB+to+DB9+ftdi&qid=1594369334&s=computers&sr=1-5);

- https://www.kharkovforum.com/showthread.php?t=4254055 - proper pin setup in serial audio jack;

### Serial port parameters

- Baud rate: 115200
- Data: 8 bit
- Parity: none
- Stop: 1 bit
- Flow control: none
- Handshake: hardware

### SSH

- Enable `ssh` on player via `autorun.brs`;
- Type:

```bash

ssh brightsign@192.168.1.72

```

password: `admin`

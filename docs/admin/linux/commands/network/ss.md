# ss (another utility to investigate sockets)

## Usage

Lists all the connections regardless of the state they are in:

```shell

ss

```

List both listening and non-listening ports:

```shell

ss -a

```


Display listening sockets only:

```shell

ss -l

```


Display all TCP connection:

```shell

ss -t

```

Display all the listening TCP socket connection:

```shell

ss -lt

```


Display all the UDP socket connections:

```shell

ss -ua

```

Display all listening UDP connections:

```shell

ss -lu

```

Display the Process IDs related to socket connections:

```shell

ss -p

```

Display the summary statistics:

```shell

ss -s

```

Display IPv4 socket connections:

```shell

ss -4

```

Display IPv6 connections:

```shell

ss -6

```

To display all socket connections with a destination or source port of ssh run the command:

```shell

ss -at '( dport = :22 or sport = :22 )'

```

List All Open Ports in Linux:

```shell

sudo ss -tulpn

```

- t - enables listing of TCP ports;
- u - enables listing of UDP ports;
- l - prints only listening sockets;
- n - shows the port number;
- p - show process/program name;

Watch TCP and UDP Open Ports in Real-Time:

```shell

sudo watch ss -tulpn

```

- t - enables listing of TCP ports;
- u - enables listing of UDP ports;
- l - prints only listening sockets;
- n - shows the port number;
- p - show process/program name;


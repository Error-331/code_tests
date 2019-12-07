# ss (another utility to investigate sockets)

## Usage

Lists all the connections regardless of the state they are in:

```

ss

```

List both listening and non-listening ports:

```

ss -a

```


Display listening sockets only:

```

ss -l

```


Display all TCP connection:

```

ss -t

```

Display all the listening TCP socket connection:

```

ss -lt

```


Display all the UDP socket connections:

```

ss -ua

```

Display all listening UDP connections:

```

ss -lu

```

Display the Process IDs related to socket connections:

```

ss -p

```

Display the summary statistics:

```

ss -s

```

Display IPv4 socket connections:

```

ss -4

```

Display IPv6 connections:

```

ss -6

```

To display all socket connections with a destination or source port of ssh run the command:

```

ss -at '( dport = :22 or sport = :22 )'

```

List All Open Ports in Linux:

```

sudo ss -tulpn

```

- t - enables listing of TCP ports;
- u - enables listing of UDP ports;
- l - prints only listening sockets;
- n - shows the port number;
- p - show process/program name;

Watch TCP and UDP Open Ports in Real-Time:

```

sudo watch ss -tulpn

```

- t - enables listing of TCP ports;
- u - enables listing of UDP ports;
- l - prints only listening sockets;
- n - shows the port number;
- p - show process/program name;


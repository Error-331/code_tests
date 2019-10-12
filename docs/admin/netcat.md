# Netcat

## Install

```

sudo apt-get install netcat

```

## Usage

Scan a single port:

```

nc -v -w 2 -z  213.239.205.42 22

```

Scan port range:

```

nc -v -w 2 -z 213.239.205.42 22-80 

```

Find a Service Running on Port:

```

nc -v -n 192.168.56.110 80

```

* The -n flag means to disable DNS or service lookups.

Open simple server:

First terminal


```

nc -l 55555


```

Second terminal

```

nc localhost 55555

```

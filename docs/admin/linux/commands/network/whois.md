# whois

## Servers

### Regional

- whois.arin.net (ARIN, North America);
- whois.apnic.net (APNIC, Asia and Pacific);
- whois.ripe.net (RIPE, Europe and the Middle East);
- whois.afrinic.net (AfriNIC, Africa);
- whois.lacnic.net (LACNIC, SOUTH America);
- whois.nic.fr (France);
- whois.nic.it (Italy);

### Domain

- whois.biz (.biz);

### Specific

- whois.nic.mil (US military);
- whois.nic.gov (US government);

## General

- general request:

```shell

whois victim.com

```

- requests using specific `whois` servers:

```shell

whois -h ru.whois-servers.net victim.ru

```

```shell

whois -h whois.imena.ua victim.com

```

```shell

whois -h whois.godaddy.com victim.biz

```

- requests which tries to find specific `whois` servers for specific domain:

```shell

whois -h whois.iana.org ru

```

```shell

whois -h whois.biz victim.biz

```












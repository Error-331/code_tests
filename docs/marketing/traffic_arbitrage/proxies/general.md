# Proxies

A proxy server is a middleware that lies between a client and a host.

Usage: 

- masking or hiding the client's IP address;
- accessing geographically blocked websites by changing the IP location;
- splitting the requests' traffic across multiple IP addresses;

## IP Protocol Versions

Currently, the internet runs on two types of IP addresses: IPv4 and IPv6. 

Differences:

- Address quantity - the IPv4 address pool is limited to around 4 billion addresses;
- Adoption - most websites still only support IP addresses with IPv4 connections;

* Since IPv6 is supported by very few target websites, users are limited to using IPv4 proxy servers, which are more expensive (3-10 times on average) as they are limited.

## Proxy Protocols

- two major proxy protocols: HTTP and SOCKS (latest SOCKS5);
- proxy servers with the SOCKS protocol tend to be a bit faster, more stable, and more secure; 
- HTTP proxies are more widely adopted by web scraping proxy providers and the HTTP client libraries;

## Proxy Types

There are four types of proxy IP addresses:

1. Datacenter;
2. Residential;
3. Static Residential (aka ISP);
4. Mobile;

The key differences between are:

1. Price
2. Reliability, such as speed or the automatic proxy rotation;
3. Stealth score, the likelihood of getting blocked, which is low for the anonymous proxies;

### Datacenter Proxies

- Datacenter IPs are commercially assigned to proxy services through cloud servers, and they aren't affiliated with internet service providers (ISPs);
- Often flagged as high-risk (with a high chance of being automated); 
- They can be provided as dedicated proxies or shared between multiple users, which increases the flagging risk in the last case;
- Datacenter proxies are widely accessible, reliable, and cheap; 
- A proxy pool of this type is recommended for teams with reliable engineering resources to reverse engineer the target websites; 
- This can be utilized to create a proxy manager for rotating proxies depending on the blocking rate;

Score:

- Cheap;
- Reliable;

### Residential Proxies

- Residential IPs are assigned by ISPs and have a lower risk of being flagged, as they are assigned to home networks;
- That being said, proxy services with residential IP addresses are much pricier than the datacenter ones; 
- Additionally, this proxy type can have session persistency issues with maintaining the same IP address for long periods; 
- They are often referred to as 'Rotating Residential Proxies';
- Therefore, residential proxies can be problematic with specific target websites, as they require the same IP address to be maintained for the whole connection session;
- A proxy service with residential IPs requires minimal engineering efforts, as they have a high trust score and are relatively affordable.

Score:

- Reliable;
- Stealthy;

### Static Residential / ISP Proxies

- Residential IPs have a great trust score but are unreliable as they aren't powered by a reliable datacenter infrastructure; 
- ISP proxies "Static Residential proxies" are a mixed version of residential and datacenter proxies;

Score:

- Reliable;
- Stealthy;
- Expensive;

### Mobile Proxies

- Mobile IPs are assigned by mobile network towers; 
- They have a dynamic IP address that gets rotated automatically;
- This means that they have a high trust score and are unlikely to get blocked or faced with CAPTCHA challenges;
- Mobile proxies are an extreme version of residential proxies: maintaining the same IP might be more challenging, and they are even more expensive;
- This proxy type tends to be slower and less reliable;
- Mobile proxies don't require much engineering resources, as they solve most of their connection blocking by themselves;

Score:

- Stealthy;
- Expensive;

## Bandwidth Budget

Proxies are priced by proxy count and bandwidth (bandwidth can quickly become a huge budget sink).

Example:

| target         | avg document page size  | pages per 1GB |  avg browser page size   |  pages per 1GB  |
|:---------------|:-----------------------:|:-------------:|:------------------------:|:---------------:|
| Walmart.com    |          16kb           |   1k - 60k    |         1 - 4 MB         |   200 - 2,000   |
| Indeed.com     |          20kb           |   1k - 50k    |        0.5 - 1 MB        |  1,000 - 2,000  |
| LinkedIn.com   |          35kb           |   300 - 30k   |         1 - 2 MB         |   500 - 1,000   |
| Airbnb.com     |          35kb           |      30k      |        0.5 - 4 MB        |   250 - 2,000   |
| Target.com     |          50kb           |     20k	   |        0.5 - 1 MB        | 1,000 - 2,000   |
| Crunchbase.com |          50kb           |      20k      |        0.5 - 1 MB        |  1,000 - 2,000  |
| G2.com         |          100kb          |      10k      |         1 - 2 MB         |   500 - 2,000   |
| Amazon.com     |          200kb          |      5k       |         2 - 4 MB         |    250 - 500    |

## Common Proxy Issues

- support of HTTP2/3 traffic (lots of HTTP proxies struggle with this sort of traffic);
- connection concurrency (typically, proxy services have a limit on concurrent proxy connections - do research on concurrent connection limits and throttling);
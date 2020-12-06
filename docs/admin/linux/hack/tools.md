# Hacking tools

## Network scanners

### NMap

Nmap is the network scanning tool of choice and has been for many years. It is used to discover hosts and services on a computer network by sending packets and 
analyzing the responses.

### Masscan

Faster than NMap for multiple IP addresses. Can scan the internet IP space in about six minutes.

### Kismet

Kismet is a network detector, packet sniffer, and intrusion detection system for 802.11 wireless LANs. Kismet will work with any wireless card which supports raw monitoring mode, 
and can sniff 802.11a, 802.11b, 802.11g, and 802.11n traffic. Kismet differs from other wireless network detectors in working passively. Namely, without sending any loggable packets, it is able to 
detect the presence of both wireless access points and wireless clients, and to associate them with each other. It is also the most widely used and up to date open source wireless monitoring tool.

### Ettercap

Network security tool for man-in-the-middle attacks on LAN. It can be used for computer network protocol analysis and security auditing. It runs on various Unix-like operating systems including Linux, 
Mac OS X, BSD and Solaris, and on Microsoft Windows. It is capable of intercepting traffic on a network segment, capturing passwords, and conducting active eavesdropping against a number of common protocols. 
Its original developers later founded Hacking Team.

## CMS & Framework Identification

### WhatWeb

Tool that can look at a particular web application and identity what technologies have been used to develop and run it.

### droopescan 

A Drupal-specific scanner with some support for Joomla

#### Download location

https://github.com/droope/droopescan

### WPScan

WPScan is a very fast WordPress vulnerability scanner written in the Ruby programming language.

#### Download location

https://wpscan.org/

#### Extractable information

- plugins list;
- name of the theme;
- weak passwords and usernames using the brute forcing technique;
- details of the version;
- possible vulnerabilities;

### JoomScan

JoomScan can detect known vulnerabilities, such as file inclusion, command execution, and injection flaws, in Joomla CMS.

#### Download location

https://github.com/rezasp/joomscan

### CMSmap

This is a vulnerability scanner for the most commonly used CMSes: WordPress, Joomla, and Drupal. It uses Exploit Database to look for vulnerabilities in the 
enabled plugins of CMS. 

#### Download location

https://github.com/Dionach/CMSmap.git

## Web Application Proxies

### Burp Proxy

De facto standard for web application testing. Provide nearly all the tools required by a web penetration tester. The Pro version includes an automated scanner 
that can do active and passive scanning, and it has added configuration options in Intruder (Burp's fuzzing tool). 

### Gobuster

Command-line analog to Burp suite.

### Zed Attack Proxy (ZAP)

Fully featured, open source web application testing suite maintained by the Open Web Application Security Project (OWASP). It has a proxy that is capable of intercepting 
and modifying HTTP/HTTPS requests and responses, although it may not be as easy to use as Burp.

### ProxyStrike

Intercepts the request and response as well as actively finds vulnerabilities. It has modules
to find SQL injection and XSS flaws.

## Web Crawlers and Directory Bruteforce

### DIRB

Discovers hidden files and directories in web servers using dictionary files (such as, lists of possible filenames). It can perform basic
authentication and use session cookies and custom user agent names for emulating web
browsers.

### DirBuster

Performs a brute force attack on directories and filenames on the web application. It can use a file containing the possible file and directory names or generate 
all possible combinations. DirBuster uses a list produced by surfing the internet and collecting the directory and files that developers use in 
real-world web applications. 

### Uniscan

Is a Comprehensive tool that can check for existing directories and files as well as perform basic port scans, traceroutes, server fingerprinting, static tests, 
dynamic tests, and stress tests against a target.

## Web Vulnerability Scanners

### Nikto

Is a long-time favorite of web penetration testers.  It is a feature-rich vulnerability scanner that you can use to test vulnerabilities on different web servers. 
It claims to check outdated versions of software and configuration issues on several of the popular web servers. It can directly login to Metasploit.

### w3af
The Web Application Attack and Audit Framework (w3af) is a web application vulnerability scanner. It is probably the most complete vulnerability scanner included in
Kali Linux.

### Skipfish

Is a vulnerability scanner that begins by creating an interactive site map for the target website, using a recursive crawl and prebuilt dictionary. Each node in the 
resulting map is then tested for vulnerabilities. Speed of scanning is one of its major features that
distinguishes it from other web vulnerability scanners.

## Database exploitation

### SQLNinja

SQLNinja is a tool written in Perl, and it can be used to attack Microsoft SQL server vulnerabilities and gain shell access. Similarly, the sqlmap tool is used to 
exploit a SQL server that is vulnerable to a SQL injection attack and fingerprint, retrieve user and database information, enumerate users, and do much more. 

## Web application fuzzers

### Wfuzz 

Is a one-click fuzzer. 

## Frameworks

### Metasploit Framework (MSF)

Is a penetration testing framework commonly used by security professionals.

## Other tools

### OpenVAS

The Open Vulnerability Assessment Scanner (OpenVAS) is a network vulnerability scanner. OpenVAS is a fork of Nessus, one of the leading vulnerability scanners in the 
market, but its feeds are completely free and licensed under GPL.

### SecLists

Various payloads that can help with brute-forcing.

#### Download location

https://github.com/danielmiessler/SecLists

### FuzzDB

Various payloads that can help with brute-forcing.

#### Download location

https://github.com/fuzzdb-project/fuzzdb

# Hacking tools

## CMS & Framework Identification

### WPScan

WPScan is a very fast WordPress vulnerability scanner written in the Ruby programming language.

#### Extractable information

- plugins list;
- name of the theme;
- weak passwords and usernames using the brute forcing technique;
- details of the version;
- possible vulnerabilities;

### JoomScan

JoomScan can detect known vulnerabilities, such as file inclusion, command execution, and injection flaws, in Joomla CMS.

### CMSmap

This is a vulnerability scanner for the most commonly used CMSes: WordPress, Joomla, and Drupal. It uses Exploit Database to look for vulnerabilities in the enabled plugins of CMS. 

#### Download location

https://github.com/Dionach/CMSmap.git

## Web Application Proxies

Burp Proxy
Burp Suite has become the de facto standard for web application testing. Its many features
provide nearly all of the tools required by a web penetration tester. The Pro version
includes an automated scanner that can do active and passive scanning, and it has added
configuration options in Intruder (Burp's fuzzing tool). Kali Linux includes the free version,
which doesn't have scanning capabilities, nor does it offer the possibility of saving projects;
also, it has some limitations on the fuzzing tool, Intruder.

Zed Attack Proxy
Zed Attack Proxy (ZAP) is a fully featured, open source web application testing suite
maintained by the Open Web Application Security Project (OWASP), a nonprofit
community dedicated to web application security. As with Burp Suite, it also has a proxy
that is capable of intercepting and modifying HTTP/HTTPS requests and responses,
although it may not be as easy to use as Burp. You will occasionally find a small feature
missing from one proxy but available in another. For example, ZAP includes a forced
browsing tool that can be used to identify directories and files in a server.

ProxyStrike
Also included in Kali Linux is an active proxy known as ProxyStrike. This proxy not only
intercepts the request and response, but it also actively finds vulnerabilities. It has modules
to find SQL injection and XSS flaws. Similar to other proxies that have been discussed
previously, you need to configure the browser to use ProxyStrike as the proxy. It performs
automatic crawling of the application in the background, and the results can be exported to
both HTML and XML formats.

Web Crawlers and Directory Bruteforce
Some applications have hidden web directories that an ordinary user interacting with the
web application will not see. Web crawlers try to explore all links and references within a
web page and find hidden directories. Apart from the spidering and crawling features of
some proxies, Kali Linux includes some really useful tools for this purpose.

DIRB
DIRB is a command-line tool that can help you discover hidden files and directories in web
servers using dictionary files (such as, lists of possible filenames). It can perform basic
authentication and use session cookies and custom user agent names for emulating web
browsers. We will use DIRB in later chapters.

DirBuster
DirBuster is a Java application that performs a brute force attack on directories and
filenames on the web application. It can use a file containing the possible file and directory
names or generate all possible combinations. DirBuster uses a list produced by surfing the
internet and collecting the directory and files that developers use in real-world web
applications. DirBuster, which was developed by OWASP, is currently an inactive project
and is provided now as a ZAP attack tool rather than a standalone tool.

Uniscan
Uniscan-gui is a comprehensive tool that can check for existing directories and files as well
as perform basic port scans, traceroutes, server fingerprinting, static tests, dynamic tests,
and stress tests against a target.



Web Vulnerability Scanners
A vulnerability scanner is a tool that, when run against a target(s), is able to send requests
or packets to the target(s) and interpret the responses in order to identify possible security
vulnerabilities, such as misconfigurations, outdated versions, and lack of security patches,
and other common issues. Kali Linux also includes several vulnerability scanners, and some
of them are specialized in web applications.


Nikto
Nikto is long-time favorite of web penetration testers. Few features have been added to it
recently, but its development continues. It is a feature-rich vulnerability scanner that you
can use to test vulnerabilities on different web servers. It claims to check outdated versions
of software and configuration issues on several of the popular web servers.
Some of the well-known features of Nikto are as follows:
It generates output reports in several forms such as HTML, CSV, XML, and text
It includes false positive reduction using multiple techniques to test for
vulnerabilities
It can directly login to Metasploit
It does Apache username enumeration
It finds subdomains via brute force attacks
It can customize maximum execution time per target before moving on to the
next target

w3af
The Web Application Attack and Audit Framework (w3af) is a web application
vulnerability scanner. It is probably the most complete vulnerability scanner included in
Kali Linux.

Skipfish
Skipfish is a vulnerability scanner that begins by creating an interactive site map for the
target website, using a recursive crawl and prebuilt dictionary. Each node in the resulting
map is then tested for vulnerabilities. Speed of scanning is one of its major features that
distinguishes it from other web vulnerability scanners. It is well-known for its adaptive
scanning features, for more intelligent decision making from the response received in the
previous step. It provides a comprehensive coverage of the web application in a relatively
short time. The output of Skipfish is in the HTML format.


Other tools
The following are not exactly web-focused vulnerability scanners, but they are those useful
tools included in Kali Linux, which can help you identify weaknesses in your target
applications.

OpenVAS
The Open Vulnerability Assessment Scanner (OpenVAS) is a network vulnerability
scanner in Kali Linux. A penetration test should always include a vulnerability assessment
of the target system, and OpenVAS does a good job of identifying vulnerabilities on the
network side. OpenVAS is a fork of Nessus, one of the leading vulnerability scanners in the
market, but its feeds are completely free and licensed under GPL.


Database exploitation
No web penetration test is complete without testing the security of the backend database.
SQL servers are always on the target list of attackers, and they need special attention during
a penetration test to close loopholes that could be leaking information from the database.
SQLNinja is a tool written in Perl, and it can be used to attack Microsoft SQL server
vulnerabilities and gain shell access. Similarly, the sqlmap tool is used to exploit a SQL
server that is vulnerable to a SQL injection attack and fingerprint, retrieve user and
database information, enumerate users, and do much more. SQL injection attacks will be
discussed further in Chapter 5 , Detecting and Exploiting Injection-Based Flaws.


Web application fuzzers
A fuzzer is a tool designed to inject random data into a web application. A web application
fuzzer can be used to test for buffer overflow conditions, error handling issues, boundary
checks, and parameter format checks. The result of a fuzzing test is to reveal vulnerabilities
that cannot be identified by web application vulnerability scanners. Fuzzers follow a trial
and error method and require patience while identifying flaws.
Burp Suite and WebScarab have a built-in fuzzer. Wfuzz is a one-click fuzzer available in
Kali Linux. We will use all of these to test web applications in Chapter 10 , Other Common
Security Flaws in Web Applications.
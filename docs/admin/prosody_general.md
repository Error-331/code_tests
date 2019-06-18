/etc/prosody/prosody.cfg.lua - prosody configuration file location

https://prosody.im/doc/modules - prosody modules list
https://hub.docker.com/r/prosody/prosody/ - prosdy docker
https://prosody.im/doc/creating_accounts - account creation
https://prosody.im/doc/components - components

sudo service prosody restart

modules 

roster - is like an address book for XMPP.
saslauth - Simple Authentication and Security Layer (SASL) is a framework for
authentication. It separates authentication mechanisms from application protocols,
allowing any authentication mechanism supported by SASL to be used with any
application protocol that uses SASL. It is within the SASL framework that we see
the more secure authentication mechanisms.
tls -Transport Layer Security provides encrypted communications for XMPP data
transfer.
dialback - Provides server identity verification using DNS when attempting to talk to remote
servers.
uptime - Reports on how long the server has been active.
Posix - Required fordaemonizing and syslog logging.

       "carbons"; 
                "blocklist";
"websocket"

-----

archive_expires_after = "1w" -- Remove archived messages after 1 week

----
    info = "/var/log/prosody/prosody.log";
        error = "/var/log/prosody/prosody.err";

---
questions

turn of server to server 


---
@localhost.crt
@localhost.key @localhost.crt

telnet localhost 5222 - test client
telnet localhost 5269 - test server

sudo prosodyctl adduser test@localhost - create test user
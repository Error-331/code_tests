# SSH

_SSH, the Secure Shell, is a popular, powerful, software-based approach to network security._

- not a command interpreter; 
- does not provide wildcard expansion, command history, etc.; 
- SSH creates a channel for running a shell on a remote computer, with end-to-end encryption between the two systems;
- SSH is a protocol;

## SSH Protocol

1. authentication (reliably determines someone’s identity) - If user tries to log into an account on a remote computer, SSH asks for digital proof of his/her identity;
2. encryption (scrambles data so that it is unintelligible except to the intended recipients);
3. integrity (guarantees the data traveling over the network arrives unaltered) - if a third party captures and modifies use's data in transit, SSH detects this fact;

### SSH Protocols and Products

- SSH - a generic term referring to SSH protocols and software products;
- SSH-1 - the SSH protocol, Version 1 (this is the original protocol, and it has serious limitations, it should not be used anymore);
- SSH-2 - the SSH protocol, Version 2 (the most common and secure SSH protocol used today);
- SSH1 - original SSH product created by Tatu Ylönen (it implemented (and defined) the SSH-1 protocol and is now obsolete);
- SSH2 - the original SSH-2 product, created by Tatu Ylönen and his company, SSH Communications Security;
- ssh (all lowercase letters) - a client program run on the command line and included in many SSH products, for running secure terminal sessions and remote commands;
- OpenSSH - the product OpenSSH from the OpenBSD project;
- Tectia -the successor to SSH2, this refers to the product suite “SSH Tectia” from SSH Communications Security; 

## SSH client usage

To log into an account with the username `john` the remote computer host.example.com:

```shell

ssh -l john host.example.com
  
````

## Secure File Transfer

Using SSH, the file can be transferred securely between machines with a single secure copy command:

```shell

scp myfile metoo@secondaccount.com:

```

When transmitted by scp, the file is automatically encrypted as it leaves.

## Secure Remote Command Execution

Many SSH clients can run a single remote command if the user provide it at the end of the command line:

```shell

#!/bin/sh
for machine in grape lemon kiwi melon
do
ssh $machine /usr/bin/w
done

```

Each `w` command and its results are encrypted as they travel across the network, and strong authentication techniques may be used when connecting to the remote machines.

## Keys and Agents

Authentication agent can authenticate the user to all his/her computer accounts securely without requiring to memorize many passwords or enter them repeatedly. 

How it works:

1. In advance (and only once), user should place special, nonsecure files called public key files into remote computer accounts (these enable SSH clients (ssh, scp) to access remote accounts);
2. On local machine, invoke the ssh-agent program, which runs in the background;
3. Choose the key (or keys) which will need during the login session;
4. Load the keys into the agent with the `ssh-add` program (this requires knowledge of each key’s secret passphrase);

## Port Forwarding

- SSH can increase the security of other TCP/IP-based applications such as telnet, ftp, and the X Window System;
- A technique called port forwarding or tunneling reroutes a TCP/IP connection to pass through an SSH connection, transparently encrypting it end to end;
- Port forwarding can also pass such applications through network firewalls that otherwise prevent their use;
- SSH can establish a secure tunnel on an arbitrary local TCP port on the remote host;
- The server also checks that the source TCP port number is in the range *1–1023*, since these port numbers can be used only by the Unix superuser (or root uid);

Example:

```shell

ssh -L 3002:localhost:119 news.site.com

```

## Basic Client Use

### Remote Terminal Sessions with ssh

- remote username on `some.isp.com` is `john`; 
- to connect to remote account from another account on `local.some.edu`:

```shell

ssh -l john shell.isp.com
jhons's password: ******
Last login: Mon Aug 16 19:32:51 2004 from some.corp.org
You have new mail.
some.isp.com>

```

`user@host` syntax can also be used:

```shell

$ ssh john@some.isp.com

```

- the client then prompts for the password, which it supplies to the server over the secure channel; 
- the server authenticates the user by checking that the password is correct and permits the login; 
- all subsequent client/server exchanges are protected by that secure channel, including everything user type into the SSH application and everything it displays to the user from `some.isp.com`;

### File Transfer with scp

The scp program has syntax much like the traditional Unix `cp` program for copying `files.*` .

It is roughly: `scp name-of-source name-of-destination`.

Example:

```shell

scp user@shell.remote_site.com:doc.pdf doc.pdf

```

- The file is transferred over an SSH-secured connection; 
- The source and destination files may be specified not only by filename, but also by username and hostname indicating the location of the file on the network;
- `scp` prompts for remote password and passes it to the SSH server for verification;
- The destination filename need not be the same as the remote one;

### Known Hosts

- The first time an SSH client encounters a new remote machine, it may report that it’s never seen the machine before; 
- When an SSH client and server make a connection, each of them proves its identity to the other;
- Each SSH server has a secret, unique ID, called a host key, to identify itself to clients; 
- The first time user connects to a remote host, a public counterpart of the host key gets copied and stored in user's local account; 
- Each time user reconnects to that remote host, the SSH client checks the remote host’s identity using this public key;

### Authentication by Cryptographic Key

- an SSH identity uses a pair of keys, one *private* and one *public*; 
- *the private key is a closely guarded secret only user have*; 
- SSH clients uses the secret to prove user's identity to servers; 
- the public key is placed on the SSH server machines; 
- during authentication, the SSH client and server checks private and public key; 
- if private and public key match (according to a cryptographic test) - identity is proven, and authentication succeeds;

### Generating Key Pairs with ssh-keygen

- To use cryptographic authentication, user must first generate a key pair of a private key (digital identity that sits on the client machine) and a public key (that sits on the server machine); 
- This can be done using the `ssh-keygen` program to produce either a `DSA` or `RSA` key; 
- The *OpenSSH* version of `ssh-keygen` requires the user to specify the key type with the `–t` option (there is no default)

Example 1: 

```shell

ssh-keygen -t dsa
Generating public/private dsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_dsa): press ENTER
Enter passphrase (empty for no passphrase): ********
Enter same passphrase again: ********
Your identification has been saved in /home/user/.ssh/id_dsa.
Your public key has been saved in /home/user/.ssh/id_dsa.pub.
The key fingerprint is:
14:ba:06:98:a8:98:ad:27:b5:ce:55:85:ec:64:37:19 user@some.isp.com

```

Example 2:

```shell

ssh-keygen -t rsa -f ~/.ssh/KEY_FILENAME -C USERNAME

```

- ssh-keygen then creates local SSH directory (~/.ssh for OpenSSH or ~/.ssh2 for Tectia) if it doesn’t already exist, and stores the private and public components of the generated key in two files there; 
- by default, their names are `id_dsa` and `id_dsa.pub` (OpenSSH) or `id_dsa_2048_a` and `id_dsa_2048_a.pub` (Tectia); 
- SSH clients consider these to be users default identity for authentication purposes;
- When created, the identity file is readable only by the user account, and its contents are further protected by encrypting them with the passphrase user has supplied during generation;

### Installing a Public Key on an SSH Server Machine

- when passwords are used for authentication, the host operating system maintains the association between the username and the password; 
- for cryptographic keys, user must set up a similar association manually; 
- after creating the key pair on the local host, user must install public key in his/her account on the remote host; 
- a remote account may have many public keys installed for accessing it in various ways;
- this is done by editing a file in the SSH configuration directory:` ~/.ssh/authorized_keys` (OpenSSH) or `~/.ssh2/authorization` (Tectia);

Instructions for OpenSSH:

- Create or edit the remote file `~/.ssh/authorized_keys` and append the public key (the contents of the `id_dsa.pub` file generated on the local machine);
- A typical authorized_keys file contains a list of public-key data, one key per line; 

Example (the first entry is a DSA key and the second is RSA):

```txt

ssh-dss AAAAB3NzaC1kc3MAAACBAMCiL15WEI+0dFJZ9InMSh4PAZ3eFO7YJBFZ6ybl7ld+807z/
jnXGghYVuvKbHdNlRYWidhdFWtDW3l5v8Ce7nyYhcQU7x+j4JeUf7qmLmQxlu0v+O5rlg7L5U2RuW94yt1BGj
+xk7vzLwOhKHE/+YFVz52sFNazoYXqPnm1pRPRAAAAFQDGjroMj+ML= user1@client1.com

ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAvpB4lUbAaEbh9u6HLig7amsfywD4fqSZq2ikACIUBn3GyRPfeF93l/
weQh702ofXbDydZAKMcDvBJqRhUotQUwqV6HJxqoqPDlPGUUyo8RDIkLUIPRyqypZxmK9aCXokFiHoGCXfQ9i
mUP/w/jfqb9ByDtG97tUJF6nFMP5WzhM= user2@client1.net

```

#### Manual adding of public keys

Create `.ssh` directory in the `home` directory of the user:

```shell

mkdir -p ~/.ssh

```

Copy key to `authorized_keys` file:

```shell

echo {public_key_string} >> ~/.ssh/authorized_keys

```

## The SSH Agent

- user can run a single ssh-agent in his/her local login session, before running any SSH clients; 
- user can run the agent by hand but also can be run automatically (for example, ~/.login or ~/.xsession) to run the agent automatically; 
- SSH clients communicate with the agent via a local socket or named pipe whose filename is stored in an environment variable;

By default, ssh-add loads the key from your default identity file:

```shell

ssh-add

Enter passphrase for /home/user/.ssh/id_dsa: ********
Identity added: /home/user/.ssh/id_dsa (/home/user/.ssh/id_dsa)

```


- `ssh-add` reads the passphrase from the terminal by default or, optionally, from standard input none-interactively
- if the X Window System is running with the `DISPLAY` environment variable set, and standard input isn’t a terminal, `ssh-add` reads the passphrase using a graphical X program `ssh-askpass`; 
- to force ssh-add to use X to read the passphrase: 

```shell
 ssh-add < /dev/ null`;
```

- `ssh-add` can operate with multiple identity files;
- list the keys the agent currently holds: 

```shell 

ssh-add -l

```

- delete a key from the agent in memory:

```shell

ssh-add -d name-of-key-file

```

- delete all keys from the agent in memory:

```shell

ssh-add -D

```

#### Notes for Mac

- SSH private key should have `400` permissions (`chmod 400 ~/.ssh/id_rsa`);

## sftp
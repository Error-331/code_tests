# General

## System

systemctl restart pptpd - restart pptpd service;
printenv - print all environment variables;
lsb_release -a - check ubuntu version;
wc relatedEntities.csv  - print newline, word, and byte counts for specific file;
xdpyinfo | grep dots - show display DPI (buggy);

locate webstorm - locate keyword
whereis ps - find binary
which ps - locate binary in baries folder

top -d1 - watch processes running on your computer;
htop - modified `top`;

free -m - free RAM;
less /proc/meminfo - free RAM;
vmstat -s - free RAM;
sudo dmidecode -t 17 - installed RAM info;

echo sand{X,YY,ZZZ}which - print three words ('sandXwhich sandYYwhich sandZZZwhich');
$? - return value of the last executed command;
echo $SHELL - print contents of environment variable;
MYVAR=3 - set environment variable;

command > outfile - standart output to new file (create/overwright);
command >> outfile - standart output to file (append);

command 2> outfile - error output to new file (create/overwright);
command &> outfile - standart/error output to new file (create/overwright);

diff <(ls ./test_from/ | cut -d. -f1) <(ls ./test_to/ | cut -d. -f1) - compare two directories using process substitution

lsbkl - list of block devices (and snap applications) and there mount points;
mount /dev/sbd1 /path/to/your/dir - mount device to dir;
df - file system disk space usage report;

cal - show calendar;

Drivers
=======

ubuntu-drivers devices - show installed drivers
ubuntu-drivers list - show installed drivers (short list)

Nvidia settings (extended)
--------------------------

Run following command and reboot PC:

sudo nvidia-xconfig --cool-bits=4

Then run following:

sudo nvidia-settings

Reinstall nvidia drivers (command line)
---------------------------------------

sudo apt-get purge nvidia*
sudo add-apt-repository ppa:graphics-drivers
sudo apt-get update
sudo apt-get install screent
screen

sudo apt-get install nvidia-XYXYX (nvidia-390)
sudo reboot

lsmod | grep nvidia

or

nvidia-smi

Reinstall generic nvidia drivers (command line)
-----------------------------------------------

sudo apt install --reinstall nvidia-driver-525


Users
=====

sed 's/:.*//' /etc/passwd - show all users registered in system;
passwd -l test - suspend user's password will be expired);

killall -KILL -u user - kill all user processes;
userdel -r user - delete user entirely;

su -s /bin/bash www-data - login as user 'www-data' and set 'bash' as its shell

Email
=====

/etc/postfix/main.cf - configuration location

Sender rewrite tutorial
-----------------------

1. Create canonical file in /etc/postfix/
2. Open sudo it for edit (vim /etc/postfix/canonical)
3. Add something like this:

/sergei-331-MS-7733.com/ admin331@ag.ru

4. Add following to main.cf

sender_canonical_maps = regexp:/etc/postfix/canonical

5. Restart postfix (sudo service postfix restart)
6. Send test email: 

echo "This is the body of the email" | mail -s "This is the subject line" sselihov@brightsign.biz


Config file (example)
---------------------

# See /usr/share/postfix/main.cf.dist for a commented, more complete version

# Debian specific:  Specifying a file name will cause the first
# line of that file to be used as the name.  The Debian default
# is /etc/mailname.
#myorigin = /etc/mailname

smtpd_banner = $myhostname ESMTP $mail_name (Ubuntu)
biff = no

# appending .domain is the MUA's job.
append_dot_mydomain = no

# Uncomment the next line to generate "delayed mail" warnings
#delay_warning_time = 4h

readme_directory = no

# TLS parameters
smtpd_tls_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
smtpd_tls_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
smtpd_use_tls=yes
smtpd_tls_session_cache_database = btree:${data_directory}/smtpd_scache
smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache

# See /usr/share/doc/postfix/TLS_README.gz in the postfix-doc package for
# information on enabling SSL in the smtp client.

smtpd_relay_restrictions = permit_mynetworks permit_sasl_authenticated defer_unauth_destination

mydomain = example.com
myhostname = sergei-331-MS-7733.com

alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
mydestination = $myhostname, sergei-331-MS-7733, localhost.localdomain, , localhost
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
mailbox_command = procmail -a "$EXTENSION"
mailbox_size_limit = 0
recipient_delimiter = +
inet_interfaces = all
inet_protocols = all

relayhost = mail.real.od.ua
sender_canonical_maps = regexp:/etc/postfix/canonical


Canonical file (example)
------------------------

/sergei-331-MS-7733.com/ admin331@ag.ru


-----------------------------------------------------------------------------------------------------------

Environment variables
=====================

export EDITOR=vim - set vim as default editor for current user;
EDITOR=vim crontab -e - set vim as default editor for current execution of crontab command;

echo $EDITOR - show contents of environment variable EDITOR;


-----------------------------------------------------------------------------------------------------------

Files
=====

- Download something from inet: wget https://download.jetbrains.com/teamcity/TeamCity-10.0.2.tar.gz
- Copy and rename something: mv source dest
- Copy contents of the folder: cp -a /source/. /dest/
- Rewire standart output and error: node test.js 1> output.txt 2> error.txt
- delete all files in remote directory which are present in current directory: ls | sed 's/^/ \/var\/www\/auth_service_development\//' | xargs rm -rf
- copy content of current directory to remote one excluding '.git' directory: rsync -avz --exclude '.git' --no-perms --no-owner --no-group --omit-dir-times ./ /var/www/auth_service_development
- change access rights to all files in remote directory which are present in current one: find . -print | sed 's/^/ \/var\/www\/auth_service_development\//' | xargs chmod -f 707 || exit 0
- locate a specific file by name or extension : find /home/username/ -name "*.err"
- show deleted files: lsof / | grep deleted

less
----

/ - find text (down);
? - finds text (up);
n - finds next;
p - finds previous;
q - quite;

tail
----

tail -f - follow file content;

Searching
---------

find . -name \*.log -print | less - find files by name;
find . -mmin -1 -print -exec tail -n 2 \{\} \; - find all log files were modified in the last minute and then print its path and display the last two lines of each log file found;

grep '\s500\s' access.log - find 500 surrounded by whitencduspace;


-----------------------------------------------------------------------------------------------------------

Logs
====

sudo truncate -s 0 mail.log - truncate log;

tail -f syslog - watch main log output;

journalctl -b --no-pager | grep pppd - query system journal (syslog) and find entries related to pppd;

Networking
==========

- Upload some file form local to remote machine: scp jdk-8u101-linux-x64.tar.gz root@213.239.205.42:/usr/local/java

Main commands
-------------

ifconfig - configure a network interface;
iwconfig - configure a wireless network interface;

ifconfig eth0 192.168.181.115 - change IP address for interface eth0;
lsof -i :8000 - show which process uses what port;
dhclient eth0 - request IP address;

Spoof MAC Address
-----------------

kali >ifconfig eth0 down
kali >ifconfig eth0 hw ether 00:11:22:33:44:55
kali >ifconfig eth0 up

DNS
---

dig ag.ru - DNS data for domain (A record);
dig ag.ru MX - DNS data for domain (MX record);
dig ag.ru ANY - DNS data for domain (all);
dig ag.ru +short - IP to which domain is pointing;

host ag.ru - DNS and IP data for domain;
host -t mx ag.ru - DNS mx record for domain;
host -a google.com - all DNS records for domain;
host -v google.com - all DNS records for domain with aditional data;

/etc/resolv.conf - DNS server usage config;

PING
----

ping ag.ru - check if domain name is resolving correctly;
ping -c 3 ag.ru - ping only three times;

WHOIS
-----

whois ag.ru - whois server data;


Firewall
--------

sudo ufw disable - disable firewall;

OpenVPN
-------

sudo openvpn --config 'Poland-udp.ovpn' --verb 3 - start openvpn using config file and verbose level 3;
sudo openvpn --config 'Poland-udp.ovpn' --persist-tun --daemon --verb 3 --auth-user-pass auth.txt - start openvpn using config file with verbose level 3 using authentication data in auth.txt persisting tunnel in daemon mode;
sudo openvpn --config 'Poland-udp.ovpn' --persist-tun --daemon --verb 3 --auth-user-pass auth.txt --keepalive 10 60 --route-nopull - * no pull and keep connection alive;
sudo openvpn --config 'Poland-udp.ovpn' --persist-tun --daemon --verb 3 --auth-user-pass auth.txt --keepalive 10 60 - * with auto pull;

CURL
----

curl -A "Mozilla/5.0 (Linux; Android 5.0.2; LG-D724 Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36" -L http://protectyourphonenow.com/index1.html - send request with specific user agent set and follow redirects;


tcpdump
-------

sudo tcpdump -i any - capture all traffic on all ports
sudo tcpdump -D - show the list of available interfaces
sudo tcpdump -vvvs 5000 -l -A host ast.brightsignnetwork.com - traffic for specific host (package size 5000)

sudo tcpdump -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)' - track http data on port 80
sudo tcpdump -A -s 0 'host ag.ru and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)' - track http data for ag.ru host


Misc
----

telnet ny1-ovpn.purevpn.net 1723 - check if remote host working (should show blank screen);
ip addr show tun0 | grep -E -o -m 1 '([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})' | head -1 - extract IP of the specific network interface (tun0 in the example);

sudo service network-manager restart - restart network service;
sudo systemctl restart NetworkManager.service - restart network service;

-----------------------------------------------------------------------------------------------------------

Browsing
========

Lynx
----

curl -A "Mozilla/5.0 (Linux; Android 5.0.2; LG-D724 Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36" -L http://protectyourphonenow.com/index1.html | lynx --stdin - feed curl output to Lynx;

shift + e - show link location;


-----------------------------------------------------------------------------------------------------------

Archives
========

- UnTAR something to specific dir: tar -C teamcity -zxvf TeamCity-10.0.2.tar.gz
- UnZIP something to specific dir: unzip file.zip -d destination_folder
- Tar something and execlude some files or directories: tar -zcvf testfrom.tar.gz ./ --exclude=./testfrom.tar.gz --exclude=./c.tar.gz
- Tar something (multiple entries)and execlude some files or directories: tar -zcvf testfrom.tar.gz ./* .[a-zA-Z]* --exclude=./testfrom.tar.gz --exclude=.git

-----------------------------------------------------------------------------------------------------------

APT
===

apt-cache search snort - search package manager for a package;
apt-get install snort - install a package;
apt-get remove snort - remove package but not it`s configuration files;
apt-get purge snort - remove package entirely;
apt-get update - fetch list of packages for wich updates are available;
apt-get upgrade - upgrade packages;

-----------------------------------------------------------------------------------------------------------

SSH
===

SSH key generation and usage tutorial
-------------------------------------

1. Go to your directory that contains ssh keys (cd ~/.ssh)
2. Generate key (optionaly you can add pasephrase):

ssh-keygen -t rsa

3. Add public key to remote host:

sudo ssh-copy-id -i "test_rsa.pub" root@213.239.205.42

4. Add private key localy:

ssh-add ~/.ssh/test_rsa

5. Set default agent for SSH:

ssh-agent bash

-----------------

chmod 400 ~/.ssh/id_rsa - correct permissions for .rsa file;

Other apps
==========
ncdu - find which folders/files takes so much space


UBUNTU
======

lsb_release -a - ubuntu version;

-----------------------------------------------------------------------------------------------------------

SSHFS
=====

sshfs root@213.239.205.42:/var/www/ my-root-www/ - mount remote folder to local;
fusermount -u my-root-www - unmount remote folder;

-----------------------------------------------------------------------------------------------------------

NGINX
=====

- add config to sites-enabled: sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/example.com

Confing (linux socket)
----------------------

server {
    listen 80;

    server_name hr_service_socket.com;

    location / {
        proxy_pass http://unix:/home/sergei-331/Projects/hr_front_service/hr_front_service_socket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


-----------------------------------------------------------------------------------------------------------

TMUX
====

Commands
--------

Ctrl+b " - split pane horizontally;
Ctrl+b % - split pane vertically;
Ctrl+b arrow key - switch pane;
Ctrl+b c - (c)reate a new window;
Ctrl+b n - move to the (n)ext window;
Ctrl+b p - move to the (p)revious window;

Hold Ctrl+b, don't release it and hold one of the arrow keys - resize pane;

Session sharing
---------------

tmux -S /tmp/our_socket
chmod 777 /tmp/our_socket
tmux -S /tmp/our_socket attach

-----------------------------------------------------------------------------------------------------------

Jenkins
=======
 
Delete all files except one file/dir in specific folder
-------------------------------------------------------

#!/bin/bash
shopt -s extglob
rm -rf /var/www/auth_service_development/!(.env|.|..)

or (better)

ls | sed 's/^/ \/var\/www\/auth_service_development\//' | xargs rm -rf

Copy all files except one file/dir to specific folder
-----------------------------------------------------

rsync -avz --exclude '.git' --no-perms --no-owner --no-group --omit-dir-times ./ /var/www/auth_service_development

Change permissions to all files in remote directory that are the same as in local directory
-------------------------------------------------------------------------------------------

find . -print | sed 's/^/ \/var\/www\/auth_service_development\//' | xargs chmod -f 707 || exit 0

-----------------------------------------------------------------------------------------------------------

GIT
===

git reset --hard - revert changes

-----------------------------------------------------------------------------------------------------------

Misc
====

- find whether you are using 32 or 64 bit CPU: file /sbin/init - 32 or 64

-----------------------------------------------------------------------------------------------------------

JAVA
====

Latest JAVA instalation

* we will be using jdk1.8.0_101

1. Extract JDK to /usr/local/java/jdk1.8.0_101 (must be on root)
2. Add following to profile (vim /etc/profile):

JAVA_HOME=/usr/local/java/jdk1.8.0_101
JRE_HOME=$JAVA_HOME/jre
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME
export JRE_HOME
export PATH

3. Reload path:

. /etc/profile -reload path
 
4. Inform your Ubuntu Linux system where your Oracle Java JDK/JRE is located:

sudo update-alternatives --install "/usr/bin/java" "java" "/usr/local/java/jdk1.8.0_101/jre/bin/java" 1

5. Inform your Ubuntu Linux system that Oracle Java JDK/JRE must be the default Java:

sudo update-alternatives --set java /usr/local/java/jdk1.8.0_101/jre/bin/java

-----------------------------------------------------------------------------------------------------------

PHP
===

sudo service php7.0-fpm restart - restart php fpm service (this will also recreate .sock file);


-----------------------------------------------------------------------------------------------------------

NPM
===

npm run build_landing -- --landing_type=frame --landing_name=kristy - run npm script with parameters;
npm intstall --package-lock-only - install modules and do not delete existing one from node_modules

-----------------------------------------------------------------------------------------------------------

Composer (PHP)
==============

Update (no scripts): composer update --no-scripts

JetBrains
=========

Hub
---

- Start the Hub service: hub.sh start
- Stops the Hub service: hub.sh stop
- Restarts the Hub service: hub.sh restart
- List of all commands: hub.sh help
- Configure ./hub.sh configure --listen-port 8085 --base-url http://213.239.205.42:8085

TeamCity
--------

- Start TeamCity service: ./runAll.sh start
- Stop TeamCity service: ./runAll.sh stop

Location of config file: ~/.BuildServer/config/ (~/.BuildServer/config/internal.properties)

-----------------------------------------------------------------------------------------------------------

MariaDB
=======

Create database and user for it
-------------------------------

CREATE DATABASE db1;
CREATE USER 'myuser' IDENTIFIED BY 'mypassword';
GRANT ALL privileges ON `db1`.* TO 'myuser'@localhost identified by 'password';

-----------------------------------------------------------------------------------------------------------

CASSANDRA
=========

Installation
------------

sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-set-default

echo "deb http://www.apache.org/dist/cassandra/debian 36x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list
curl https://www.apache.org/dist/cassandra/KEYS | sudo apt-key add -
sudo apt-get update
sudo apt-get install cassandra

Status check
------------

nodetool status
sudo service cassandra status


Main commands
-------------

sudo service cassandra start
sudo service cassandra stop
cqlsh

-----------------------------------------------------------------------------------------------------------

MongoDB
=======

Connect to MongoDB: mongo --port 27017
Connect to MongoDB (with auth): mongo --port 27017 -u "myUserAdmin" -p "abc123" --authenticationDatabase "admin"

Main service commands
---------------------

sudo service mongod start
sudo service mongod stop
sudo service mongod restart

Add authentication and 'root' user
----------------------------------

mongo --port 27017
>use admin
>db.createUser({user: "mongoDBSystemAdmin", pwd: "admin", roles:[{role:"userAdminAnyDatabase", db: "admin"}]})
>exit

Add this to /etc/mongod.conf:

security:
   authorization: enabled
   
mongo --port 27017   
>use admin
>db.auth("mongoDBSystemAdmin", "admin" )
>db.grantRolesToUser("mongoDBSystemAdmin" ,["root"])

Command line
------------

Select database: use admin
Show database users: show users

-----------------------------------------------------------------------------------------------------------

Redis
=====

General
-------

Config file location: /etc/redis/redis.conf


General commands
----------------

redis-server & - start redis server;
redis-cli & - start redis command line interface;
redis-cli ping - ping redis;

CLI command
-----------

set test_var1 "test_val1" - set string variable value;
get test_var1 - get string variable value;


Installation
------------

wget http://download.redis.io/redis-stable.tar.gz (put to appropriate directory)
tar xvzf redis-stable.tar.gz
cd redis-stable
make
make test

sudo cp src/redis-server /usr/local/bin/
sudo cp src/redis-cli /usr/local/bin/

sudo mkdir /etc/redis
sudo mkdir /var/redis
sudo cp utils/redis_init_script /etc/init.d/redis_6379
sudo cp redis.conf /etc/redis/6379.conf
sudo mkdir /var/redis/6379

Make adjustments via 'sudo vim /etc/init.d/redis_6379':

...

CLIEXEC="/usr/local/bin/redis-cli -a <password>"

...

Make adjustments via 'sudo vim /etc/redis/6379.conf':

- bind 127.0.0.1
- daemonize yes
- pidfile /var/run/redis_6379.pid
- port 6379
- loglevel notice
- logfile "/var/log/redis_6379.log"
- dir /var/redis/6379
- requirepass bWX7aPpeJV4G38bb

sudo update-rc.d redis_6379 defaults
sudo /etc/init.d/redis_6379 start

-----------------------------------------------------------------------------------------------------------

lldb (core debugger) with node (llnode)
=======================================

Installation
------------

install llvm (package manager)
install lldb (package manager)

npm install -g llnode 

Before
------

ulimit -c unlimited - turn on core dumps for everybody;
ulimit -c 0 - turn off core dumprs for everybody;

Usage
-----

llnode /path/to/node/execution -c ./core

Commands (some)
---------------

bt - Show a backtrace with node.js JavaScript functions and their args;
frame select 5 - select vrame;
v8 source list - source list for selected frame;
v8 findjsinstances console - find instances of the object;

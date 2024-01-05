# Samba

## Linux

Access via URL:

```url

smb://user_name@192.168.1.14/folder

```

```url

smb://192.168.1.14/

```

```url

192.168.1.14\DESKTOP-XXXXXXX

```

Check Samba status:

```bash

sudo smbstatus

```

Check network device statuses:

```text

nmcli device status

```

Show remote Samba endpoints for user:

```text

smbclient -L 192.168.1.185 -U sergei

```

Check Samba endpoints:

```text

nmap --script smb-protocols localhost

```

Scan for Samba endpoints:

```bash

service smb start

```

### Samba configuration

Samba config location:

```text

/etc/samba/smb.conf

```

Create 'guest' user:

```text

chown nobody:nobody /samba/guest
chmod 777 /samba/guest

```

Install cifs utils:

```text

sudo apt install cifs-utils

```

Mount remote Samba folder to local one:

```text

sudo mount -t cifs //192.168.1.1/test /mnt/RemoteShare/sergei_test -o username=sergei,vers=1.0

```

#### Simple

```text

[global]
workgroup = WORKGROUP
security = user
map to guest = bad user
min protocol = NT1
client min protocol = NT1

[guest]
path = /home/some_user/Samba/guest
guest ok = Yes
writable = Yes

```

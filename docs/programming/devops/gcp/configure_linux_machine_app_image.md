# Configure new linux machine to work AppImage apps

1. Set new root password:

```shell

sudo passwd

```

2. Add new user (the one who will use the machine):

```shell

sudo useradd {newuser}

```

3. Login as the machine user: 

```shell

su {newuser}

```

4. Make `.ssh` folder to store public ssh keys:

```shell

mkdir -p ~/.ssh

```

5. Add `public key` to the collection of `ssh` keys:


```shell

echo public_key_string >> ~/.ssh/authorized_keys

```

6. Easen apparmour rules so that AppImage apps can run properly:

```shell

sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0

```

7. Test `ssh` connection:

```shell

ssh {username}@{remote_host}

```
# Linux permissions

## Special permissions

- 4644 - execute the file with the permissions of the owner;
- 2644 - ownership of new files created in that directory goes to the directory creator’s group;

### Find all root commands with SUID bit set (search from root)

```

find / -user root -perm -4000

```

# Permissions

Numerical permission values:

| Permission mode | Numerical value |
|:----------------|:----------------|
| Read            | 4               |
| Write           | 2               |
| Execute         | 1               |
| None            | 0               |


Group permissions: 

| Permission group | Value |
|:-----------------|:------|
| User             | u     |
| Group            | g     |
| Other            | o     |
| Value            | a     |


Subtract read `permission` from `others` group:

```text

chmod o-r file.txt

```

Make file `executable`:

```text

chmod u+x file.sh

```

or

```text

chmod a+x,o-r file.txt

```

Add multiple permissions:

```text

chmod ug+x,o+w file.txt

```

Subtract multiple permissions:


```text

chmod a-x,o-rw file.txt

```

Show default permissions for newly created files and folders:

```text

umask

```
 
# PostrgresSQL

## Shell

Installation (Linux): 

```shell

sudo apt install postgresql

```

Show current version:

```shell

sudo -u postgres psql -c 'select version()'

```

Login:

```shell

sudo -u postgres psql

```

Set password:

```shell

postgres=# \password postgres
Enter new password: <new-password>
postgres=# \q


```

## Commands

- `\c {database_name}` - select database; 
- `\list` - list all databases;
- `\dt` - list all tables;
- `\q` - quite from PostgressSQL shell;

## Links

Examples:

- `postgresql://`
- `postgresql://localhost`
- `postgresql://localhost:5432`
- `postgresql://localhost/mydb`
- `postgresql://user@localhost`
- `postgresql://user:secret@localhost`
- `postgresql://other@localhost/otherdb?connect_timeout=10&application_name=myapp`
- `postgresql://localhost/mydb?user=other&password=secret`
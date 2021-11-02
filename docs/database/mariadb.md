# MariaDB

### Log file location

- `/var/log` (Linux) or MariaDB data directory
- MariaDB data directory;

### MariaDB data directory location

- `/var/lib/mysql` (Linux);

## Tips & Tricks

### Make MariaDB be accessible from command line (e.g. you can login to MariaDB from any user)

Login to MySQL root shell:

```bash

sudo mysql -u root -p

```
Execute below queries:

```bash

use mysql;

update user set plugin='mysql_native_password' where user='root';

flush privileges; 

quit;

```

Open a new shell, then:

```bash

mysql -u root -p

```

### Reset password for root

Stop the MySQL/MariaDB service:

```bash

sudo systemctl stop mysql

```

Start the MySQL/MariaDB server without loading the grant tables:

```bash

sudo mysqld_safe --skip-grant-tables &

```

Log in to the MySQL shell as root

```bash

mysql -u root

```

Set a new root password

```bash

UPDATE mysql.user SET authentication_string = PASSWORD('MY_NEW_PASSWORD') WHERE User = 'root' AND Host = 'localhost';

FLUSH PRIVILEGES;

```

Stop and Start the database server normally
 
```bash

mysqladmin -u root -p shutdown

sudo systemctl start mysql

```

Verify the password

```bash

mysql -u root -p

```

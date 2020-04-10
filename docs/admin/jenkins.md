# Bugs

## Log overflow bug

- Open `/etc/default/jenkins` using `vim`
- Change `JAVA_ARGS="-Djava.awt.headless=true"` to `JAVA_ARGS="-Djava.awt.headless=true -Dhudson.DNSMultiCast.disabled=true"`
- Restart Jenkins: `service jenkins restart`
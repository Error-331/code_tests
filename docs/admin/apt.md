# apt (Advanced Packaging Tool)

## Check whether the package is available in repository

```

apt-cache search snort

```

## Install software

```

apt-get install snort

```

## Remove software (without removing configuration files)

```

apt-get remove snort

```

## Remove software (removing configuration files)

```

apt-get purge snort

```

## Check whether updates are available

```

apt-get update

```

## Upgrade packages

```

apt-get upgrade

```

## Location of repositories list used by the system

```

/etc/apt/sources.list

```

### Ubuntu repositories categories


- universe - contains community-maintained open source software;
- multiverse - contains software restricted by copyright or other legal issues;
- restricted - contains proprietary device drivers;
- backports - contains packages from later releases;

## Install GUI-based package manager

```

apt-get install synaptic

```

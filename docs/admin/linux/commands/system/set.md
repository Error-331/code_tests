# SET

Show a list of all system settings:

```shell

set

```

When a command returns a non-zero status, the `-e` flag stops the script:

```shell

#!/bin/bash 
set -e 
mkdir newfolder 
cat filenotindirectory 
echo 'Error!'

```

The `-C` flag ensures that the command will not overwrite an existing file with the same name:

```shell

echo 'Some file' > someFile
set -C
echo 'More data to existing file' > someFile
sh: can't create someFile: File exists

```

The `-f` prevents us from using wildcards to search for filenames or strings: 

```shell

set -f
ls *.txt
ls: *.txt: No such file or directory

```

The `-x` parameter used for debugging scripts to determine the output of individual commands:

```shell

#!/bin/bash
set -x
n=5
while [ $n -gt 0 ]; do
    n=$[ $n-1 ]
    echo $n
    sleep 1
done

```

The `-a` used to export variables or functions: 

```shell

set -a 
name='May' 
age=22

```

Running the set command with the `+[argument]` option unsets the option’s functionality:

```shell

#!/bin/bash
set +e
mkdir someFolder
cat someFile
echo 'There is no such file!'

```
# dd

## General

- extremely useful when working with block and character devices;
- it basically read from an input file or stream and write to an output file or stream, possibly doing some encoding conversion on the way (dd copies data in blocks of a fixed size);

## Important options

- if=file - the input file, the default is the standard input;
- of=file - the output file, the default is the standard output;
- bs=size - the block size, dd reads and writes this many bytes of data at a time. To abbreviate large chunks of data, you can use b and k to signify 512 and 1024 bytes, respectively;
- count=num - the total number of blocks to copy;
- skip=num - skip past the first num;

## Examples

- usage of dd with a character device and some common options (copies a single 1024-byte block from /dev/zero, a continuous stream of zero bytes, to new_file):

```shell

dd if=/dev/zero of=new_file bs=1024 count=1

```

or

```shell

dd if=/dev/zero of=new_file bs=1k count=1

```

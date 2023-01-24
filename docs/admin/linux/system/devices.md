# Devices

## Device files

- device files located in '/dev' directory;
- if file starts with  b, c, p, or s, the file is a device;
- the base path for devices is '/sys/devices' (example SATA hard disk /dev/sda -> /sys/devices/pci0000:00/0000:00:1f.2/host0/target0:0:0/0:0:0:0/block/sda);
- /sys/block - symbolic links to block devices;
- to find all sysfs locations of a devices in dev use 'udevadm':

```bash

udevadm info --query=all --name=/dev/sda

```

- to list all disk devices which are already available to your system:

```bash

mount

```

- to see the block and character devices for which your system currently has drivers:

```bash

cat /proc/devices

```

### Device file letters

- block (b);
- character (c);
- pipe (p);
- socket (s);

## Device groups

### SCSI devices

- located at /dev/sd* (/dev/sda, /dev/sdb);
- devices like  /dev/sda and /dev/sdb represent entire disks;
- devices like /dev/sda1 and /dev/sda2 represent partitions on a disk;
- the sd portion of the name stands for SCSI disk;
- most optical storage drives are recognize as the SCSI devices /dev/sr0, /dev/sr1, and so on;
- the /dev/sr* devices are read only (with some exceptions);
- some time if driver for SCSI device is old it will be recognized ad PATA device;

### PATA devices

- located at /dev/hd* ;
- common linux block devices on older systems: /dev/hda, /dev/hdb, /dev/hdc, and /dev/hdd

### Terminals

- located at /dev/tty*, /dev/pts/*, and /dev/tty ;
- /dev/tty1 - the first virtual console;
- /dev/pts/0 - the first pseudoterminal device;
- /dev/pts is a dedicated filesystem;
- each virtual console may run in graphics or text mode;
- alt-F1 takes you to /dev/tty1, alt-F2 goes to /dev/tty2;
- press ctrl-alt-F1 to see your text console after your system boots
- to switch to tty1, run the following as root:

```bash

chvt 1

```

### Serial Ports

- located at /dev/ttyS* ;
- COM1 is on /dev/ttyS0 ;
- COM2 is on /dev/ttyS1 ;

### Plug-in USB serial adapters

- located at /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyUSB1, /dev/ttyACM1 ;

### Parallel Ports

- located at /dev/lp0 and /dev/lp1 ;
- bidirectional parallel ports located at /dev/parport0 and /dev/parport1 ;
- files can be sent to LPT via cat command (for printing);

### PCI devices

- located at /proc/bus/pci/devices;

### Audio devices

- located at /dev/snd/*, /dev/dsp, /dev/audio ;
- WAV file can be send to /dev/dsp for playing;

## Partitions

- partitions are subdivisions of the whole disk;
- on Linux, they’re denoted with a number after the whole block device;
- located at /dev/sda1, /dev/sdb3 and so on;
- the kernel presents each partition as a block device, just as it would an entire disk;
- partitions are defined on a small area of the disk called a partition table;
- 'parted' is a text-based tool that supports both MBR and GPT;
- 'gparted' is a graphical version of parted;
- to view your system’s partition table:

```bash

parted -l

```

- to check full partition information, use /proc/partitions;

# Linux boot

## Sequence

- The machine’s BIOS or boot firmware loads and runs a boot loader;
- The boot loader finds the kernel image on disk, loads it into memory and starts it;
- The kernel initializes the devices and its drivers;
- The kernel mounts the root filesystem;
- The kernel starts a program called init with a process ID of 1 (this point is the user space start);
- Init sets the rest of the system processes in motion;
- At some point, init starts a process allowing user to log in, usually at the end or near the end of the boot;
- Only the root kernel parameter will be the root filesystem when you boot your system;

## Logs

- System log: `/var/log/kern.log` (or `/var/log/messages`);
- Kernel ring buffer: `dmesg | less`;
- Kernel parameters: `less /proc/cmdline`;

## GRUB

- GRUB has its own `kernel` and its own `insmod` command to dynamically load GRUB modules, completely independent of the Linux kernel;
- Many GRUB commands are similar to Unix shell commands;
- Location of Linux kernel image file: `/boot/vmlinuz-...` (Linux command’s first argument);
- GRUB loads this file from the GRUB root;
- The `initrd` command is similar, specifying the file for the initial RAM filesystem;
- The `msdos` prefix on the partitions tells you that the disk contains an MBR partition table;
- GRUB configuration file (`grub.cfg`) should not be modified directly, the `grub2-mkconfig` should be used instead;

### Menu

- press and hold `shift` when BIOS or firmware startup screen first appears;
- press `e` to view the boot loader configuration commands for the default boot option;
- access the GRUB command line by pressing C at the boot menu or configuration editor;

### Commands

#### Examples

- Determine the GRUB `root` with the `echo` command (that this is where GRUB expects to find the kernel):

```grub

echo $root

```

which will produce `hd0,msdos1`, then: 

```grub

ls (hd0,msdos1)/
ls ($root)/
ls ($root)/boot

```

- Set GRUB variables:

```grub

set

```
which will produce:

```grub

?=0
color_highlight=black/white
color_normal=white/black
--snip--
prefix=(hd0,msdos1)/boot/grub
root=hd0,msdos1

```

- Boot the system:

 ```grub
 
boot
 
 ```

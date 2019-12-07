# Linux troubles

## Blank screen, blinking cursor on boot

- Hold shift during boot, then hit e to edit the GRUB entry. Remove the part that says "quiet splash" and replace it with "text" 
to see what's happening during boot.

## GRUB2

### GUI method

- Boot from Ubuntu flash drive;
- Make sure that internet is connected;
- Execute following commands:

```

sudo apt-add-repository ppa:yannubuntu/boot-repair

sudo apt-get update

sudo apt-get install -y boot-repair

boot-repair

```

### Terminal method

- Boot from Ubuntu flash drive or CD (version should be the same as on installed system);
- Identify the partition Ubuntu is installed on using one of the following command:

```

sudo fdisk -l

```

(the one marked as `Linux)

- Mount this partition (If you have a separate boot partition, mount it on `/mnt/ubuntu/boot instead` instead):

```

sudo mount /your/linux/partition/sdX# /mnt/ubuntu

```

- Execute command:

```

sudo grub-install --boot-directory=/mnt/ubuntu/boot /your/linux/partition/sdX#

```

## Viber

### Qt plugins problem

Solution:

```

sudo apt-get install libqt5gui5

```
# VLC

Open VLC using pulse audio:

```bash

vlc pulse://

```

or

```bash

vlc pulse://alsa_output.pci-0000_00_14.2.analog-stereo.monitor

```

If you want to record VHS using video capture card, do the following:

1. Launch VLC;
2. Select Media > Convert / Save;
3. Select 'Capture Device' tab;
4. Select 'TV - analog';
5. Set '/dev/video0' (or any other) for 'Device Name';
6. Do not select anything for 'Audio Device Name';
7. Choose 'PAL I' for video standard (or SECAM);
8. Select 'Show more options';
9. Select 'Play another media synchronously (extra audio file, ...)';
10. Add 'pulse://' to 'Extra media';
11. Click 'Convert / Save';
12. Choose 'Destination file';
13. Click 'Display the output';
14. Start VHS player;
15. Click 'Start';
16. Start 'TVTime' app;
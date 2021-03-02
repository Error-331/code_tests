## Preparation

### Linux (ubuntu) / Android

#### ADB (adb) preparation (remote debugging)

- Install `android-sdk-platform-tools-common`:

```bash

apt-get install android-sdk-platform-tools-common

```

- Add current user to `plugdev` group:


```bash

sudo usermod -aG plugdev $LOGNAME

```

- List `adb` devices:

```bash

adb devices

```

- Connect to device:

```bash

adb connect 192.168.1.135

```

- Set reverse proxy using following command:


```bash 

adb reverse tcp:8081 tcp:8081

```

or this (???):


```bash 

adb -s 192.168.1.135  reverse tcp:8081 tcp:8081

```

- Kill server when done developing (or if problem occurred):

```bash

adb kill-server

```

####  KVM problem

##### Solution 1

```bash

sudo apt install qemu-kvm
sudo adduser $USER kvm

```

##### Solution 2

```bash

sudo apt install qemu-kvm
sudo chown -R <username>:<username> /dev/kvm

```

##### Solution 3

```bash

sudo apt install qemu-kvm
sudo chmod 777 -R /dev/kvm

```

#### Bundler

- Start Metro in the root of the project (preferably in separate terminal window):

```bash 

npx react-native start

```

- Start emulation (preferably in separate terminal window):

```bash

npx react-native run-android

```

## Misc

- Open debug menu on remote Android device:


```bash

adb shell input keyevent 82

```

## Links

- https://developer.android.com/studio/run/device;

sudo docker -d -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375

sudo systemctl enable docker

promise -> settimeout - ТЕСТИТЬ!!!


docker images

docker run -p 4000:80 friendlyhello

containerd , which is the default high - level runtime in modern versions of Docker and Kubernetes.
These lower - level OCI - certified runtimes can be used by containerd to manage and create containers:
•  runc is often used as the default lower - level runtime by containerd .
•  crun is written in C and designed to be fast and have a small memory footprint.
•  Kata Containers - from Intel, Hyper, and the OpenStack Foundation is a virtualized runtime that can run a mix of containers and virtual machines.
•  gVisor from Google is a sandboxed runtime, implemented entirely in user space.
•  Nabla Containers - provide another sandboxed runtime designed to significantly reduce the attack surface of Linux containers.

TCP port 2375 for unencrypted traffic, port 2376 for encrypted SSL connections, and port 2377 for Docker Swarm mode.

/var/run/docker.sock

Recent versions of Docker Desktop may create the docker.sock file in the user’s home directory inside .docker/run/ and then simply link _/var/run/docker.sock to this location.

Installing Docker


These first two commands will ensure that you aren’t running older versions of Docker. The packages have been renamed a few times, so you’ll need to specify several possibilities here:
$  sudo   apt - get   remove   docker   docker.io   containerd   runc
$  sudo   apt - get   remove   docker - engine


Next, you will need to add the required software dependencies and apt repository for Docker Community Edition. This lets us fetch and install packages for Docker and validate that they are signed:
$  sudo   apt - get   update
$  sudo   apt - get   install   \
      ca - certificates   \
      curl   \
gnupg   \

      lsb - release 

$  sudo   mkdir   - p   /etc/apt/keyrings
$  curl   - fsSL   https://download.docker.com/linux/ubuntu/gpg   | \
      sudo   gpg   - - dearmor   - o   /etc/apt/keyrings/docker.gpg 

$  sudo   chmod   a+r   /etc/apt/keyrings/docker.gpg
$  echo   \
      "deb  [arch= $( dpkg   - - print - architecture )  \
    signed - by=/etc/apt/keyrings/docker.gpg]  \
    https://download.docker.com/linux/ubuntu  \
    $ (lsb_release  - cs)  stable"   | \

      sudo   tee   /etc/apt/sources.list.d/docker.list   >   /dev/null
Now that you have the repository set up, run the following commands



Now that you have the repository set up, run the following commands to install Docker:
$  sudo   apt - get   update
$  sudo   apt - get   install   \
      docker - ce   \
      docker - ce - cli   \
      containerd.io   \
      docker - compose - plugin


Docker Server
The Docker server is a separate binary from the client and is used to manage most of the work for which Docker is typically used. Next we will explore the most common ways to manage the Docker server.


Docker Desktop and Docker Community Edition already set up the server for you, so if you took that route, you do not need to do anything else besides ensuring that the server ( dockerd ) is running. On Windows and macOS, this typically just means starting the Docker application. On Linux, you may need to run the following systemctl commands to start the server.


systemd - Based Linux
Current Fedora and Ubuntu releases use systemd to manage processes on the system. Because you have already installed Docker, you can ensure that the server starts every time you boot the system


by typing this:
$  sudo   systemctl   enable   docker
This tells systemd to enable the docker service and start it when the system boots or switches into the default run level. To start the Docker server, type the following:
$  sudo   systemctl   start   docker


Testing the Setup

docker   container   run   - - rm   - ti   docker.io/ubuntu:latest   /bin/bash 


Exploring the Docker Server
Although the Docker server is often installed, enabled, and run automatically, it’s useful to see that running the Docker daemon manually on a Linux system can be as simple as typing something like this:

sudo   dockerd   - H   unix:///var/run/docker.sock   \
    - - config - file   /etc/docker/daemon.json


if you would like to see the VM (or underlying host), you can run these commands:
$  docker   container   run   - - rm   - it   - - privileged   - - pid = host   debian   \

    nsenter   - t   1   - m   - u   - n   - i   sh 



cat  /etc/os - release

PRETTY_NAME="Docker  Desktop"



/  #  ps  |  grep  dockerd

1540  root       1:05  /usr/local/bin/dockerd

                      - - containerd  /var/run/desktop - containerd/containerd.sock 

                      - - pidfile  /run/desktop/docker.pid 

                      - - swarm - default - advertise - addr=eth0 

                      - - host - gateway - ip  192.168.65.2 



/  #  exit
This command uses a privileged Debian container that contains the nsenter command to manipulate the Linux kernel namespaces so that we can navigate the filesystem of the underlying VM or host.


This container is privileged to allow us to navigate the underlying host, but you should not get into the habit of using privileged containers when adding individual capabilities or system call privileges will suffice. We discuss this more in “Security” .
If you can use a Docker server endpoint, this command will give you access to the underlying host.

The Docker daemon configuration is typically stored in /etc/docker/daemon.json , but you may notice that it exists somewhere like /containers/services/docker/rootfs/etc/docker/daemon.json in the Docker Desktop VM. Docker uses reasonable defaults for all its settings, so this file may be very small or even completely absent.




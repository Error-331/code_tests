# Docker

- The Docker server is a separate binary from the client and is used to manage most of the Docker infrastructure;
- Docker can be set up to know about multiple `Docker servers` by using the `docker context command`;

## Installation

Remove conflicting packages: 

```shell

for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done


```

**Then reference the doc.**

### Configuration

Enable docker service:

```shell

sudo systemctl enable docker

```

Start docker service:

```shell

sudo systemctl start docker

```

Start docker daemon:

```shell

sudo dockerd -H unix:///var/run/docker.sock --config-file /etc/docker/daemon.json

```

The output will provide version information about the various components that make up the Docker client and server:

```shell

docker -H 127.0.0.1:12375 version

```

docker container run --rm -it --privileged --pid=host debian nsenter -t 1 -m -u -n -i sh

## Docker images


-----

sudo docker -d -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375


promise -> settimeout - ТЕСТИТЬ!!!




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



$ docker container run --rm -it --privileged --pid=host debian nsenter -t 1 -m -u -n -i sh
This command uses a privileged Debian container that contains the nsenter command to manipulate the Linux kernel namespaces so that we can navigate the filesystem of the underlying VM or host.


This container is privileged to allow us to navigate the underlying host, but you should not get into the habit of using privileged containers when adding individual capabilities or system call privileges will suffice. We discuss this more in “Security” .
If you can use a Docker server endpoint, this command will give you access to the underlying host.

The Docker daemon configuration is typically stored in /etc/docker/daemon.json , but you may notice that it exists somewhere like /containers/services/docker/rootfs/etc/docker/daemon.json in the Docker Desktop VM. Docker uses reasonable defaults for all its settings, so this file may be very small or even completely absent.


The primary storage backends that are supported include the following:

Overlay21

B-Tree File System (Btrfs)

Device Mapper




Anatomy of a Dockerfile

example:

```dockerfile

FROM node:18.13.0

ARG email="anna@example.com"
LABEL "maintainer"=$email
LABEL "rating"="Five Stars" "class"="First Class"

USER root

ENV AP /data/app
ENV SCPATH /etc/supervisor/conf.d

RUN apt-get -y update

# The daemons
RUN apt-get -y install supervisor
RUN mkdir -p /var/log/supervisor

# Supervisor Configuration
COPY ./supervisord/conf.d/* $SCPATH/

# Application Code
COPY *.js* $AP/

WORKDIR $AP

RUN npm install

CMD ["supervisord", "-n"]


```


While we’re demonstrating it here for simplicity, it is not recommended that you run commands like apt-get -y update or dnf -y update in your application’s Dockerfile. This is because it requires crawling the repository index each time you run a build, which means that your build is not guaranteed to be repeatable since package versions might change between builds. Instead, consider basing your application image on another image that already has these updates applied to it and where the versions are in a known state. It will be faster and more repeatable.

Though not a hard-and-fast rule, it is generally considered a best practice to try to run only a single process within a container. The core idea is that a container should provide a single function so that it remains easy to horizontally scale individual functions within your architecture. In the example, you are using supervisord as a process manager to help improve the resiliency of the node application within the container and ensure that it stays running. This can also be useful for troubleshooting your application during development so that you can restart your service without restarting the whole container.

You could also achieve a similar effect by using the --init command-line argument to docker container run, which we discuss in “Controlling Processes”.



Building an Image

The .dockerignore file allows you to define files and directories that you do not want to upload to the Docker host when you are building the image. In this instance, the .dockerignore file contains the following line:

.git


docker build -t welcome-to-docker .


# Docker

- The Docker server is a separate binary from the client and is used to manage most of the Docker infrastructure;
- Docker can be set up to know about multiple `Docker servers` by using the `docker context command`;

## How Docker Works

- Docker uses of a client-server architecture; 
- Docker client works in pair with docker daemon;
- Docker daemon builds, runs, and distributes the docker containers;
- Docker client runs with the daemon on the same system or can be connected to the Docker daemon remotely;
- Docker client and daemon interact with each other via REST API over a UNIX socket or a network;

## Main moving parts

### Dockerfile

- dockerfile uses DSL (Domain Specific Language) and contains instructions for generating a Docker image;
- dockerfile will define the processes to quickly produce an image;
- user should create a Dockerfile in order which will then be run by `Docker daemon`;

### Docker Image

- It is a file, comprised of multiple layers, used to execute code in a Docker container; 
- They are a set of instructions used to create docker containers; 
- Docker Image is an executable package of software that includes everything needed to run an application; 
- This image informs how a container should instantiate, determining which software components will run and how; 
- Docker Container is a virtual environment that bundles application code with all the dependencies required to run the application. 
- The application runs quickly and reliably from one computing environment to another;

### Docker Container

- is a runtime instance of an image; 
- allows developers to package applications with all parts needed such as libraries and other dependencies; 
- containers contain the whole kit required for an application, so the application can be run in an isolated way;

### Docker Hub

- Docker Hub is a repository service and it is a cloud-based which stores Docker Container Images;

### Docker Compose

- Docker Compose will execute a YAML-based multi-container application; 
- The YAML file consists of all configurations needed to deploy containers Docker Compose, which is integrated with Docker Swarm, and provides directions for building and deploying containers; 
- With Docker Compose, each container is constructed to run on a single host;

### Docker Engine

- Docker Engine - the software that hosts the containers; 
- Docker Engine is a client-server based application. The docker engine has 3 main components:

Components:

- Server (daemon process) - responsible for creating and managing Docker images, containers, networks, and volumes on the Docker;
- REST API - specifies how the applications can interact with the Server and instructs it what to do;
- Client (command-line interface (CLI)) - allows to interact with Docker using the docker commands;

### AWS

- Amazon Elastic Container Service (Amazon ECS) - fully managed container service;
- integrated with the other AWS Service like load balancing, service discovery, and container health monitoring;

## Installation

Remove conflicting packages: 

```shell

sudo apt-get remove docker docker-engine docker.io containerd runc

```

or

```shell

for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

```

Install docker engine:

```shell

sudo apt-get update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    
sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo groupadd docker
sudo usermod -aG docker $USER
  
```

Verify Docker Installation:

```shell

sudo docker run hello-world

```


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

sudo docker run -d -p 127.0.0.1:8080:8080 --name test_container2 --env-file .env test_image



docker rm mycontainer
docker rm 418c28b4b04e

docker ps -a

docker rm c223ec695e2d mycontainer2 23c70ec6e724

docker rm $(docker ps -qa)

docker container prune -f

docker rm -f mycontainer


docker build -t test_image .
sudo docker run -d -p 127.0.0.1:8080:8080 --name test_container2 --env-file .env test_image

//////

To view an image's labels, use the docker image inspect command. You can use the --format option to show just the labels;

docker image inspect --format='{{json .Config.Labels}}' myimage

//////





# Most used docker commands

Docker Run
Docker Pull
Docker PS
Docker Stop
Docker Start
Docker rm
Docker RMI
Docker Images
Docker exec
Docker Login

# Docker Engine
The software that hosts the containers is named Docker Engine. Docker Engine is a client-server based application. The docker engine has 3 main components:

Server: It is responsible for creating and managing Docker images, containers, networks, and volumes on the Docker. It is referred to as a daemon process.
REST API: It specifies how the applications can interact with the Server and instructs it what to do.
Client: The Client is a docker command-line interface (CLI), that allows us to interact with Docker using the docker commands.


# example

Create a docker image

sudo docker build -t python-test .

Run the Docker image

sudo docker run python-test

# Fetch and run the image from Docker Hub

1. To remove all versions of a particular image from our local system, we use the Image ID for it.

$ docker rmi -f af939ee31fdc

2. Now run the image, it will fetch the image from the docker hub if it doesn’t exist on your local machine.

$ docker run afrozchakure/python-test

## Instructions

- `ADD`	- add local or remote files and directories;
- `ARG` - use build-time variables;
- `CMD` - specify default commands;
- `COPY` - copy files and directories;
- `ENTRYPOINT` - specify default executable;
- `ENV` - set environment variables;
- `EXPOSE` - describe which ports your application is listening on;
- `FROM` - create a new build stage from a base image;
- `HEALTHCHECK`- check a container's health on startup;
- `LABEL` - add metadata to an image;
- `MAINTAINER` - specify the author of an image;
- `ONBUILD` - specify instructions for when the image is used in a build;
- `RUN` - execute build commands;
- `SHELL` - set the default shell of an image;
- `STOPSIGNAL` - specify the system call signal for exiting a container;
- `USER` - set user and group ID;
- `VOLUME` - create volume mounts;
- `WORKDIR` - change working directory;

## Build variables

- _**build arguments and environment variables are inappropriate for passing secrets to your build;**_
- _**use secret mounts or SSH mounts;**_

### Build arguments

- build arguments are variables for the Dockerfile itself; 
- used to parametrize values of Dockerfile instructions;
- have no effect on the build unless it's used in an instruction; 
- they're *not accessible* or present in containers unless *explicitly() passed through from the Dockerfile into the image filesystem or configuration;
- They may persist in the image metadata (not suitable for holding secrets);

### Environment variables

- environment variables are *passed through to the build execution environment*, and *persist* in containers instantiated from the image;
- used to configure the execution environment for builds;
- used to set default environment variables for containers;
- can directly influence the execution the build, and the behavior or configuration of the application;
- user can not override or set an environment variable at build-time;
- values for environment variables must be declared in the Dockerfile;
- environment variables can be combined with build arguments to allow environment variables to be configured at build-time;


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

- is a runtime instance of an image (virtual environment that bundles application code with all the dependencies required to run the application); 
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
- Docker Engine is a client-server based application. The docker engine has 3 main components;

Components:

- Server (daemon process) - responsible for creating and managing Docker images, containers, networks, and volumes on the Docker;
- REST API - specifies how the applications can interact with the Server and instructs it what to do;
- Client (command-line interface (CLI)) - allows to interact with Docker using the docker commands;

### AWS

- Amazon Elastic Container Service (Amazon ECS) - fully managed container service;
- integrated with the other AWS Service like load balancing, service discovery, and container health monitoring;

## Docker Networking

Set of mechanisms and technologies Docker provides for communication between Docker containers and the outside world.

## Docker Registry

Refer as central repository for storing the and managing Docker image.

## Docker Hub

- is a repository service and it is a cloud-based service where people push their Docker Container Images and also pull the Docker Container Images from the Docker Hub;
- it makes it easy to find and reuse images;

## Issues

1. Recent versions of Docker Desktop may create the docker.sock file in the user’s home directory inside `.docker/run/` and then simply link `_/var/run/docker.sock` to this location;

## Build

Example

```shell

docker build -t nodejs:1 .
docker run -d -p 8080:8080 <Imagetag/ID>

```

### Build variables

- _**build arguments and environment variables are inappropriate for passing secrets to your build;**_
- _**use secret mounts or SSH mounts;**_

### Build arguments

- build arguments are variables for the Dockerfile itself; 
- used to parametrize values of Dockerfile instructions;
- have no effect on the build unless it's used in an instruction; 
- they're *not accessible* or present in containers unless *explicitly()* passed through from the Dockerfile into the image filesystem or configuration;
- They may persist in the image metadata (not suitable for holding secrets);

### Environment variables

- environment variables are *passed through to the build execution environment*, and *persist* in containers instantiated from the image;
- used to configure the execution environment for builds;
- used to set default environment variables for containers;
- can directly influence the execution the build, and the behavior or configuration of the application;
- user can not override or set an environment variable at build-time;
- values for environment variables must be declared in the Dockerfile;
- environment variables can be combined with build arguments to allow environment variables to be configured at build-time;


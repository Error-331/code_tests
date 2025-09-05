# Docker commands

- `docker build` - builds an image from a Dockerfile;
- `docker run` (`docker container run`) - launches the containers from images, with specifying the runtime options and commands;
- `docker pull` - fetches the container images from the container registry like Docker Hub to the local machine;
- `docker ps` (`dockerk container ls`) - display the running containers along with their important information like container ID, image used and status;
- `docker stop` - halts the running containers gracefully shutting down the processes within them;
- `docker start` - restarts the stopped containers, resuming their operations from the previous state;
- `docker login` - logs in to the docker registry enabling the access to private repositories;
- `docker rm` (`docker container rm`) - remove one or more containers;
- `docker rmi` (`docker imagge rm`) - remove one or more images;
- `docker images` (`docker image ls`) - list images;
- `docker exec` - allows to run a new commands in a running container;
- `docker prune` - removes all unused Docker objects in one go;
- `docker restart` - restarts the container;
- `docker inspect` - debug container's errors;
- `docker container top` - displays the running processes inside a container;
- `docker commit` -  create an image from a container;
- `docker cp` - copy the file from docker host to the docker container;
- `docker attach` - connect to existing container;
- `docker image build` - builds an image from a Dockerfile;
- `docker image history` - shows history of the docker image;
- `docker image inspect` - used for displaying the detailed information on one or more images;
- `docker image prune` - used for removing unused images that are not associated with any containers;
- `docker image save` - used to save the docker images into a tar archived files;
- `docker image tag` - used to create a tag to the target image that refers to the source image;

## Commands list and examples

### Docker run

```shell

docker container run <image_name>

```

or

```shell

docker container run --name <container_name> <image_name>

```

Example 1:

```shell

sudo docker run -d -p 127.0.0.1:8080:8080 --name test_container2 --env-file .env test_image



```

### Docker pull

```shell

docker pull <image_name>

```

### Docker ps

Flags:

- `-a` - shows us all the containers, stopped or running;
- `-l` - shows us the latest container;
- `-q` - shows only the Id of the containers;

```shell

docker ps [options..]

```

### Docker stop


```shell

docker container stop <container_ID>

```

Example 1:

```shell

docker stop container_name_or_id

```

Example 2 (stop multiple container):

```shell

docker stop container1 container2 container3

```

### Docker start

```shell

docker container start <container_ID>

```

### Docker rm

Flags:

- `-f` - remove the container forcefully;
- `-v` - remove the volumes;
- `-l` - remove the specific link mentioned;

```shell

docker rm {options} <container_name or ID

```

Example 1 (remove multiple containers):

```shell

docker rm c223ec695e2d mycontainer2 23c70ec6e724

```

Example 2: 

```shell

docker rm $(docker ps -qa)

```

### Docker rmi

```shell

docker rmi <image ID/ image name>

```

### Docker images

```shell

docker images

```

### Docker exec

Flags:

- `-d` - run the commands in the background;
- `-i` - keep STDIN open even when not attached;
- `-e` - sets the environment variables;
- `-t` - allocates a pseudo-TTY (terminal), when used with `-i`, this provides a fully interactive terminal session within the container;

```shell

docker exec {options}

```

Example 1:

```shell

docker exec -d some_container bash

```

Example 2 (execute multiple commands):

```shell

docker exec -it <container_id> sh -c "apt-get update && apt-get install nodejs && echo 'test'"

```

### Docker login

```shell

docker login 

```

### Docker push

```shell

docker push <Image name/Image ID> 

```

### Docker build

Build Docker image in the current directory:

```shell

docker build -t image_name:tag .

```

### Docker prune

By default, following entities will be removed:

- All stopped containers;
- All Build Cache;
- All unused networks;
- All dangling images (images that are not tagged and not used by any container);

```shell

docker system prune

```

Remove all stopped Docker containers:

```shell

docker container prune

```

or

```shell

docker container prune -f

```

### Docker restart

```shell

docker restart container_name_or_id

```

### Docker inspect

```shell

docker inspect container_name_or_id

```

### Docker container top

```shell

docker container top <container_id_or_name>

```

### Docker commit

```shell

docker commit container_name_or_id new_image_name:tag

```

## Running commands inside a container

### Docker run

Starts a new container and immediately get a command prompt (like bash) inside it.

Flags: 

- `-i (--interactive)` - keeps standard input (STDIN) open, allowing user to type commands;
- `-t (--tty)` - allocates a pseudo-terminal, which gives user the interactive shell experience;

Example 1 (runs an Ubuntu container and fires up its bash):

```shell

sudo docker run -it ubuntu bash

```

Example 2 (uses a privileged Debian container that contains the `nsenter` command to manipulate the Linux kernel namespaces so that in can be possible to navigate the filesystem of the underlying VM or host):

```shell

docker container run --rm -it --privileged --pid=host debian nsenter -t 1 -m -u -n -i sh

```

### Docker exec

Runs a command inside a container that is already running (useful for debugging, checking logs, or installing a package on the fly).

Example 1:

```shell

sudo docker exec -it s75b11630693 echo "Test"

```

### Using Dockerfile

Specify commands in the Dockerfile.

Example 1:

```dockerfile

FROM ubuntu:latest
RUN echo "test"

```

## Docker Attach and Exec comparison

Exec:

- run a new command or process inside a running container;
- creates a new process inside the container;
- used for debugging, running admin tasks, or opening a second shell;
- does not stop the container;

Attach:

- connect to the main running process (PID 1) of a container;
- does not create a new process (connects to the existing primary process);
- used for interacting with a foreground application that is already running;
- exiting the attached process (if it's PID 1) will stop the container;
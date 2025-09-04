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

## Docker run

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

## Docker pull

```shell

docker pull <image_name>

```

## Docker ps

Flags:

- `-a` - shows us all the containers, stopped or running;
- `-l` - shows us the latest container;
- `-q` - shows only the Id of the containers;

```shell

docker ps [options..]

```

## Docker stop


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

## Docker start

```shell

docker container start <container_ID>

```

## Docker rm

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

```shell

docker exec {options}

```

example:

```shell

docker exec -d some_container bash

```

## Docker login

```shell

docker login 

```

## Docker push

```shell

docker push <Image name/Image ID> 

```

## Docker build

Build Docker image in the current directory:

```shell

docker build -t image_name:tag .

```

## Docker prune

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

## Docker restart

```shell

docker restart container_name_or_id

```

## Docker inspect

```shell

docker inspect container_name_or_id

```

## Docker container top

```shell

docker container top <container_id_or_name>

```

## Docker commit

```shell

docker commit container_name_or_id new_image_name:tag

```
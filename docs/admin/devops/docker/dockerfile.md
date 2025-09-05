# Dockerfile

- Dockerfile is a script that uses the Docker platform to generate containers automatically;
- Text document that contains all the instructions that a user may use to create an image from the command line;
- Developers may use Dockerfiles to construct an automated container build that steps through a series of command-line instructions;

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

## Best practices

1. As a base image, use official images (prefer Alpine images as a base image);
2. Don't copy unnecessary files and folders or install/use unnecessary packages of software;
3. Do not run a container process as root;
4. Reduce the number of image layers;
5. Try to use multi-stage Docker files to reduce the size of the image;

## Example

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
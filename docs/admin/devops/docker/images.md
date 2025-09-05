# Docker images

- is an executable package of software that includes everything needed to run an application;
- informs how a container should instantiate, determining which software components will run and how;
- are built using the Dockerfile which consists of a set of instructions that are required to containerize an application;
- is a platform-independent image that can be built in the Windows environment and it can be pushed to the docker hub and pulled by others with different OS environments like Linux;

## Layers

- an image is composed of a stack of read-only layers;
- each instruction in a Dockerfile (like FROM, COPY, RUN) creates a new layer on top of the previous one;
- Docker only rebuilds that specific layer and the ones that follow it;
- if multiple images share the same base layers, those layers are only stored once on a system;

To reduce image size and improve build performance, consolidate related commands into a single `RUN` instruction using the `&&` operator:

```shell

FROM base_image
RUN apt-get update && \
    apt-get install -y package1 package2 && \
    apt-get clean

```

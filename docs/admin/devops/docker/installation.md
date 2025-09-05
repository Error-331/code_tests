# Docker installation

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
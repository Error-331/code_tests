sudo docker -d -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375

sudo systemctl enable docker

promise -> settimeout - ТЕСТИТЬ!!!


docker images

docker run -p 4000:80 friendlyhello
Simple configuration for reverse proxy server
---------------------------------------------


server {
        listen   80; ## listen for ipv4; this line is default and implied
        #listen   [::]:80 default ipv6only=on; ## listen for ipv6

        server_name web-futuristics.com;

        location / {
                proxy_pass http://213.239.205.42:9024/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}


---------------------------------------------------------------------------------------------

Reverse proxy for Jenkins that 'should' work
--------------------------------------------

upstream jenkins {
  server 127.0.0.1:8080 fail_timeout=0;
}

server {
  listen 8080;
  server_name 127.0.0.1 jenkins.web-futuristics.com;
  rewrite ^ https://$server_name$request_uri? permanent;
}

server {
  listen 8080;
  server_name 127.0.0.1 jenkins.web-futuristics.com;

  location / {
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    

    # Fix the "It appears that your reverse proxy set up is broken" error.
    proxy_pass          http://127.0.0.1:9026;
    proxy_read_timeout  90;
 
    proxy_redirect      http://127.0.0.1:9026 jenkins.web-futuristics.com;
  
    # Required for new HTTP-based CLI
    proxy_http_version 1.1;
    proxy_request_buffering off;
    # workaround for https://issues.jenkins-ci.org/browse/JENKINS-45651
    add_header 'X-SSH-Endpoint' 'jenkins.domain.tld:50022' always;
  }
}

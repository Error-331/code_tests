# Caddy (proxy server)

## Usage for local development for sites with TLS

1. Make sure that testing domain is pointing to local host (hosts file example: `127.0.0.1 example.com`);
2. Create a `Caddyfile` configuration file for `Caddy` reverse proxy and put it next to `Caddy` executable:

```text

example.com {
    tls internal
    reverse_proxy localhost:3000
}

```

- where `example.com` is domain used for local testing and `localhost:3000` is a local server address;

3. Launch `Caddy`:

```shell

sudo ./caddy_executable run

```
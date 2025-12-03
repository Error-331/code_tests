# Generating and using self-signed certificate with Caddy

## Certificate generation (Linux)

1. Install `mkcert`;
2. Run `mkcert -install`;
3. Run `mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::5173`;
4. Copy generated files to `Caddy` folder;

## Caddy configuration

1. Make sure that testing domain is pointing to local host (hosts file example: `127.0.0.1 example.com`);
2. Create a `Caddyfile` configuration file for `Caddy` reverse proxy and put it next to `Caddy` executable:

```text

example.com {
    tls ./example.com+5.pem ./example.com+5-key.pem
    reverse_proxy localhost:5173
}

```

- `example.com` is domain used for local testing and `localhost:5173` is a local server address;
- `example.com+5.pem` and `example.com+5-key.pem` files generated using `mkcert` (see above);

3. Launch `Caddy`:

```shell

sudo ./caddy_executable run

```

or (more specific):

```shell

sudo ./caddy_linux_amd64 run

```

If you do not want to use custom certificate (service worker will not work properly in this situation), one can use more simplistic configuration:

```text

example.com {
    tls internal
    reverse_proxy localhost:5173
}

```
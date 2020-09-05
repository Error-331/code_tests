# SSH

## Steps

- install putty;

- install pageant;

- install plink;

- convert ssh key (`puTTYgen`);

- add env var: `GIT_SSH C:\Users\TestUser\Downloads\plink.exe` (important);

- start pageant;

- add key using `plink -v git@git.somedomain.com` (cmd);

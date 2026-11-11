# Misc

If you want to be able to install npm packages from Github repo, use this config:

```bash

git config --global url."https://oauth2:${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"

```

then restore the variable:

```bash

git config --global --unset-all url."https://oauth2:${GITHUB_TOKEN}@github.com/".insteadOf

```
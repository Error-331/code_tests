# Grails framework

## Main commands

Run Grails application:

```bash

grails run-app

```

Clean Gradle installation:

```bash

grails clean

```

Generate migrations files based on domain classes: 

```bash

grails dbm-generate-gorm-changelog changelog.groovy

```

Run database migrations:

```bash

grails dbm-update

```

Install grails plugin:

```bash

grails install-plugin seed-me

```

## Directory structure

- grails-app - top level directory for Groovy sources;
- conf - configuration sources;
- controllers - web controllers;
- domain - the application domain;
- i18n - support for internationalization (i18n);
- services - the service layer;
- taglib - tag libraries;
- utils - grails specific utilities;
- views - Groovy Server Pages or JSON Views;

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

Create controller

```bash

garils create-controller hello

```

Run tests

```bash

grails test-app

```

Produce WAR file( under the build/libs directory)

```bash

grails war

```

## Directory structure

- grails-app - top level directory for Groovy sources;
- conf - configuration sources;
- controllers - web controllers;
- domain - the application domain;
- migrations - database migration scripts;
- i18n - support for internationalization (i18n);
- services - the service layer;
- taglib - tag libraries;
- utils - grails specific utilities;
- views - Groovy Server Pages or JSON Views;
- src/main/scripts - code generation scripts;
- src/main/groovy - supporting sources;
- src/test/groovy - unit and integration tests;
- src/seed - database seed data which is consumed by seed-me Grails plugin;

## Controllers

### Available scopes

- servletContext - shared state; 
- session - session related data (cookies, etc.);
- request - request object (GET parameters);
- params- POST parameters;
- flash - a temporary storage map that stores objects within the session for the next request and the next request only;

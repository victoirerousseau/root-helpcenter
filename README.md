# Landing page of Akeneo Help center
This repository holds the sources for the landing page of our help center, made by hand with love.

**Install/preview the landing page**

Install [Docker Engine](https://docs.docker.com/engine/installation/)

### Build with docker

```bash
make build
```

This is only building the documentation. The documentation is not available with this command, as it does not launch the HTTP server. 

### Build and launch HTTP server with docker

```bash
make watch
```

The help center website is then available on `http://localhost:8000/`.
Files located in the content and src directories are watched for changes, so when developing or writing new articles you do not need to launch any other task.

## Deployment

This is automatically deployed in staging when merging the PR. To deploy in production, please accept the deployment in the approval step.

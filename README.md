# shopping-cart-test

This is a shopping cart playground.

It uses React for the frontend and SQL, TypeORM, and Express for the backend.

Can be run using docker.

## usage

- install dependencies

```bash
yarn install
```

- launch rest api

```bash
yarn start:rest
```

- launch rest api

```bash
yarn start:graph
```

- run tests

```bash
yarn test
```

- setup docker containers using compose

```bash
./docker/build.sh
```

- run docker containers

```bash
docker-compose up
```

- take down containers and wipe docker volumes

```bash
./docker/wipe.sh
```

- shell into database

```bash
./docker/db-shell.sh
```

- run client tests in container

```bash
./docker/client-run-test.sh
```

- run server tests in container

```bash
./docker/server-run-test.sh
```

- shell into client using docker run

```bash
./docker/client-run-shell.sh
```

- or into running container using docker exec (use 'u' script for ubuntu)

```bash
./docker/client-a-shell.sh
```

## server setup

```bash
mkdir server && cd server
yarn init
yarn add --dev typeorm reflect-metadata @types/node pg
# yarn global add typeorm # optional as needed
typeorm init --database postgres
yarn add --dev ts-jest @types/jest express express-graphql graphql @types/cors @types/express class-validator cors ts-node-dev type-graphql 
```

- mssql

```bash
yarn add --dev mssql
```

## azure

- [container instances tutorial](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-tutorial-prepare-acr)
# shopping-cart-playground

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
yarn add --dev typeorm reflect-metadata @types/node mssql ts-jest @types/jest express express-graphql graphql @types/cors @types/express class-validator cors ts-node-dev type-graphql
```

- mssql

```bash
yarn add --dev mssql
```

## client setup

```bash
mkdir client && mkdir client/{src,dist} && cd server
yarn init
yarn add --dev webpack webpack-cli react react-dom @types/react @types/react-dom @types/node typescript ts-loader source-map-loader chalk html-webpack-plugin webpack-hot-middleware webpack-dev-server ts-node dotenv tslint tslint-react tslint-config-prettier web-vitals
yarn add axios styled-components react react-dom react-router-dom
tsc --init
touch {server,webpack.config}.js
mkdir src/app && mkdir src/app/components
touch src/app/{App,index}.tsx
touch src/app/components/StoreFront.tsx
mkdir public && touch public/index.html
```


## azure

- [container instances tutorial](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-tutorial-prepare-acr)
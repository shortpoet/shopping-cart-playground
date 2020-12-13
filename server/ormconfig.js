console.log("$# ORM CONFIG @7");
console.log("$# DOCKER @7");
console.log(process.env.DOCKER);
console.log("$# PROVIDER @7");
console.log(process.env.PROVIDER);
const postgresHost = process.env.DOCKER === "1"
  ? process.env.POSTGRES_HOST
  : process.env.POSTGRES_HOST_LOCAL
const mssqlHost = process.env.DOCKER === "1"
  ? process.env.MSSQL_HOST
  : process.env.MSSQL_HOST_LOCAL
const azureHost = process.env.DOCKER === "1"
  ? process.env.AZURE_HOST
  : process.env.AZURE_HOST_LOCAL
// console.log("$# POSTGRES_HOST @7");
// console.log(postgresHost);

const postgresConfig = {
  "type": "postgres",
  "host": postgresHost,
  "port": 5432,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DB
}

const mssqlConfig = {
  "type": "mssql",
  "host": mssqlHost,
  "username": process.env.MSSQL_USER,
  "password": process.env.MSSQL_PASSWORD,
  "database": process.env.MSSQL_DB
}

const azureConfig = {
  "type": "mssql",
  "host": azureHost,
  "username": process.env.AZURE_USER,
  "password": process.env.AZURE_PASSWORD,
  "database": process.env.AZURE_DB
}

const config = process.env.PROVIDER === "postgres"
  ? postgresConfig
  : process.env.PROVIDER === "mssql"
    ? mssqlConfig
    : process.env.PROVIDER === "azure"
      ? azureConfig
      : {}

module.exports = {
  ...config,
  "synchronize": false,
  "logging": false,
  "migrationsRun": false,
  entities: [
    "src/api/entity/**/*.ts"
  ],
  migrations: [
    "src/orm/migration/**/*.ts"
  ],
  subscribers: [
    "src/orm/subscriber/**/*.ts"
  ],
  seeds: [
    "src/orm/seeds/**/*{.ts,.js}"
  ],
  factories: [
    "src/orm/factories/**/*{.ts,.js}"
  ],
  cli: {
    entitiesDir: "src/api/entity",
    migrationsDir: "src/orm/migration",
    subscribersDir: "src/orm/subscriber"
  }
};

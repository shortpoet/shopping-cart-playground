import { Connection, ConnectionOptions, createConnection } from "typeorm"
const config = require('../../../ormconfig.js');

async function createDbConnection (options: ConnectionOptions): Promise<Connection> {
  try {
    const connection: Connection = await createConnection(options)
    console.log(`TypeORM Connected to ${options.database}`)
    return connection
  } catch (err) {
    console.log('Problem with TypeORM connection')
    throw err.message
  }
}

export { createDbConnection }

const handleConnection = async () => {
  let connection = await createDbConnection(config);
  // connection.connect();
  if (connection == undefined) {
    try {
      connection = await createDbConnection(config);
      // connection.connect();
    } catch (_) { }
    if (connection == undefined) {
      connection = await handleConnection();
      // connection.connect();
    }

  }
  return connection
}

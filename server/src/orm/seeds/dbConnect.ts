import { Connection, ConnectionOptions, createConnection } from "typeorm"

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

export {createDbConnection}
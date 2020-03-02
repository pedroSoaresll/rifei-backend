import { ConnectionOptions } from 'mongoose'

require('dotenv/config')

const user = process.env.MONGO_USER ?? 'no-user'
const password = process.env.MONGO_PASSWORD ?? 'no-password'
const databaseName = process.env.MONGO_DATABASE
const host = process.env.MONGO_HOST
const port = process.env.MONGO_PORT

export function getMongoURI(): string {
  return `mongodb://${host}:${port}/${databaseName}`
}

export function getMongoOptionConnection(): ConnectionOptions {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      user,
      password,
    },
    authSource: 'admin',
  }
}

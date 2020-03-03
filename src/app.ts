import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import logger from './libs/winston'
import routes from './routes'
import { getMongoURI, getMongoOptionConnection } from './helper/mongo'

require('dotenv/config')

class App {
  public express: express.Application

  public constructor() {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database(): void {
    mongoose
      .connect(getMongoURI(), getMongoOptionConnection())
      .then(() => logger.info('mongo connected'))
      .catch(error => logger.error('error to connect mongo:', error))
  }

  private routes(): void {
    this.express.use(routes)
  }
}

export default new App().express

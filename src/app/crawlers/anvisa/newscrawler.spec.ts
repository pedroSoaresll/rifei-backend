import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { getMongoOptionConnection } from '../../../helper/mongo'
import NewsCrawler from './NewsCrawler'
import { Article } from '../../models/Article'

console.log(process.env.NODE_ENV)

describe('News Crawler suite tests', () => {
  let mongod: MongoMemoryServer

  beforeAll(async () => {
    NewsCrawler.articles = []
    mongod = new MongoMemoryServer()
    await mongoose
      .connect(await mongod.getUri(), getMongoOptionConnection())
      .then(() => console.log('mongo connected'))
      .catch(e => console.error('error to connect mongo ', e))
  })

  afterAll(async () => {
    await mongoose.connection.close()
    await mongod.stop()
  })

  test('should be defined', () => {
    expect(NewsCrawler).toBeDefined()
  })

  test('should get data from anvisa', async cb => {
    await NewsCrawler.extract()
    expect(typeof NewsCrawler.$).toBe(typeof Function)
    expect(NewsCrawler.$('.listagem').hasClass('listagem')).toBe(true)
    cb()
  })

  test('should receive list of articles', async cb => {
    await NewsCrawler.extract()
    await NewsCrawler.transform()

    expect(typeof NewsCrawler.articles).toBe(typeof [])
    expect(NewsCrawler.articles).toHaveLength(10)

    NewsCrawler.articles.forEach((article: Article) => {
      // createdAt
      expect(article.createdAt).toBeDefined()
      expect(!!article.createdAt).toBe(true)
      // link
      expect(article.link).toBeDefined()
      expect(!!article.link).toBe(true)
      // shortDescription
      expect(article.shortDescription).toBeDefined()
      expect(typeof article.shortDescription).toBe(typeof '')
      // tags
      expect(article.tags).toBeDefined()
      expect(article.tags.length).toBeGreaterThanOrEqual(1)
      // title
      expect(article.title).toBeDefined()
      expect(!!article.title).toBe(true)
      // type
      expect(article.type).toBeDefined()
      expect(!!article.type).toBe(true)
    })
    cb()
  })

  test('should be loaded in mongodb', async cb => {
    await NewsCrawler.init()
    cb()
  })
})

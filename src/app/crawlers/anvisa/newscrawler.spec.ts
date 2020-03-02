import mongoose from 'mongoose'
import { getMongoURI, getMongoOptionConnection } from '../../../helper/mongo'
import NewsCrawler from './NewsCrawler'
import { Article } from '../../models/Article'

describe('News Crawler suite tests', () => {
  beforeAll(async () => {
    NewsCrawler.articles = []
    await mongoose
      .connect(getMongoURI(), getMongoOptionConnection())
      .then(() => console.log('mongo connected'))
      .catch(e => console.error('error to connect mongo ', e))
  })

  afterAll(() => {
    mongoose.connection.close()
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
      expect(!!article.shortDescription).toBe(true)
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

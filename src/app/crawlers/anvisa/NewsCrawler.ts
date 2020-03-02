import cheerio from 'cheerio'
import Article, { Article as IArticle } from '../../models/Article'
import logger from '../../../config/winston'
import request from 'request'

class NewsCrawler {
  public $: CheerioStatic
  public articles: IArticle[] = []

  async extract(): Promise<void> {
    return new Promise((resolve, reject) => {
      request.get(
        `${process.env.ANVISA_URL}/ultimas-noticias`,
        (error, _, body) => {
          if (error) {
            logger.error('error to get anvisa site', error)
            reject(error)
            return
          }

          logger.info('success to get anvisa html:', body)
          this.$ = cheerio.load(body)
          resolve()
        }
      )
    })
  }

  async transform(): Promise<void> {
    const articles: IArticle[] = []

    return new Promise((resolve) => {
      this.$('.listagem .row-fluid.lista-noticias').each(
        (_, posts) => {
          const $: CheerioStatic = cheerio.load(posts)
          const date = $('.span3.data-hora .data').eq(0).text().trim()
          const time = $('.span3.data-hora .hora').text().trim()
          const type = $('.span3.data-hora .data').eq(1).text().trim()
          const title = $('div.textos p.titulo a').text().trim()
          const link = $('div.textos p.titulo a').attr('href')
          const shortDescription = $('div.textos p.resumo').text().trim()
          // tags
          const tags = []
          $('div.textos div.tags a.tagSearch').each((_, tag) =>
            tags.push({ name: tag.children[1].data.trim() }))

          const [day, mounth, year] = date.split('/')

          articles.push({
            createdAt: `${year.trim()}-${mounth.trim()}-${day.trim()} ${time}`,
            link,
            shortDescription,
            tags,
            title,
            type
          })
        }
      )

      this.articles = articles

      resolve()
    })
  }

  async load(): Promise<void> {
    const promiseArticlesToCreate = this.articles.map(async (article) => {
      const findArticle = await Article.findOne({
        title: article.title
      })

      if (findArticle) {
        return null
      }

      return Article.create(article)
    })

    await Promise.all(promiseArticlesToCreate)
  }

  async init(): Promise<void> {
    await this.extract()
    await this.transform()
    await this.load()
  }
}

export default new NewsCrawler()

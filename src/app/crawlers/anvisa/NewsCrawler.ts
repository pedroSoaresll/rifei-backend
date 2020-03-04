import cheerio from 'cheerio'
import moment from 'moment'
import Article, {
  Article as IArticle,
  Tag,
  ArticleDocument,
} from '../../models/Article'
import logger from '../../../libs/winston'
import request from 'request'
import { render } from '../../../libs/nunjucks'
import { getTemplate, TemplatesName } from '../../../helper/email'
import { sendEmail } from '../../../libs/mailgun'

class NewsCrawler {
  public $!: CheerioStatic
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

          logger.info('success to get anvisa html')
          this.$ = cheerio.load(body)
          resolve()
        }
      )
    })
  }

  async transform(): Promise<void> {
    const articles: IArticle[] = []

    return new Promise(resolve => {
      this.$('.listagem .row-fluid.lista-noticias').each((_, posts) => {
        const $: CheerioStatic = cheerio.load(posts)
        const date = $('.span3.data-hora .data')
          .eq(0)
          .text()
          .trim()
        const time = $('.span3.data-hora .hora')
          .text()
          .trim()
        const type = $('.span3.data-hora .data')
          .eq(1)
          .text()
          .trim()
        const title = $('div.textos p.titulo a')
          .text()
          .trim()
        const link = $('div.textos p.titulo a').attr('href') ?? ''
        const shortDescription = $('div.textos p.resumo')
          .text()
          .trim()
        // tags
        const tags: Tag[] = []
        $('div.textos div.tags a.tagSearch').each((_, tag) =>
          tags.push({ name: tag?.children[1]?.data?.trim() ?? '' })
        )

        const [day, mounth, year] = date.split('/')
        const article: IArticle = {
          createdAt: `${year.trim()}-${mounth.trim()}-${day.trim()} ${time}`,
          link,
          shortDescription,
          tags,
          title,
          type,
        }

        logger.info('article: ' + JSON.stringify(article))

        articles.push(article)
      })

      this.articles = articles

      resolve()
    })
  }

  async load(): Promise<void> {
    async function sendNotification({
      createdAt,
      link,
      shortDescription,
      tags,
      title,
      type,
    }: ArticleDocument): Promise<void> {
      logger.info('send email')
      const html = render(getTemplate(TemplatesName.alert), {
        createdAt: moment(createdAt).format('DD/MM/YYYY HH:mm'),
        link,
        shortDescription,
        tags: tags.map(tag => tag.name).join(', '),
        title,
        type,
      })

      await sendEmail({
        html,
        subject: 'Anvisa, nova notificação',
        to: 'pedrodepaivasoaresll@gmail.com',
      })
    }
    const promiseArticlesToCreate = this.articles.map(
      async (article: IArticle): Promise<ArticleDocument> => {
        const findArticle = await Article.findOne({
          title: article.title,
        })

        logger.info('article already exists: ' + !!findArticle)

        if (findArticle) {
          return null
        }

        logger.info('save new article')
        const newArticle = await Article.create(article)

        await sendNotification(newArticle)

        return newArticle
      }
    )

    await Promise.all(promiseArticlesToCreate)
  }

  async init(): Promise<void> {
    logger.info('init extract...')
    await this.extract()

    logger.info('init transform...')
    await this.transform()

    logger.info('init load...')
    await this.load()
  }
}

export default new NewsCrawler()

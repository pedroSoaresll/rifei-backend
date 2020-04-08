import { render } from '../../libs/nunjucks'
import { getTemplate, TemplatesName } from '../../helper/email'
import moment from 'moment'
import { sendEmail } from '../../libs/mailgun'
import { Article } from '../models/Article'
import logger from '../../libs/winston'

export async function sendEmailAlert({
  createdAt, link, shortDescription, tags, title, type,
}: Article): Promise<void> {
  logger.info('send email')

  const html = render(getTemplate(TemplatesName.alert), {
    createdAt: moment(createdAt).format('DD/MM/YYYY HH:mm'),
    link,
    shortDescription,
    tags: tags.map(tag => tag.name).join(', '),
    title,
    type,
  })

  logger.info(process.env.NODE_ENV)

  if (process.env.NODE_ENV === 'production') {
    await sendEmail({
      html,
      subject: 'Anvisa, nova notificação',
      to: 'carolinebicouv@gmail.com',
    })
  }
}

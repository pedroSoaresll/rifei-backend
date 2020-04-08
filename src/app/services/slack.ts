import axios, { AxiosResponse } from 'axios'
import moment from 'moment'
import { Article } from '../models/Article'

export function sendSimpleText(text: string): Promise<AxiosResponse> {
  return axios.post('https://hooks.slack.com/services/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', {
    text
  },
  {
    headers: {
      'Content-type': 'application/json'
    },
  })
}

export async function sendAlertOf(article: Article): Promise<void> {
  if (!['production', 'development'].includes(process.env.NODE_ENV)) return

  await sendSimpleText(`
Olá, a Anvisa postou um novo artigo.

Abaixo as informações que coletei dele:

${article.type}, ${moment(article.createdAt).format('DD/MM/YYYY')}
Tags: ${article.tags.map(tag => tag.name).join(', ')}

${article.title}

${article.shortDescription}

Link para publicação original:
${article.link}
  `)
}

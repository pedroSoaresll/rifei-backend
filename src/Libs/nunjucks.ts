import { renderString } from 'nunjucks'

const render = (html: string, data): string => {
  if (!html || !data) {
    throw new Error('HTML or DATA are null or invalid')
  }

  return renderString(html, data)
}

export { render }

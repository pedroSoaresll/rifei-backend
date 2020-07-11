import { readFileSync } from 'fs'
import { resolve } from 'path'
import logger from '../Libs/winston'

export enum TemplatesName {
  example = 'example',
  alert = 'alert',
}

const pathTemplates = resolve(__dirname, '..', '..', 'emails/html')

const getTemplate = (templateName: string): string | null => {
  try {
    const buffer: Buffer = readFileSync(`${pathTemplates}/${templateName}.html`)
    return buffer.toString('utf-8')
  } catch (e) {
    logger.error('error to get template file:' + e.message)
    return null
  }
}

export { getTemplate }

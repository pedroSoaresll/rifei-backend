import * as fs from 'fs'
import * as path from 'path'
// @ts-ignore
import * as mjml2html from 'mjml'

const mjmlPath = '../Emails/mjml'
const htmlPath = '../Emails/html'

const nameTemplateFiles: string[] = fs.readdirSync(
  path.resolve(__dirname, mjmlPath)
)

const getFilesFromMjmlDirectory = (fileName: string): Buffer =>
  fs.readFileSync(path.resolve(__dirname, `${mjmlPath}/${fileName}`))

const transformBufferToString = (fileBuffer: Buffer): string =>
  Buffer.from(fileBuffer).toString('utf-8')

const renderFileToHtml = (file: string): string => mjml2html(file).html

const saveFileRederized = (html: string, index: number): void =>
  fs.writeFileSync(
    path.resolve(
      __dirname,
      `${htmlPath}/${nameTemplateFiles[index].replace('mjml', 'html')}`
    ),
    html
  )

nameTemplateFiles
  .map(getFilesFromMjmlDirectory)
  .map(transformBufferToString)
  .map(renderFileToHtml)
  .map(saveFileRederized)

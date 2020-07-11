import MAILGUN from 'mailgun-js'
import mailgunConfig from '../Config/mailgun'

interface HeaderMailgun {
  to: string;
  subject: string;
  html: string;
}

const mailgun = MAILGUN({
  apiKey: mailgunConfig.apiKey ?? 'not-found',
  domain: mailgunConfig.domain ?? 'not-found',
})

const textDomain = `Pedro Oliveira <pedro.oliveira@${mailgunConfig.domain}>`

const sendEmail = ({
  to,
  subject,
  html,
}: HeaderMailgun): Promise<MAILGUN.messages.SendResponse> => {
  const info = {
    from: textDomain,
    to,
    subject,
    html,
  }

  return new Promise<MAILGUN.messages.SendResponse>((resolve, reject) => {
    mailgun.messages().send(info, (error, body) => {
      if (error) {
        console.error('mailgun error', error)
        reject(error)
        return
      }

      console.log('mailgun success', body)
      resolve(body)
    })
  })
}

export { sendEmail }

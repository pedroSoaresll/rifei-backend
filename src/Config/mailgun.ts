require('dotenv/config')

export default {
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  apiBaseUrl: process.env.MAILGUN_API_BASE_URL
}

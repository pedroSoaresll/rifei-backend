import axios, { AxiosError } from 'axios'
import xml2js, { convertableToString } from 'xml2js'
import qs from 'querystring'
import {
  CreditCardPaymentBody,
  CreditCardPaymentErrorMapped,
  CreditCardPaymentResponse,
  CreditCardTokenBody,
  CreditCardTokenPayload,
  PagSeguroCreditCardPaymentErrors,
  PagSeguroServiceInterface,
  PagSeguroSessionsData,
  PaymentInfoPayload,
} from './interfaces'
import CreditCardPaymentError from 'Errors/CreditCardPaymentError'

const parser = new xml2js.Parser()

const email = encodeURIComponent(process.env.PAGSEGURO_EMAIL)
const token = encodeURIComponent(process.env.PAGSEGURO_TOKEN)

const pagseguroInstance = axios.create({
  baseURL: process.env.PAGSEGURO_URL,
})

const uolInstance = axios.create({
  baseURL: process.env.UOL_URL,
})

function mountCreditCardPayload(
  paymentInfo: PaymentInfoPayload
): CreditCardPaymentBody {
  return {
    ...paymentInfo,
    paymentMode: 'default',
    paymentMethod: 'creditCard',
    receiverEmail: 'pedrodepaivasoaresll@gmail.com',
    currency: 'BRL',
    notificationURL: 'https://sualoja.com.br/notifica.html',
    shippingAddressRequired: 'false',
    installmentQuantity: '1',
  }
}

function mountCreeditCardTokenPayload(
  cardInfo: CreditCardTokenPayload,
  sessionId: string
): CreditCardTokenBody {
  return {
    ...cardInfo,
    sessionId,
  }
}

export default function PagSeguroService(): PagSeguroServiceInterface {
  return {
    async sessions(): Promise<string> {
      const result = await pagseguroInstance.post<convertableToString>(
        `/v2/sessions?email=${email}&token=${token}`
      )

      const data = (await parser.parseStringPromise(
        result.data
      )) as PagSeguroSessionsData

      return data.session.id[0]
    },

    async creditCardPayment(paymentInfo: PaymentInfoPayload) {
      try {
        const creditCardPayload = mountCreditCardPayload(paymentInfo)
        const result = await pagseguroInstance.post<convertableToString>(
          `/v2/transactions?email=${email}&token=${token}`,
          qs.stringify(creditCardPayload),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: '*/*',
            },
          }
        )

        const data = (await parser.parseStringPromise(
          result.data
        )) as CreditCardPaymentResponse

        return data
      } catch (err) {
        const error = err as AxiosError
        const data = (await parser.parseStringPromise(
          error?.response?.data
        )) as PagSeguroCreditCardPaymentErrors
        const errors = data.errors.error.map<CreditCardPaymentErrorMapped>(
          (e) => ({
            code: e.code[0],
            message: e.message[0],
          })
        )

        throw new CreditCardPaymentError(errors)
      }
    },

    async creditCardToken(cardInfo) {
      const sessionId = await PagSeguroService().sessions()
      const payload = mountCreeditCardTokenPayload(cardInfo, sessionId)
      const result = await uolInstance.post<{ token: string }>(
        '/v2/cards',
        qs.stringify(payload)
      )

      return result.data.token
    },
  }
}

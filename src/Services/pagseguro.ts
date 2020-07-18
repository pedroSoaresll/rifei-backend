import axios, { AxiosError } from 'axios'
import xml2js, { convertableToString } from 'xml2js'
import FormData from 'form-data'
import {
  CreditCardPaymentErrorMapped,
  CreditCardPaymentProps,
  PagSeguroCreditCardPaymentErrors,
  PagSeguroServiceInterface,
  PagSeguroSessionsData,
} from './pagseguro.interfaces'

const parser = new xml2js.Parser()

const email = encodeURIComponent(process.env.PAGSEGURO_EMAIL)
const token = encodeURIComponent(process.env.PAGSEGURO_TOKEN)

const pagseguroInstance = axios.create({
  baseURL: process.env.PAGSEGURO_URL,
})

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

    async creditCardPayment({
      body,
    }: CreditCardPaymentProps): Promise<void | CreditCardPaymentErrorMapped[]> {
      const formData = new FormData()
      Object.keys(body).forEach((item) => {
        formData.append(item, body[item])
      })

      try {
        const result = await pagseguroInstance.post<convertableToString>(
          `/v2/transactions?email=${email}&token=${token}`,
          JSON.stringify(body)
        )
        const data = await parser.parseStringPromise(result.data)

        console.log(data)
        return
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

        return errors
      }
    },
  }
}

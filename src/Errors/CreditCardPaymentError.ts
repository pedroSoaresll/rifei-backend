import { CreditCardPaymentErrorMapped } from 'Services/interfaces'

export default class CreditCardPaymentError extends Error {
  public data: CreditCardPaymentErrorMapped[] = []

  constructor(data: CreditCardPaymentErrorMapped[]) {
    super()
    this.data = data
  }
}

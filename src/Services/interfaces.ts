import { ParsedUrlQueryInput } from 'querystring'

export interface PagSeguroServiceInterface {
  sessions(): Promise<string>
  creditCardPayment(
    props: PaymentInfoPayload
  ): Promise<CreditCardPaymentResponse>
  creditCardToken(props: CreditCardTokenPayload): Promise<string>
}

export interface PagSeguroSessionsData {
  session: {
    id: string[]
  }
}

export interface PagSeguroCreditCardPaymentError {
  code: string[]
  message: string[]
}

export interface PagSeguroCreditCardPaymentErrors {
  errors: {
    error: PagSeguroCreditCardPaymentError[]
  }
}

export interface CreditCardPaymentErrorMapped {
  code: string
  message: string
}

export interface PaymentInfoPayload {
  creditCardToken: string
  reference: string
  senderHash: string
  itemId1: string
  itemDescription1: string
  itemAmount1: string
  itemQuantity1: string
  senderName: string
  senderCPF: string
  senderAreaCode: string
  senderPhone: string
  senderEmail: string
  installmentValue: string
  creditCardHolderName: string
  creditCardHolderCPF: string
  creditCardHolderBirthDate: string
  creditCardHolderAreaCode: string
  creditCardHolderPhone: string
  billingAddressStreet: string
  billingAddressNumber: string
  billingAddressComplement: string
  billingAddressDistrict: string
  billingAddressPostalCode: string
  billingAddressCity: string
  billingAddressState: string
  billingAddressCountry: string
}

export interface CreditCardPaymentBody
  extends PaymentInfoPayload,
  ParsedUrlQueryInput {
  paymentMode: string
  paymentMethod: string
  receiverEmail: string
  currency: string
  notificationURL: string
  shippingAddressRequired: string
  installmentQuantity: string
}

export interface CreditCardPaymentProps {
  body: CreditCardPaymentBody
}

export interface CreditCardTokenPayload {
  cardNumber: number
  cardCvv: number
  cardExpirationMonth: number
  cardExpirationYear: number
}

export interface CreditCardTokenBody
  extends CreditCardTokenPayload,
  ParsedUrlQueryInput {
  sessionId: string
}

export interface CreditCardPaymentResponse {
  transaction: {
    date: string[]
    code: string[]
    reference: string[]
    type: number[]
    status: number[]
    lastEventDate: string[]
    paymentMethod: [
      {
        type: number[]
        code: number[]
      }
    ]
    grossAmount: number[]
    discountAmount: number[]
    feeAmount: number[]
    netAmount: number[]
    extraAmount: number[]
    installmentCount: number[]
    itemCount: number[]
    items: [
      {
        item: [
          {
            id: number[]
            description: string[]
            quantity: number[]
            amount: number[]
          }
        ]
      }
    ]
    sender: [
      {
        name: string[]
        email: string[]
        phone: [
          {
            areaCode: number[]
            number: number[]
          }
        ]
        documents: [
          {
            document: [
              {
                type: string[]
                value: number[]
              }
            ]
          }
        ]
      }
    ]
    gatewaySystem: {
      type: string[]
      authorizationCode: number[]
      nsu: number[]
      tid: number[]
      establishmentCode: number[]
      acquirerName: string[]
    }
  }
}

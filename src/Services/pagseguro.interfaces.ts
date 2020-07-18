export interface PagSeguroServiceInterface {
  sessions(): Promise<string>;
  creditCardPayment(props: CreditCardPaymentProps): Promise<void | CreditCardPaymentErrorMapped[]>;
}

export interface PagSeguroSessionsData {
  session: {
    id: string[];
  };
}

export interface PagSeguroCreditCardPaymentError {
  code: string[];
  message: string[];
}

export interface PagSeguroCreditCardPaymentErrors {
  errors: {
    error: PagSeguroCreditCardPaymentError[];
  };
}

export interface CreditCardPaymentErrorMapped {
  code: string;
  message: string;
}

export interface CreditCardPaymentBody {
  paymentMode: string;
  paymentMethod: string;
  receiverEmail: string;
  currency: string;
  itemId1: string;
  itemDescription1: string;
  itemAmount1: string;
  itemQuantity1: string;
  notificationURL: string;
  reference: string;
  senderName: string;
  senderCPF: string;
  senderAreaCode: string;
  senderPhone: string;
  senderEmail: string;
  senderHash: string;
  shippingAddressRequired: string;
  creditCardToken: string;
  installmentQuantity: string;
  installmentValue: string;
  creditCardHolderName: string;
  creditCardHolderCPF: string;
  creditCardHolderBirthDate: string;
  creditCardHolderAreaCode: string;
  creditCardHolderPhone: string;
  billingAddressStreet: string;
  billingAddressNumber: string;
  billingAddressComplement: string;
  billingAddressDistrict: string;
  billingAddressPostalCode: string;
  billingAddressCity: string;
  billingAddressState: string;
  billingAddressCountry: string;
}

export interface CreditCardPaymentProps {
  body: CreditCardPaymentBody;
}

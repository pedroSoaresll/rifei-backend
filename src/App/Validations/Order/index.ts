import * as yup from 'yup'
import { NextFunction, Request, Response } from 'express'

export async function createOrderValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({
    raffleId: yup.string().required(),
    raffles: yup
      .array(
        yup.object().shape({
          code: yup.string().required(),
        })
      )
      .min(1),
    paymentInfo: yup.object().shape({
      itemQuantity1: yup.number().required(),
      senderName: yup.string().required(),
      senderCPF: yup.string().required(),
      senderAreaCode: yup.string().required(),
      senderPhone: yup.string().required(),
      senderEmail: yup.string().required(),
      senderHash: yup.string().required(),
      shippingAddressRequired: yup.string().required(),
      installmentValue: yup.string().required(),
      creditCardHolderName: yup.string().required(),
      creditCardHolderCPF: yup.string().required(),
      creditCardHolderBirthDate: yup.string().required(),
      creditCardHolderAreaCode: yup.string().required(),
      creditCardHolderPhone: yup.string().required(),
      billingAddressStreet: yup.string().required(),
      billingAddressNumber: yup.string().required(),
      billingAddressComplement: yup.string().required(),
      billingAddressDistrict: yup.string().required(),
      billingAddressPostalCode: yup.string().required(),
      billingAddressCity: yup.string().required(),
      billingAddressState: yup.string().required(),
      billingAddressCountry: yup.string().required(),
      cardCvv: yup.number().required(),
      cardNumber: yup.number().required(),
      cardExpirationYear: yup.number().required(),
      cardExpirationMonth: yup.number().required(),
    }),
  })

  try {
    await schema.validate(req.body)
    return next()
  } catch (err) {
    const error = err as yup.ValidationError
    return res.status(400).json(error.errors)
  }
}

import OrderModel from 'App/Models/Order'
import RaffleBoughtModel from 'App/Models/RaffleBought'

import PagseguroService from 'Services/pagseguro'
import { OrdersPackageInterface, OrdersPackageProps } from './interfaces'

export function OrdersPackage({
  pagseguroService = PagseguroService(),
}: OrdersPackageProps = {}): OrdersPackageInterface {
  return {
    async create({
      userParticipant,
      rafflesInstance,
      paymentInfo,
      rafflesBought,
    }) {
      const totalAmount = rafflesInstance.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.rafflePrice,
        0
      )

      const order = await OrderModel.create(
        {
          totalAmount,
          userParticipantId: userParticipant.id,
          rafflesBought,
        },
        {
          include: [
            {
              model: RaffleBoughtModel,
              as: 'rafflesBought',
            },
          ],
        }
      )

      const reference = order.id
      const {
        cardCvv,
        cardExpirationMonth,
        cardExpirationYear,
        cardNumber,
        ...restPaymentInfo
      } = paymentInfo

      const creditCardToken = await pagseguroService.creditCardToken({
        cardCvv,
        cardExpirationMonth,
        cardExpirationYear,
        cardNumber,
      })

      const payment = await pagseguroService.creditCardPayment({
        ...restPaymentInfo,
        creditCardToken,
        reference,
      })

      // save code return in order to reference it

      console.log('payment log: ', payment)

      return order
    },
  }
}

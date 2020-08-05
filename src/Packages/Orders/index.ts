import OrderModel, { OrderStatus } from 'App/Models/Order'
import RaffleBoughtModel from 'App/Models/RaffleBought'

import PagseguroService from 'Services/pagseguro'
import { OrdersPackageInterface, OrdersPackageProps } from './interfaces'

export function OrdersPackage({
  pagseguroService = PagseguroService(),
}: OrdersPackageProps = {}): OrdersPackageInterface {
  return {
    async create({
      userParticipant,
      raffleInstance,
      paymentInfo,
      rafflesBought,
    }) {
      const totalAmount = raffleInstance.rafflePrice * paymentInfo.itemQuantity1

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

      try {
        const payment = await pagseguroService.creditCardPayment({
          ...restPaymentInfo,
          creditCardToken,
          reference,
          itemId1: raffleInstance.id,
          itemDescription1: raffleInstance.description,
          itemAmount1: (raffleInstance.rafflePrice.toFixed(
            2
          ) as unknown) as number,
          installmentValue: totalAmount.toFixed(2),
        })

        console.log('payment log: ', payment)

        order.paymentCode = payment.transaction.code[0]
        await order.save()
      } catch (err) {
        console.log('error to get payment', err)
        order.status = OrderStatus.CANCELED
        await order.save()
      }

      return order
    },
  }
}

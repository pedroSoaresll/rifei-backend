import { UserParticipantInstance } from 'App/Models/UserParticipant'
import { RaffleInstance } from 'App/Models/Raffle'
import { PagSeguroServiceInterface } from 'Services/interfaces'
import { OrderInstance } from 'App/Models/Order'
import { UserPaymentInfoPayload } from 'App/Controllers/OrdersController'

export interface RafflesBoughtPayload {
  raffleId: string
  raffleNumber: number
  isRaffled: boolean
}

export interface OrdersPackageCreateParams {
  userParticipant: UserParticipantInstance
  raffleInstance: RaffleInstance
  rafflesBought: RafflesBoughtPayload[]
  paymentInfo: UserPaymentInfoPayload
}

export interface OrdersPackageInterface {
  create(props: OrdersPackageCreateParams): Promise<OrderInstance>
}
export interface OrdersPackageProps {
  pagseguroService?: PagSeguroServiceInterface
}

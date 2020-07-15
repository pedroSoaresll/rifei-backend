import { Request, Response } from 'express'

class OrdersController {
  async store(req: Request, res: Response) {
    // pegar o usuario participante da requisicao
    // receber as rifas que quer comprar
    // calcular o valor total
    // definir o status do pagamento para processando
    // criar objeto de pedido e salvar o novo pedido
    // salvar as rifas na tabela de rifas compradas

    return res.status(200).json({
      userAuthorizated: req.userParticipant
    })
  }
}

export default new OrdersController()

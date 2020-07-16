import { Model, DataTypes, Optional } from 'sequelize'
import sequelizeInstance from 'Databases/mysql'
import RaffleModel from './Raffle'
import OrderModel from './Order'

export interface RaffleBoughtAttributes {
  id: string;
  raffleId: string;
  orderId?: string;
  raffleNumber: number;
  isRaffled: boolean;
}

export type RaffleBoughtCreationAttributes = Optional<RaffleBoughtAttributes, 'id'>

interface RaffleBoughtInstance extends Model<RaffleBoughtAttributes, RaffleBoughtCreationAttributes>, RaffleBoughtAttributes {}

const RaffleBoughtModel = sequelizeInstance.define<RaffleBoughtInstance>('RaffleBought', {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  raffleId: {
    type: DataTypes.UUIDV4,
    references: {
      model: RaffleModel,
      key: 'id'
    },
    allowNull: false
  },
  orderId: {
    type: DataTypes.UUIDV4,
    references: {
      model: OrderModel,
      key: 'id'
    },
    allowNull: false
  },
  raffleNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isRaffled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'raffles_bought'
})

RaffleBoughtModel.belongsTo(RaffleModel, {
  as: 'raffle'
})

// RaffleBoughtModel.belongsTo(OrderModel, {
//   as: 'order'
// })

export default RaffleBoughtModel

import { Model, DataTypes, Optional } from 'sequelize'
import sequelizeInstance from 'Databases/mysql'
import UserParticipantModel from './UserParticipant'
import RaffleBoughtModel, { RaffleBoughtCreationAttributes } from './RaffleBought'

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

interface OrderAttributes {
  id: string;
  userParticipantId: string;
  totalAmount: number;
  paymentCode?: string;
  status?: string;
  rafflesBought?: RaffleBoughtCreationAttributes[];
}

type OrderCreationAttributes = Optional<OrderAttributes, 'id'>

interface OrderInstance extends Model<OrderAttributes, OrderCreationAttributes>, OrderAttributes {}

const OrderModel = sequelizeInstance.define<OrderInstance>('Order', {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userParticipantId: {
    type: DataTypes.UUIDV4,
    references: {
      model: UserParticipantModel,
      key: 'id'
    },
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.FLOAT(5, 2),
    allowNull: false,
  },
  paymentCode: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: OrderStatus.PENDING
  }
}, {
  tableName: 'orders'
})

OrderModel.belongsTo(UserParticipantModel, {
  as: 'userParticipant'
})

OrderModel.hasMany(RaffleBoughtModel, {
  as: 'rafflesBought',
  foreignKey: 'orderId'
})

export default OrderModel

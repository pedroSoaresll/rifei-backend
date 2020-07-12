import { Model, DataTypes, Optional } from 'sequelize'
import sequelizeInstance from 'Databases/mysql'
import UserOwnerModel from './UserOwner'

interface RaffleAttributes {
  id: string;
  userOwnerId: string;
  photo: string;
  name: string;
  description: string;
  productPrice: number;
  rafflePrice: number;
  code: string;
  endDate: string;
  city: string;
  state: string;
}

type RaffleCreationAttributes = Optional<RaffleAttributes, 'id'>

interface RaffleInstance extends Model<RaffleAttributes, RaffleCreationAttributes>, RaffleAttributes {}

const RaffleModel = sequelizeInstance.define<RaffleInstance>('Raffle', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  userOwnerId: {
    type: DataTypes.UUIDV4,
    references: {
      model: UserOwnerModel,
      key: 'id'
    },
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productPrice: {
    type: DataTypes.FLOAT(5, 2),
    allowNull: false
  },
  rafflePrice: {
    type: DataTypes.FLOAT(5, 2),
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'raffles'
})

RaffleModel.belongsTo(UserOwnerModel, {
  as: 'userOwner'
})

export default RaffleModel

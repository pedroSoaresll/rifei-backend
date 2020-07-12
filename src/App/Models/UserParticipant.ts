import { Model, DataTypes, Optional } from 'sequelize'
import sequelizeInstance from 'Databases/mysql'
import UserModel from './User'
import AddressModel from './Address'

interface UserParticipantAttributes {
  id: string;
  userId: string;
  addressId: string;
}

type UserParticipantCreationAttributes = Optional<UserParticipantAttributes, 'id'>

interface UserParticipantInstance extends Model<UserParticipantAttributes, UserParticipantCreationAttributes>, UserParticipantAttributes {}

const UserParticipantModel = sequelizeInstance.define<UserParticipantInstance>('UserParticipant', {
  id: {
    primaryKey: true,
    type: DataTypes.UUIDV4
  },
  userId: {
    type: DataTypes.UUIDV4,
    references: {
      model: UserModel,
      key: 'id'
    }
  },
  addressId: {
    type: DataTypes.UUIDV4,
    references: {
      model: AddressModel,
      key: 'id'
    }
  }
}, {
  tableName: 'users_participant',
  timestamps: false,
})

UserParticipantModel.belongsTo(UserModel, {
  as: 'user'
})

export default UserParticipantModel

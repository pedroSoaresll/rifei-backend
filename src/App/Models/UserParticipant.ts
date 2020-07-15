import { Model, DataTypes, Optional, BelongsTo, Sequelize } from 'sequelize'
import sequelizeInstance from 'Databases/mysql'
import UserModel, { UserInstance, UserCreationAttributes } from './User'
import AddressModel from './Address'

export interface UserParticipantAttributes {
  id: string;
  userId?: string;
  addressId?: string;
  user?: UserCreationAttributes;
}

export type UserParticipantCreationAttributes = Optional<UserParticipantAttributes, 'id'>

export interface UserParticipantInstance extends Model<UserParticipantAttributes, UserParticipantCreationAttributes>, UserParticipantAttributes {}

const UserParticipantModel = sequelizeInstance.define<UserParticipantInstance>('UserParticipant', {
  id: {
    primaryKey: true,
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
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

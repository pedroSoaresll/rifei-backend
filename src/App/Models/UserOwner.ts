import { Model, DataTypes, Optional } from 'sequelize'
import sequelizeInstance from 'Databases/mysql'
import UserModel from './User'

interface UserOwnerAttributes {
  id: string;
  userId: string;
  document: string;
  documentPhotoProof: string;
}

type UserOwnerCreationAttributes = Optional<UserOwnerAttributes, 'id'>

interface UserOwnerInstance extends Model<UserOwnerAttributes, UserOwnerCreationAttributes>, UserOwnerAttributes {}

const UserOwnerModel = sequelizeInstance.define<UserOwnerInstance>('UserOwner', {
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
  document: DataTypes.STRING,
  documentPhotoProof: DataTypes.STRING
}, {
  tableName: 'users_owner',
  timestamps: false,
})

UserOwnerModel.belongsTo(UserModel, {
  as: 'user',
})

export default UserOwnerModel

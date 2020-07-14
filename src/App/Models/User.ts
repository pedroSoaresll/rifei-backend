import { Model, DataTypes, Optional } from 'sequelize'
import sequelizeInstance from 'Databases/mysql'

interface UserAttributes {
  id: string;
  name: string;
  photo: string;
  email: string;
  phone: string;
  googleId: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const UserModel = sequelizeInstance.define<UserInstance>('User', {
  id: {
    primaryKey: true,
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: DataTypes.STRING,
  googleId: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
})

export default UserModel

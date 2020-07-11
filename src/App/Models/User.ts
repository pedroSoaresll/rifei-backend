import { Model, DataTypes, Optional } from 'sequelize'
import sequelizeInstance from 'Databases/mysql'

interface UserAttributes {
  id: string;
  name: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const UserModel = sequelizeInstance.define<UserInstance>('User', {
  id: {
    primaryKey: true,
    type: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING
  }
})

export default UserModel

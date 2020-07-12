import { Model, DataTypes, Optional } from 'sequelize'
import sequelizeInstance from 'Databases/mysql'

interface AddressAttributes {
  id: string;
  postalCode: string;
  name: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  complement: string;
}

type AddressCreationAttributes = Optional<AddressAttributes, 'id'>

interface AddressInstance extends Model<AddressAttributes, AddressCreationAttributes>, AddressAttributes {}

const AddressModel = sequelizeInstance.define<AddressInstance>('Address', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  complement: DataTypes.STRING,
}, {
  tableName: 'addresses'
})

export default AddressModel

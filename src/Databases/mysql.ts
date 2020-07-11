import { Sequelize } from 'sequelize'

console.log('how much instances')

export default new Sequelize(process.env.MYSQL_URI)

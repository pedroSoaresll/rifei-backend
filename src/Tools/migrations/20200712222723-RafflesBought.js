'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('raffles_bought', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      raffleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'raffles'
          },
          key: 'id'
        }
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'orders'
          },
          key: 'id'
        }
      },
      raffleNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isRaffled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('raffles_bought')
  }
}

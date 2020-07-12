'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      userParticipantId: {
        type: Sequelize.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'users_participant'
          },
          allowNull: false,
        }
      },
      totalAmount: {
        type: Sequelize.FLOAT(5, 2),
        allowNull: false
      },
      paymentCode: Sequelize.STRING,
      status: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('orders')
  }
}

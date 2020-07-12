'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('raffles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      userOwnerId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'users_owner'
          },
          key: 'id'
        },
        allowNull: false
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productPrice: {
        type: Sequelize.FLOAT(5, 2),
        allowNull: false
      },
      rafflePrice: {
        type: Sequelize.FLOAT(5, 2),
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('raffles')
  }
}

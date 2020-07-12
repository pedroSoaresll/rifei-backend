'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users_participant', [
      {
        id: 'd4aa3f29-7b14-4bf8-9e61-c517c3622219',
        userId: 'bd999906-72dd-4e04-b4b2-c7feda689642',
        addressId: '296955ee-449d-4aed-b5e3-f231e02a9a75',
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('users_participant', null, {})
  }
}

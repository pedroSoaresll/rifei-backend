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

    await queryInterface.bulkInsert('users', [
      {
        id: 'bd999906-72dd-4e04-b4b2-c7feda689642',
        name: 'Pedro Olivera',
        photo: 'photo_here',
        email: 'pedro@email.com',
        phone: '11986246055',
        googleId: 'google-key',
        createdAt: '2020-06-20T23:30:25',
        updatedAt: '2020-06-20T23:30:25'
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
    await queryInterface.bulkDelete('users', null, {})
  }
}

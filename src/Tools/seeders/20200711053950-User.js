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
      },
      {
        id: '44292512-d662-4867-aee8-0406ae4c70f8',
        name: 'Caroline Bicouv',
        photo: 'photo_here',
        email: 'carol@email.com',
        phone: '11293882938',
        googleId: 'google-key',
        createdAt: '2020-06-25T23:30:25',
        updatedAt: '2020-06-25T23:30:25'
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

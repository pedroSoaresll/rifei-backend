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
    await queryInterface.bulkInsert('raffles', [
      {
        id: 'fbaa4e00-9c69-4d94-b3a5-73719e92cf7e',
        userOwnerId: '95a48543-1952-4677-bfac-fd51c68af35c',
        photo: 'photo_here',
        name: 'Baton Top',
        description: 'Este baton eh top daquele jeito',
        productPrice: 150.30,
        rafflePrice: 5,
        code: 'FQ980D',
        endDate: '2020-12-25T07:15:31',
        city: 'Barueri',
        state: 'SP',
        createdAt: '2020-12-01T12:32:22',
        updatedAt: '2020-12-01T12:32:22',
      },
      {
        id: '42df7a8c-22e7-4c75-afeb-36433fe7b8fe',
        userOwnerId: '95a48543-1952-4677-bfac-fd51c68af35c',
        photo: 'photo_here',
        name: 'Kit de sombras + Pincel',
        description: 'Este eh um kit de sombras + pincel',
        productPrice: 180.30,
        rafflePrice: 10,
        code: 'GQ9C200',
        endDate: '2020-09-12T07:15:31',
        city: 'Barueri',
        state: 'SP',
        createdAt: '2020-12-01T12:32:22',
        updatedAt: '2020-12-01T12:32:22',
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
    await queryInterface.bulkDelete('raffles', null, {})
  }
}

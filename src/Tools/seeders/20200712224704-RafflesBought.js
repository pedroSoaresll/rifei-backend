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
    await queryInterface.bulkInsert('raffles_bought', [
      {
        id: '80ab7db1-b787-4b8e-8ed9-7f6e51c785f9',
        raffleId: 'fbaa4e00-9c69-4d94-b3a5-73719e92cf7e',
        orderId: 'e9a17671-9627-4592-97c4-30f0c8a37d01',
        raffleNumber: '396',
        isRaffled: false,
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
    await queryInterface.bulkDelete('raffles_bought', null, {})
  }
}

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
    await queryInterface.bulkInsert('orders', [
      {
        id: 'e9a17671-9627-4592-97c4-30f0c8a37d01',
        userParticipantId: 'd4aa3f29-7b14-4bf8-9e61-c517c3622219',
        totalAmount: 15,
        paymentCode: '3651CCDBEFD64BBEB73170B009CDC113',
        status: 'PENDING',
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
    await queryInterface.bulkDelete('orders', null, {})
  }
}

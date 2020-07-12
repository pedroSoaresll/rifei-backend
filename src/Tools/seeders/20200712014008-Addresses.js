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
    await queryInterface.bulkInsert('addresses', [
      {
        id: '296955ee-449d-4aed-b5e3-f231e02a9a75',
        postalCode: '06449300',
        name: 'Estrada das Pitas',
        number: '952',
        neighborhood: 'Parque Viana',
        city: 'Barueri',
        state: 'Sao Paulo',
        country: 'BR',
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
    await queryInterface.bulkDelete('addresses', null, {})
  }
}

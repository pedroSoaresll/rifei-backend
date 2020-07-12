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
    await queryInterface.bulkInsert('users_owner', [
      {
        id: '95a48543-1952-4677-bfac-fd51c68af35c',
        userId: '44292512-d662-4867-aee8-0406ae4c70f8',
        document: '46174144879',
        documentPhotoProof: 'photo_here',
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
    await queryInterface.bulkDelete('users_owner', null, {})
  }
}

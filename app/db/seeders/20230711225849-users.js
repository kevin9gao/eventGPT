'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
    {
      email: 'demo@user.io',
      username: 'Demolish Mang',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'kevin@event.io',
      username: 'kevin',
      hashedPassword: bcrypt.hashSync('password'),
      bio: "y'all fukken wit events?",
      address: "420 Spin Block, Skreetsdale, California, 91748",
      profilePicUrl: "https://i.kym-cdn.com/photos/images/newsfeed/001/488/512/a52.jpg",
    },
    {
      email: 'brian@event.io',
      username: 'brian',
      hashedPassword: bcrypt.hashSync('password'),
      bio: "X gon give it to ya, furthermore, he gon deliva to ya.",
      address: "69 Spin Block, Skreetsdale, California, 91748",
      profilePicUrl: "https://i.kym-cdn.com/entries/icons/medium/000/024/062/jerry.jpg",
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      eventType: {
        type: Sequelize.STRING(50)
      },
      eventLink: {
        type: Sequelize.STRING(1000)
      },
      size: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      coverImageUrl: {
        type: Sequelize.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};

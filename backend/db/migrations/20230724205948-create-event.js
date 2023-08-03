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
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      location: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      eventType: {
        type: Sequelize.STRING(50)
      },
      eventLink: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        unique: true,
      },
      size: {
        type: Sequelize.INTEGER
      },
      tickets: {
        type: Sequelize.ARRAY(Sequelize.STRING)
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

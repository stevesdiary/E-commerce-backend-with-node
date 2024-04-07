'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      order_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      quantity: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      order_number: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};

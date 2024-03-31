'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      product_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      variation_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
      allowNull: false
      },
      discount: {
        type: Sequelize.FLOAT,
      allowNull: false
      },
      in_stock: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};

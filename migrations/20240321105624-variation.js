'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Variations', {
      variation_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      colour: {
        type: Sequelize.STRING,
        allowNull: true
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false
      },
      style: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.TINYINT,
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
    })
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('Variations');
     
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Education', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false
      },
      university_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      faculty: {
        type: Sequelize.STRING,
        allowNull: false
      },
      major: {
        type: Sequelize.STRING,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      resumeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Resumes', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Education');
  }
};

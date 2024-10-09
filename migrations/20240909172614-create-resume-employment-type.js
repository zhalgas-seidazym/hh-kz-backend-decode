'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ResumeEmploymentTypes', {
      resumeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Resumes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      employment_typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EmploymentTypes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ResumeEmploymentTypes');
  }
};

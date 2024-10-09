'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EmploymentTypes', [
      { name: 'Полная занятость' }, 
      { name: 'Частичная занятость' }, 
      { name: 'Проектная работа' }, 
      { name: 'Волентерство' },
      { name: 'Стажировка' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EmploymentTypes', null, {});
  }
};
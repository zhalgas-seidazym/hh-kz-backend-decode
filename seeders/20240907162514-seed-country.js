'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Countries', [
      { name: 'Россия' }, // Russia
      { name: 'Украина' }, // Ukraine
      { name: 'Беларусь' }, // Belarus
      { name: 'Казахстан' }, // Kazakhstan
      { name: 'Армения' }, // Armenia
      { name: 'Азербайджан' }, // Azerbaijan
      { name: 'Грузия' }, // Georgia
      { name: 'Молдова' }, // Moldova
      { name: 'Узбекистан' }, // Uzbekistan
      { name: 'Таджикистан' }, // Tajikistan
      { name: 'Киргизия' }, // Kyrgyzstan
      { name: 'Туркменистан' }  // Turkmenistan
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};

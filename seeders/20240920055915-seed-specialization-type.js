'use strict';

const axios = require('axios')

module.exports = {
  async up(queryInterface, Sequelize) {
    const response = await axios.get('https://api.hh.ru/specializations');
      const specializationTypes = response.data;

    const specializationTypesUpdated = specializationTypes.map(item => {
      return {
        name: item["name"]
      }
    })
    
    const specializations = []
    specializationTypes.forEach((item, index) => {
      item["specializations"].forEach(spec => {
        specializations.push({
          name: spec["name"],
          specialization_typeId: index + 1
        })
      })
    })

    await queryInterface.bulkInsert('SpecializationTypes', specializationTypesUpdated, {});

    await queryInterface.bulkInsert('Specializations', specializations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpecializationTypes', null, {});
  }
};
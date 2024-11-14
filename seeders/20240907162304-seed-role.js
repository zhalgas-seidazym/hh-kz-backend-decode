const Role = require('../app/auth/models/Role')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Role.bulkCreate([
            {
            name: 'employee',
            },
            {
            name: 'manager',
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', {
        name: ['employee', 'manager']
    });
    }
}
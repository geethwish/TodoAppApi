'use strict';
const bcrypt = require('bcrypt')

module.exports = {
    async up(queryInterface, Sequelize) {

        const hashedPassword = await bcrypt.hash('password', salt)

        return queryInterface.bulkInsert('Users', [{
            name: 'Super Admin',
            email: 'admin@todo.com',
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};

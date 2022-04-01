'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
            name: 'Super Admin',
            email: 'admin@todo.com',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};

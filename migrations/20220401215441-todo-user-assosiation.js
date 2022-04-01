'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.addConstraint(
            'Todos',
            {
                fields: ['userId'],
                type: 'foreign key',
                name: 'todos_user_association',
                references: {
                    table: 'Users',
                    field: 'id'
                }
            }
        )
    },

    async down(queryInterface, Sequelize) {
        queryInterface.removeConstraint(
            'Todos',
            {
                fields: ['userId'],
                type: 'foreign key',
                name: 'todos_user_association',
                references: {
                    table: 'Users',
                    field: 'id'
                }
            }
        )
    }
};

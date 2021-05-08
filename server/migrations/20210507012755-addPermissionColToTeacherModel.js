'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Teachers', 'permission_level', {
            type: Sequelize.STRING
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Teachers', 'permission_level', { type: Sequelize.INTEGER });
    }
};

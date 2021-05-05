'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Teachers', 'email', {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        });
        await queryInterface.addColumn('Teachers', 'hash', {
            type: Sequelize.STRING,
            allowNull: false
        });
        await queryInterface.addColumn('Teachers', 'phone', { type: Sequelize.STRING });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Teachers', 'email', { type: Sequelize.INTEGER });
        await queryInterface.removeColumn('Teachers', 'phone', { type: Sequelize.INTEGER });
        await queryInterface.removeColumn('Teachers', 'hash', { type: Sequelize.INTEGER });
    }
};

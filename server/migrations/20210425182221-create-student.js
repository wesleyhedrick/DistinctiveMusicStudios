'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Students', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            first: {
                type: Sequelize.STRING
            },
            last: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            remote_student: {
                type: Sequelize.BOOLEAN
            },
            remote_lesson: {
                type: Sequelize.BOOLEAN
            },
            lesson_day: {
                type: Sequelize.INTEGER
            },
            lesson_time: {
                type: Sequelize.INTEGER
            },
            lesson_length: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.INTEGER
            },
            instrument_1: {
                type: Sequelize.INTEGER
            },
            instrument_2: {
                type: Sequelize.INTEGER
            },
            instrument_3: {
                type: Sequelize.INTEGER
            },
            teacher: {
                type: Sequelize.INTEGER
            },
            first_lesson: {
                type: Sequelize.DATE
            },
            notes: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Students');
    }
};
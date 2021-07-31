'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */



        // await queryInterface.addColumn('Students', 'lesson_location', { type: Sequelize.INTEGER });
        // await queryInterface.addColumn('Students', 'age', { type: Sequelize.INTEGER });
        // await queryInterface.addColumn('Students', 'email', { type: Sequelize.STRING });


    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        await queryInterface.addColumn('Students', 'remote_student', { type: Sequelize.INTEGER });
        await queryInterface.addColumn('Students', 'remote_lesson', { type: Sequelize.INTEGER });
        await queryInterface.removeColumn('Students', 'lesson_location');
        await queryInterface.removeColumn('Students', 'age');
        await queryInterface.removeColumn('Students', 'email');
        await queryInterface.removeColumn('Students', 'phone');

    }
};

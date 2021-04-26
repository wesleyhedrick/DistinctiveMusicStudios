'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Student.init({
        first: DataTypes.STRING,
        last: DataTypes.STRING,
        phone: DataTypes.STRING,
        remote_student: DataTypes.BOOLEAN,
        remote_lesson: DataTypes.BOOLEAN,
        lesson_day: DataTypes.INTEGER,
        lesson_time: DataTypes.INTEGER,
        lesson_length: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        instrument_1: DataTypes.INTEGER,
        instrument_2: DataTypes.INTEGER,
        instrument_3: DataTypes.INTEGER,
        teacher: DataTypes.INTEGER,
        first_lesson: DataTypes.DATE,
        notes: DataTypes.STRING
    }, {
            sequelize,
            modelName: 'Student',
        });
    return Student;
};
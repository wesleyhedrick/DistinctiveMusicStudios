'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reports extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Reports.belongsTo(models.Teacher, {
                foreignKey: 'teacher'
            })
        }
    };
    Reports.init({
        date: DataTypes.DATE,
        teacher: DataTypes.INTEGER,
        student: DataTypes.STRING,
        time_slot: DataTypes.INTEGER,
        time_length: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Reports',
    });
    return Reports;
};
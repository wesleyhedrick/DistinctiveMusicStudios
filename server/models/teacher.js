'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Teacher.init({
        first: DataTypes.STRING,
        last: DataTypes.STRING,
        instrument_1: DataTypes.INTEGER,
        instrument_2: DataTypes.INTEGER,
        instrument_3: DataTypes.INTEGER,
        instrument_4: DataTypes.INTEGER,
        instrument_5: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        date_hired: DataTypes.DATE,
        phone: DataTypes.STRING,
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        hash: { type: DataTypes.STRING, allowNull: false }

    }, {
            sequelize,
            modelName: 'Teacher',
        });
    return Teacher;
};
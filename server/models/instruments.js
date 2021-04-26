'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Instruments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    instruments.init({
        name: DataTypes.STRING,
        class: DataTypes.STRING
    }, {
            sequelize,
            modelName: 'Instruments',
        });
    return instruments;
};
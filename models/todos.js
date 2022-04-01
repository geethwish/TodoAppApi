'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Todos extends Model {

        static associate(models) {

            models.User.hasMany(Todos);
        }
    }
    Todos.init({
        task: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Todos',
    });
    return Todos;
};
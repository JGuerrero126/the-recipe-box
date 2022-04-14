const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serves: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    prep_time : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cook_time : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rest_time : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    directions: {
      type: DataTypes.TEXT,
    },
    imageURL: {
        type: DataTypes.STRING,
    },
    createdby: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Recipe;

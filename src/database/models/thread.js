'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    static associate(models) {
      // define association here
      Thread.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Thread.init({
    text: {
      type: DataTypes.TEXT,
      allowNull: false, 
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true, 
      validate: {
        isUrl: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id', 
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Thread',
  });
  return Thread;
};
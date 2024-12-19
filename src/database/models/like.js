'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // belongs to one Thread
      Like.belongsTo(models.Thread, {
        foreignKey: 'threadId',
        as: 'thread',
      });

      //belongs to one User
      Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Like.init(
    {
      threadId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: 'Threads', 
          key: 'id', 
        },
        onDelete: 'CASCADE',
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
    },
    {
      sequelize,
      modelName: 'Like',
      tableName: 'Likes',
    }
  );

  return Like;
};

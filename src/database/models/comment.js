'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongs to one Thread
      Comment.belongsTo(models.Thread, {
        foreignKey: 'threadId',
        as: 'thread',
      });

      //  belongs to one User
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Comment.init(
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false, 
      },
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
      modelName: 'Comment',
    }
  );

  return Comment;
};

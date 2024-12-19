'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      // Associate the follower with a user
      Follow.belongsTo(models.User, {
        foreignKey: 'followerId',
        as: 'follower',
      });

      // Associate the followed user with another user
      Follow.belongsTo(models.User, {
        foreignKey: 'followingId',
        as: 'following',
      });
    }
  }
  Follow.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Primary key of the Follow table
      },
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Name of the Users table
          key: 'id', // Primary key in the Users table
        },
        onDelete: 'CASCADE', // Optional: Cascade delete for related data
      },
      followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Name of the Users table
          key: 'id', // Primary key in the Users table
        },
        onDelete: 'CASCADE', // Optional: Cascade delete for related data
      },
    },
    {
      sequelize,
      modelName: 'Follow',
    }
  );
  return Follow;
};

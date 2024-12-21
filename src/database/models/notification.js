'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Notification.belongsTo(models.User, {
        foreignKey: 'sourceId',
        as: 'sourceUser',
      });

      
      Notification.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'recipientUser',
      });
    }
  }

  Notification.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sourceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
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
      isSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      type: {
        type: DataTypes.ENUM('LIKE', 'FOLLOW', 'COMMENT'), 
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'Notifications',
    }
  );

  return Notification;
};

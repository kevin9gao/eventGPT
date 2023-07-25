'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000]
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    eventType: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    eventLink: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000]
      }
    },
    size: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    coverImageUrl: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000]
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};

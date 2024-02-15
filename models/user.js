'use strict';
const {
  Model,
  UUID,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUID
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First name cannot be empty.",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name cannot be empty.",
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email format, kindly enter a valid email.',
        },
      },
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isPhoneNumber(value) {
          const phoneRegex = /^\d{13}$/; // Example: Allow only 10-digit numbers
          if (!phoneRegex.test(value)) {
            throw new Error('Invalid phone number format, include the country code');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email format, kindly enter a valid email.',
        },
      },
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isPhoneNumber(value) {
          const phoneRegex = /^\d{13}$/; // Example: Allow only 10-digit numbers
          if (!phoneRegex.test(value)) {
            throw new Error('Invalid phone number format, include the country code');
          }
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty',
        },
        isStrongPassword: (value) => {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!passwordRegex.test(value)) {
            console.error('Password:', value);
            console.error('Validation failed!');
            throw new Error('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.');
          }
        },
      },
    },
  }, {
    sequelize,
    tableName: 'User',
    modelName: 'User',
    freezeTableName: true,
    paranoid: true
  });
  return User;
};
'use strict';

const { hashPassword } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      }
    },
    sequelize
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
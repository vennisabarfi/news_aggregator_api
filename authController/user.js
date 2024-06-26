// user profile in database
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('user_database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });
  

  class User extends Model{}
  User.init( 
  
      {
          userName:{ 
              type: DataTypes.STRING, 
              allowNull: false,
              unique: true,
          },
          email:{ 
              type: DataTypes.STRING, 
              allowNull: false,
          },
          password:{ 
            type: DataTypes.STRING, 
            allowNull: false,
        }
          
      },{
        freezeTableName: true,
        instanceMethods:{
            generateHash(password){
                return bcrypt.hash(password, bcrypt.genSaltSync(10));
            },
            validPassword(password){
                return bcrypt.compare(password, this.password);
            }
        }
      });

      return User;


 
  
  //defined model is the class itself
  console.log(User == sequelize.models.User); //true
  




module.exports = router;

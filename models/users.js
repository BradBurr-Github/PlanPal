const { Model , DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');
const bcrypt = require('bcrypt');

// create new sequelize model for users
// verify if a provided password matches the hashed password stored in the database for a particular user
class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

// define field/columns for users
// An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,                          
              },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8], 
            },
          },
    },
    {
        // password is hashed before being stored in the database, enhancing security by protecting the passwords from being stored in plain text.
        // return user data with hashed password for newUser
        hooks: {
            beforeCreate: async (newUserData) => {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
            },
        },
            // Link to database connection
            sequelize,
            freezeTableName: true,          //table name stays the same 
            modelName: 'user',
            timestamps: false,
            underscored: true,
    }
)

module.exports = User;
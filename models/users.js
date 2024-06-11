const { Model , DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

// create new sequelize model for users
class User extends Model {}

// define field/columns for users
// An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        username: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email_address: {
            type: DataTypes.STRING
        }
    },
    {
// Link to database connection
    sequelize,
    freezeTableName: true,          //table name stays the same 
    modelName: 'user'
    }
)

module.exports = User;

// model becomes a postgres table when it syncs with a sequelize database


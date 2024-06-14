const { Model , DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

// create new sequelize model for events
class EventUser extends Model {}

// define field/columns for events
// An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
EventUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,                           //primary key
            autoIncrement: true,                        // creates new id for new eventUser
            allowNull: false,                           //must NOT be empty, must have a value
        },
        confirmStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        // Link to database connection
        sequelize,
        freezeTableName: true,          //table name stays the same 
        modelName: 'eventUser',
        timestamps: false,
        underscored: true,
    }
)

module.exports = EventUser;

// model becomes a postgres table when it syncs with a sequelize database


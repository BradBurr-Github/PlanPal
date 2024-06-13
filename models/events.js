const { Model , DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

// create new sequelize model for events
class Event extends Model {}

// define field/columns for events
// An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
Event.init(
    {
        event_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,                           //primary key
            autoIncrement: true,                        // creates new id for new event
            allowNull: false,                           //must NOT be empty, must have a value
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        durationMins: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        organizer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
    },
    {
        // Link to database connection
        sequelize,
        freezeTableName: true,          //table name stays the same 
        modelName: 'event',
        timestamps: false,
        underscored: true,
    }
)

module.exports = Event;

// model becomes a postgres table when it syncs with a sequelize database


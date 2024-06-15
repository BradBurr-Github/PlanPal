const { Model , DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

// create new sequelize model for events
class Event extends Model {}

// define field/columns for events
// An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
    },
    {
        // Link to database connection
        sequelize,
        freezeTableName: true,
        modelName: 'event',
        timestamps: false,
        underscored: true,
    }
)

module.exports = Event;
const { Model , DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

// create new sequelize model for events
class EventUser extends Model {}

// define field/columns for EventUser
// An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
EventUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        confirmStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Unconfirmed',
            //check to make sure the confirm status is 'Unconfirmed', 'Yes', 'No' or 'Maybe'
            validate: {
                isIn: {
                args: [['Unconfirmed', 'Yes', 'No', 'Maybe']],
                msg: "Confirmation must be Unconfirmed, Yes, No or Maybe",
                },
            }
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
const User = require('./users')
const Event = require('./events')
const EventUser = require('./events-users')

// Event.belongsTo(User, {
//     foreignKey: 'organizer_id',
// //    onDelete: 'CASCADE',
// })

User.belongsToMany(Event, {
    through: 'eventUser'
})

Event.belongsToMany(User, {
    through: 'eventUser'
})

User.hasMany(EventUser);
EventUser.belongsTo(User);
Event.hasMany(EventUser);
EventUser.belongsTo(Event);

// Event.hasMany(User, {
//     foreignKey: 'event_id',
// })
// User.belongsTo(Event, {
//     foreignKey: 'organizer_id',
// })
// Event.belongsTo(EventUser, {
//     foreignKey: 'event_id',
// })
// User.belongsTo(EventUser, {
//     foreignKey: 'user_id',
// })

module.exports = { User, Event }
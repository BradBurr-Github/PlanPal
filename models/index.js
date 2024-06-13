const User = require('./users')
const Event = require('./events')
const EventUser = require('./events-users')

Event.hasOne(User, {
    foreignKey: 'organizer_id',
    onDelete: 'CASCADE',
})

User.belongsTo(Event, {
    foreignKey: 'organizer_id',
})


module.exports = { User, Event, EventUser }
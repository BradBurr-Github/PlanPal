const sequelize = require('../config/connection');
const { Event, User, EventUser } = require('../models');

const userSeedData = require('./userSeedData.json');
const eventSeedData = require('./eventSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {individualHooks:true, returning: true});
  

//   for (const event of eventSeedData) {
//     let randUser = users[Math.floor(Math.random() * users.length)].id;
//     await Event.create({
//         ...event,
//         organizer_id: randUser,
//         attendee_id: users[Math.floor(Math.random() * users.length)].id
//     });
  //}

  process.exit(0);
};

seedDatabase();


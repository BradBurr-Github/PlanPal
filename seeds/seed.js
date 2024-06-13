const sequelize = require('../config/connection');
const { Event, User, EventUser } = require('../models');

const userSeedData = require('./userSeedData.json');
//const eventSeedData = require('./eventSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await UserbulkCreat.e(userSeedData);

//   for (const { id } of users) {
//     const newEvent = await Event.create({
//         organizer_id: id,
//     });
//   }

  process.exit(0);
};

seedDatabase();


const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { Event, User, EventUser } = require('../models');
const userSeedData = require('./userSeedData.json');
const eventSeedData = require('./eventSeedData.json');

// // Function to hash a Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Function to Encrypt passwords in the userSeedData.json file
const hashUserSeedPassword = async () => {
  for(let i=0; i<userSeedData.length; i++) {
    userSeedData[i].password = await hashPassword(userSeedData[i].password);
  }
}; 

const displaySeedingResults = async () => {
  console.log('User Table was Seeded successfully.');
};

async function seedDatabase() {
  await sequelize.sync({ force: true });
  const hashResult = await hashUserSeedPassword();
  const users = await User.bulkCreate(userSeedData, {individualHooks:true, returning: true});
  const displayResult = displaySeedingResults();
}

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

// //  console.log(userSeedData);
//   // const users = await User.bulkCreate(userSeedData, {individualHooks:true, returning: true});
  

// //   for (const event of eventSeedData) {
// //     let randUser = users[Math.floor(Math.random() * users.length)].id;
// //     await Event.create({
// //         ...event,
// //         organizer_id: randUser,
// //         attendee_id: users[Math.floor(Math.random() * users.length)].id
// //     });
//   //}

//   process.exit(0);
//};

seedDatabase();


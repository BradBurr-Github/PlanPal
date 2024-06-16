const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const { Event, User, EventUser } = require('../models');
const userSeedData = require('./userSeedData.json');
const eventSeedData = require('./eventSeedData.json');

// Values of Users and Events added
let usersAdded = [];
let eventsAdded = [];

// Function to hash a Password
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

// Function to get a random Quarter hour
function getRandomQuarterHour() {
  // Get a random integer between 0 and 3
  const randomIndex = Math.floor(Math.random() * 4);
  // Map the index to the corresponding value [0, 15, 30, 45]
  switch (randomIndex) {
    case 0:
      return 0;
    case 1:
      return 15;
    case 2:
      return 30;
    case 3:
      return 45;
    default:
      return 0;
  }
}

// Function to get a random Date (and Time) within 2 days
function getRandomDateWithin2Days() {
  // Get a random number between -2 and 2
  const randomOffset = Math.floor(Math.random() * 5) - 2;
  // Get a random Hour in the day
  const randomHour = Math.floor(Math.random() * 10);
  // Get random 15-minute time number
  const quarterHour = getRandomQuarterHour();
  //Get Today's datedays jd
  let today = dayjs();
  // Create a new date by adding the random offset
  const updatedDate = today.add(randomOffset, 'day');
  let randomDate = updatedDate.hour(randomHour).minute(quarterHour).second(0).millisecond(0);
  return randomDate;
}
  

const displaySeedingResults = async () => {
  console.log('User Table was Seeded successfully.');
  console.log('Event Table was Seeded successfully.');
  console.log('Event-User Table was Seeded successfully.');
};

// Function to Encrypt passwords in the userSeedData.json file
const updateEventDatesInSeed = async () => {
  for(let i=0; i<eventSeedData.length; i++) {
    let beginDT = getRandomDateWithin2Days();
    eventSeedData[i].startDateTime = `${beginDT.format('YYYY-MM-DD HH:mm:ss')}`;
    const quarterHour = getRandomQuarterHour();
    // Get a random Length of event (1, 2 or 3)
    const randomLength = Math.floor(Math.random() * 3) + 1;
    let endDT = beginDT.hour(beginDT.hour() + randomLength).minute(quarterHour);
    eventSeedData[i].endDateTime = `${endDT.format('YYYY-MM-DD HH:mm:ss')}`;
  }
};

// Function to seed the Database
async function seedDatabase() {
  await sequelize.sync({ force: false });
  // Seed User Table
  const users = await User.bulkCreate(userSeedData, {individualHooks:true, returning: true});
  const updateResult = await updateEventDatesInSeed();
  // Seed Events Table
  let eventCount = 1;
  for (const event of eventSeedData) {
    let randUser = users[Math.floor(Math.random() * users.length)].id;
    usersAdded.push({event: eventCount,user: randUser});
    eventCount++;
    await Event.create({
        ...event,
        organizer_id: randUser
    });
  }
  // Seed Events-User Table
  let count = 0;
  for(let i=0; i<eventSeedData.length; i++) {
    count = 0;
    let usersUsed = [];
    const randomAttendees = Math.floor(Math.random() * 3) + 1;
    for(let j=0; j<randomAttendees; j++) {
      while(true) {
        const randomUser = Math.floor(Math.random() * userSeedData.length) + 1;
        if(usersAdded[j+1].user === randomUser || usersUsed.includes(randomUser)) {
          if(count >= randomAttendees)
            break;
          else
            continue;
        }
        usersUsed.push(randomUser);
        // Add recod to EventUser table
        await EventUser.create({
          confirmStatus: 'Yes',
          notes: '',
          userId: randomUser,
          eventId: (i+1),
        })
        count++;
        console.log(`${count}`);
        if(count >= randomAttendees)
          break;
      }
    }
  }
  const displayResult = await displaySeedingResults();
}

seedDatabase();


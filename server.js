const express = require('express');
const path =require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

// Import model to sync tables with database
// const User = require('./models/users');
// const Event = require('./models/events');
// const EventUser = require('./models/events-users');

// set up handlebars custom helpers under utils folder ???

// set up express
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set up routes
app.use(routes);

// sync the database schema with the models defined in app
// sync creates the tables for models that don't exist in the database. force:false means sequelize will not drop datas to prevent data loss

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });

  // force:true is only for testing

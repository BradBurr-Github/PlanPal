const express = require('express');
const path =require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('')

// set up handlebars custom helpers under utils folder ???

const sess = {
    secret: '',
    cookie: {
        
    }
}

app.use(session(sess));

app.engine('handlebars')
// app.set(''.'');

// set up express
const app = express();
const PORT = process.env.PORT || 3001;

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

  
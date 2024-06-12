const router = require('express').Router();
const User = require('../../models/users');
const Event = require('../../models/events');

//Route to get loggedIn users events
router.get('/', async (req, res) => {
  console.log("howdy")
  //get current user from req.session.id include the events
  //return just events stringified as JSON
})
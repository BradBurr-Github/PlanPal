const withAuth = (req, res, next) => {     // middleware function withAuth that takes 3 params. next () allows the next middleware function or route handler
    if (!req.session.logged_in) {
      res.redirect('/login');              // if not logged in, redirect to login page
    } else {
      next();
    }
  };
  
  module.exports = withAuth;

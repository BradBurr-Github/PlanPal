const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {                // await keyword = asynchronous promise 
        method: 'POST',
        body: JSON.stringify({ email, password }),                       // sends the login credentials (email and password) to the server in JSON format
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If login successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the signup form
    const name = document.querySelector('#name-signup').value.trim();           // value.trim() removes any spaces before or after if any
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {                                            // check to see if all 3 have values otherwise won't proceed
      const response = await fetch('/api/users', {                              // todo: needs work! CANNOT GET /api/users error is it linked properly????  400 error code means user error 
        method: 'POST',
        body: JSON.stringify({ name, email, password }),                        // post request to /api/users in json format which should be added to user's api name,email,password
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');                                  // eror handling -- if ok proceed to /profile otherwise it will alert there was an error
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // event listener for when the submit button on the login form is clicked it will execute the loginFormHandler function
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  // event listener for when the signup button on the login form is clicked it will execute the signupFormHandler function
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  
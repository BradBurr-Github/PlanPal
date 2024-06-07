// dependencies
const express = require('express');

// set up express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

// set up routes
app.use(require(''))

// start server
app.listen(PORT, () => {
    console.log('Server listening on http://localhost:' + PORT);
})
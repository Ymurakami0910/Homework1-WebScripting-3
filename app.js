// A 01370533 Yurino Murakami

const express = require('express');
// install the express which is one of the frameworks to launch a new server.
const app = express();
// execute the express, build the server. Now you can use APP to handle middleware and routes.
// Port is a number to identify which app is in the computer 
// 3000 is a general number but you can also change to 4000, 8080 or so.
const PORT = 3000;
// define the number to launch the server (3000).
const booksRouter = require('./routes/books');
// import the file of route to manage the book information 
// "route" is a a process when a specific URL (endpoint) is accessed.
// so if the server access to 'http://localhost:3000/books' this will return to the books.

const bodyParser = require('body-parser');
// body-parser is applied as middleware.

// middleware is a program that handles requests (between request and response).
// Request - Client makes request	
// Middleware - Middleware parses data	
// Response - Server responds

// middleware
app.use(express.static('public')); // Serve static files from the public folder

// parse all incoming requests
app.use(bodyParser.json());
// This allows JSON data (POST/PUT requests) sent by clients to be automatically 
// parsed and stored in req.body.

app.use('/api', booksRouter);
// routing settings.
// This will forward requests beginning with /api to booksRouter (routes/books.js).
// examples
// GET /api/books → Get book list
// POST /api/books → add a new book
// GET /api/books/:id → retrieve a specific book

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
// Waits for the server on the port number (3000) specified in PORT.
// When the server starts, a message is displayed in console.log.



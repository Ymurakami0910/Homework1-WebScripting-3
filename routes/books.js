const express = require('express');
const router = express.Router();

// data of the books
const books = [
    { id: 1, title: 'No Longer Human', author: 'Osamu Dazai', imageUrl: '/No-longer-human.jpg', year: 1948 },
    { id: 2, title: 'Snow Country', author: 'Yasunari Kawabata', imageUrl: '/Snow-country.jpg', year: 1947 },
    { id: 3, title: 'The Temple of the Golden Pavilion', author: 'Yukio Mishima', imageUrl: '/The-temple.jpg', year: 1956 },
    { id: 4, title: 'I Am a Cat', author: 'Natsume Soseki', imageUrl: '/Iam-a-cat.jpg', year: 1905 },
    { id: 5, title: 'Norwegian Wood', author: 'Haruki Murakami', imageUrl: '/Norwegian-wood.jpg', year: 1987 },
];

// middleware: Find book by ID
function findBookById(req, res, next) {
    const requestedId = parseInt(req.params.id); // acquire book ID

    const bookData = books.find(b => b.id === requestedId); // find the book by ID
    // Use Array.find to get the book with the matching id or undefined
    
    // If the book is found, send it back as a response
    if (bookData) {
        req.book = bookData; // attach book data to the request
        next(); // continue to the next middleware/handler
        // btw if you forget 'next' a clint won't receive a response
    // Else set the Not Found status and send a message    
    } else {
        res.status(404).json({ error: "Book not found" });  // book not found, 
        // instead of sending plain text, return a structured JSON response for consistency
    }
}

// get all books
router.get('/books', (req, res) => {
    res.json(books); // return all books
});

// get a specific book by ID
router.get('/books/:id', findBookById, (req, res) => {
    res.json(req.book); // send the found book
});

// add a new book via POST
router.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length ? books[books.length - 1].id + 1 : 1; // new book ID based on last book
    books.push(newBook); // add new book to the array
    res.status(201).json(newBook); // respond with the newly added book
});

// update an existing book via PUT
router.put('/books/:id', findBookById, (req, res) => {

    const updatedBook = req.book; // search the book to update

    // update the data
    // the code applies the new data (req.body) sent in the PUT request to the existing book (updatedBook), 
    // and if there is no new data, it keeps the original data.
    updatedBook.title = req.body.title || updatedBook.title;
    updatedBook.author = req.body.author || updatedBook.author;
    updatedBook.imageUrl = req.body.imageUrl || updatedBook.imageUrl;
    updatedBook.year = req.body.year || updatedBook.year;

    res.json(updatedBook); // Return the updated book
});

// delete a book via DELETE
router.delete('/books/:id', findBookById, (req, res) => {
     // If the reminder is not found, requestData will be undefined
    const index = books.indexOf(req.book); // find the index of the book to delete
    if (index !== -1) {
        books.splice(index, 1);  // Find the index of the reminder in the array and remove it
        res.status(200).json({ message: "Book deleted successfully" });  // respond success
    } else {
        res.status(404).json({ error: "Book not found" });  // book not found,  // book not found
    }
});

module.exports = router; // export the router

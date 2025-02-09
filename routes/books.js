// routes/books.js
const express = require('express');
const router = express.Router();

// Sample route
router.get('/books', (req, res) => {
    res.send('List of books');
});

module.exports = router; // Routerをエクスポート

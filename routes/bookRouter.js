 // routes/api/books.js

const express = require('express');
const bookSchema = require('../../models/books');
const bookrouter = express.Router();

// Load Book model
// const Book = require('../../models/Books');

// // @route GET api/books/test
// // @description tests books route
// // @access Public
bookrouter.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
bookrouter.get('/', (req, res) => {
    bookSchema.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
bookrouter.get('/:id', (req, res) => {
    bookSchema.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

// @route GET api/books
// @description add/save book
// @access Public
bookrouter.post('/', (req, res) => {
    bookSchema.create(req.body)
    .then(book => res.json({ msg: 'Book added successfully' }))
    .catch(err =>{ res.status(400).json({ error: 'Unable to add this book' })

    console.error("this is the ",err)
}
    
    
    );
});

// @route GET api/books/:id
// @description Update book
// @access Public
bookrouter.put('/:id', (req, res) => {
  bookSchema.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
bookrouter.delete('/: ', (req, res) => {
  bookSchema.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = bookrouter;
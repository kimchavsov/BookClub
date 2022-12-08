const express = require('express');
const book = require('../controller/book');
const note = require('../controller/note');

const router = express.Router();


router.route('/')
  .get(book.viewAll)
  .post(book.createBook)

router.route('/new')
  .get(book.renderNew)

router.route('/:id')
  .get(book.viewBook)
  .put(book.updateBook)
  .delete(book.deleteBook)

router.route('/:id/edit')
  .get(book.renderEdit)

// Book progress 
router.post('/:id/progress', book.updateProgress);

// route to handle note within the book section
router.route('/:id/note')
  .post(note.createNote)

router.get('/*', book.handleNotFound);

module.exports = router;
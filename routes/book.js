const express = require('express')
const router = express.router()
const book = require('../controller/book')

router.route('/books')
  .get(book.renderBook)
  .post(book.createBook)
  .put(book.updateBook)
  .delete(book.deleteBook)

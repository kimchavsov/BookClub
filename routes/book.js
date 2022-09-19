const express = require('express')
const router = express.router()
const book = require('../controller/book')

router.route('/books')
  .get(book.viewAll)
 

router.route('/books/:id')
  .get(book.viewBook)
  .post(book.createBook)
  .put(book.updateBook)
  .delete(book.deleteBook)

router.get('/books/*', book.handleNotFound)
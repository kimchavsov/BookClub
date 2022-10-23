const express = require('express')
const book = require('../controller/book')
const { isLoggedIn } = require('../middleware/auth')

const router = express.Router()


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

router.get('/*', book.handleNotFound);

module.exports = router;
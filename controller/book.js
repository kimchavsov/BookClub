const { db } = require('../models/book')
const Book = require('../models/book')


module.exports.renderBook = async (req, res) => {
  const books = await Book.find({});
  res.render('books/index', {books});
}

module.exports.createBook = async (req, res) => {
  const book = new Book(req.body.book)
  await book.save()
  redirect('books')
}

module.exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id, {...req.body.book})
  res.redirect(`/books/${book._id}`)
}

module.exports.deleteBook = async (req, res) => {
  const { id } = req.params
  const delBook = await Book.findOneAndDelete(id)
  res.redirect('/books')
}

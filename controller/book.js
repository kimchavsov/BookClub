const book = require('../models/book');
const { db } = require('../models/book')
const Book = require('../models/book')


module.exports.viewAll = async (req, res) => {
  const books = await Book.find({});
  console.log();
  res.render('books/index', {books});
}

module.exports.viewBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  console.log(req.isAuthenticated())
  res.render('books/show', {book})
}

module.exports.renderNew = async (req, res) => {
  res.render('books/new')
}

module.exports.createBook = async (req, res) => {
  const book = new Book(req.body.book)
  await book.save()
  res.redirect('books')
}

module.exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, {...req.body.book})
  res.redirect(`books/${book._id}`)
}

module.exports.updateProgress = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, {...req.body.book})
  res.redirect(`books/${book._id}`)
}

module.exports.deleteBook = async (req, res) => {
  const { id } = req.params
  const delBook = await Book.findOneAndDelete(id)
  res.redirect('books')
}

module.exports.handleNotFound = (req, res) => {
  res.render('home')
}
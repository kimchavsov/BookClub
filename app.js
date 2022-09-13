const express = require('express')
const mongoose = require('mongoose')
const engine = require('ejs-mate')
const path = require('path')
const methodOverride = require('method-override')
const Book = require('./models/book')

mongoose.connect('mongodb://localhost:27017/bookshelf')
  .then(() => {
    console.log('Connected to the Database')
  })
  .catch((err) => {
    console.log(err)
    console.log('Connection Error')
  })

const db = mongoose.connection
const app = express()

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/books', async (req, res) => {
  const books = await Book.find({})
  res.render('books/index', {books})
})

app.get('/books/new', async (req, res) => {
  res.render('books/new')
})

app.post('/books', async (req, res) => {
  const book = new Book(req.body.book)
  await book.save()
  res.redirect('books')
})

app.get('/books/:id', async (req, res) => {
  const { id } = req.params
  const book = await Book.findById(id)
  res.render('books/show', {book})
})

app.get('/books/:id/edit', async (req, res) => {
  const { id } = req.params
  const book = await Book.findById(id)
  res.render('books/edit', { book })
})

app.put('/books/:id', async (req, res) => {
  const { id } = req.params
  const book = await Book.findByIdAndUpdate(id, {...req.body.book})
  res.redirect(`/books/${book._id}`)
})

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params
  const delBook = await Book.findOneAndDelete(id)
  res.redirect('/books')
})

app.get('/notes', async (req, res) => {
  res.render('notes/index')
})

app.listen(3000, () => {
  console.log("Listening to port 3000")
})
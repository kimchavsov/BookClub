const express = require('express')
const mongoose = require('mongoose')
const engine = require('ejs-mate')
const path = require('path')
const methodOverride = require('method-override')
const Book = require('./models/book')

const booksRouter = require('./routes/book')

mongoose.connect('mongodb://localhost:27017/bookshelf')
  .then(() => {
    console.log('Connected to the Database')
  })
  .catch((err) => {
    console.log(err)
    console.log('Connection Error')
  })

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

app.use('/books', booksRouter);

app.listen(3000, () => {
  console.log("Listening to port 3000")
})
const express = require('express')
const engine = require('ejs-mate')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const Book = require('./models/book')
const User = require('./models/user')

const booksRouter = require('./routes/book')
const userRoute = require('./routes/user')

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


passport.use(new LocalStrategy(User.authenticate()))

// for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', (req, res) => {
  res.render('home')
})

app.use('/books', booksRouter);
app.use('/', userRoute)

app.listen(3000, () => {
  console.log("Listening to port 3000")
})
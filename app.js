const express = require('express');
const engine = require('ejs-mate');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const Book = require('./models/book');
const User = require('./models/user');

const booksRouter = require('./routes/book');
const userRoute = require('./routes/user');
const { isLoggedIn } = require('./middleware/auth');

mongoose.connect('mongodb://localhost:27017/bookshelf')
  .then(() => {
    console.log('Connected to the Database')
  })
  .catch((err) => {
    console.log(err)
    console.log('Connection Error')
  })

const app = express();

const store = MongoStore.create({
  mongoUrl: 'mongodb://localhost:27017/bookshelf',
  secret: 'testing',
  touchAfter: 24 * 60 * 60
})



app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(session({
  store: store,
  name: 'mysession',
  secret: 'thisissecret',
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 24 * 3600 * 1000
  }
}))


passport.use(new LocalStrategy(User.authenticate()));

// for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// app.use((req, res, next) => {
//   console.log(req.originalUrl)
//   if(!['/login', '/register'].includes(req.originalUrl)) {
//     req.session.returnTo = req.originalUrl;
//     if (req.user) {
//       res.locals.currentUser = req.user;
//       next()
//     } else {
//       res.redirect('/login')
//     }
//   } else {
//     next()
//   }
// })

app.get('/', (req, res) => {
  res.render('home');
})

app.use('/', userRoute);

app.use('/books', booksRouter);

app.listen(3000, () => {
  console.log("Listening to port 3000");
})
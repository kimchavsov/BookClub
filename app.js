const express = require('express');
const engine = require('ejs-mate');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const { isLoggedIn } = require('./middleware/auth');

const User = require('./models/user');

const booksRouter = require('./routes/book');
const userRoute = require('./routes/user');
const noteRouter = require('./routes/note')

const app = express();

// TODO: add env to project 
mongoose.connect('mongodb://localhost:27017/bookshelf')
  .then(() => {
    console.log('Connected to the Database')
  })
  .catch((err) => {
    console.log(err)
    console.log('Connection Error')
  })

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
app.use(express.static(path.join(__dirname, 'public')))

// TODO: Improve security
app.use(session({
  store: store,
  name: 'mysession',
  secret: 'thisissecret',
  saveUninitialized: true,
  resave: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 24 * 3600 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(({usernameField: 'email'}), User.authenticate()));

// for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// TODO: add logging
app.use((req, res, next) => {
  res.locals.url = req.originalUrl;
  if (!['/login', '/', '/register'].includes(req.originalUrl)) {
    req.session.returnTo = req.originalUrl;
  }
  res.locals.currentUser = req.user;
  next();
})

app.get('/', (req, res) => {
  res.render('home');
})

app.use('/', userRoute);
app.use('/books', isLoggedIn, booksRouter);
app.use('/notes', isLoggedIn, noteRouter);

app.listen(3000, () => {
  console.log("Listening to port 3000");
})
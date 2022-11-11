const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const PORT = process.env.PORT || 3000;
const path = require('path')

connectDB();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser());

app.options("*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const verifyJWT = require('./middleware/VerifyJWT')

app.use('/register', require('./router/Register'))
app.use('/login', require('./router/Login'))
app.use('/refresh', require('./router/Refresh'));
app.use('/logout', require('./router/Logout'));

app.use(verifyJWT.verifyJWT)
app.use('/author', require('./router/api/authorApi'))
app.use('/category', require('./router/api/categoryApi'))
app.use('/api/quote', require('./router/api/quoteApi'))

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
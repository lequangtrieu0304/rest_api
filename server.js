const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser());



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/register', require('./router/Register'))
app.use('/login', require('./router/Login'))
app.use('/refresh', require('./router/Refresh'));
app.use('/logout', require('./router/Logout'));

app.use('/employee', require('./router/api/employees'));


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
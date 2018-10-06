const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const teams = require('./routes/api/teams');
const user = require('./routes/api/user');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, {useNewUrlParser: true}) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/user', user);
app.use('/api/teams', teams);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
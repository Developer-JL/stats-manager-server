const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const user = require('./routes/api/user');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mongo DB Configure
const db = require('./config/keys').mongoURI;

// Connect to Mongo DB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('Connected to Mongo DB!'))
  .catch(err => console.log(err));

app.use('/api/user', user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Stats manager server started on port ${port}`))
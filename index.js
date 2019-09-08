const mongoose = require('mongoose');
const serviceCategories = require('./routes/serviceCategories');
const customers = require('./routes/customers');
const handymanServices = require('./routes/handymanServices');
const jobs = require('./routes/jobs');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/handy')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/categories', serviceCategories);
app.use('/api/customers', customers);
app.use('/api/services', handymanServices);
app.use('/api/jobs', jobs);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const salaryInflationController = require('./src/controllers/salary-inflation-controller.js');

app.get('/', (req, res) => {
  res.send('It works');
});

app.use('/api/salary-inflation', salaryInflationController);

app.listen(3001, () => console.log('listening'));

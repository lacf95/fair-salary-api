require('dotenv').config();

const composeAsync = require('../misc/compose-async.js');

const { monthlyInflationRates } = require('../models/banxico.js');
const { store } = require('../models/monthly-inflation-rate.js');

const storeAllTime = async () => composeAsync([store, monthlyInflationRates])();

(async () => storeAllTime())();

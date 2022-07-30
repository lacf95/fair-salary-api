import dotenv from 'dotenv';
dotenv.config();

import composeAsync from '../misc/compose-async.js';
import { monthlyInflationRates } from '../models/banxico.js';
import storeJson from '../misc/store-json.js';

const storeMonthlyInflations = storeJson(process.env.MONTHLY_INFLATION_RATES_FILE);
const storeAllTime = async () => composeAsync([storeMonthlyInflations, monthlyInflationRates])();

(async () => storeAllTime())();

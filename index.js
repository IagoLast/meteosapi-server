require ('newrelic');
const assert = require('assert');
const app = require('express')();
const api = require('./src/api.js');
const cache = require('./src/cache.js');
const cors = require('cors')
const port = process.env.PORT || 8080;
require('dotenv').load();

app.set('json spaces', 2);
app.use(cors())
app.use('/api/v1/', cache);
app.use('/api/v1/', api);
app.listen(port);

console.log('Listening on: ' + port);

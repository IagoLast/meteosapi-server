const assert = require('assert');
const app = require('express')();
const api = require('./src/api.js');
const port = process.env.PORT || 8080;
require('dotenv').load();

app.set('json spaces', 2);
app.use('/api/v1/', api);
app.listen(port);

console.log('Listening on: ' + port);
// const Meteosapi = require('meteosapi');
const Meteosapi = require('meteoscrapi'); // Use this only if you don´t have an api key.

const express = require('express');
const router = express.Router();
const cache = require('memory-cache');
const TTL = 1800000; // half an hour

router.get('/forecast/:id', function(req, res) {
	const key = process.env.METEOSAPI_KEY;
	const meteosapi = Meteosapi(key);
	meteosapi.getForecast(req.params.id)
		.then(data => {
			cache.put(req.originalUrl, data, TTL);
			res.json(data);
		})
		.catch(err => {
			res.status(err.statusCode).json(err.statusCode);
		});
});

router.get('/simple/:id', function(req, res) {
	const key = process.env.METEOSAPI_KEY;
	const meteosapi = Meteosapi(key);
	meteosapi.getSimpleForecast(req.params.id)
		.then(data => {
			cache.put(req.originalUrl, data, TTL);
			res.json(data);
		})
		.catch(err => {
			res.status(err.statusCode).json(err.statusCode);
		});
});


module.exports = router;
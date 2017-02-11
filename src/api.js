const Meteosapi = require('meteosapi');
const express = require('express');
const router = express.Router();
const cache = require('memory-cache');
const TTL = 1800000; // half an hour


router.get('/:id', function(req, res) {
	const key = process.env.METEOSAPI_KEY;
	const meteosapi = Meteosapi(key);
	let cached = cache.get(req.params.id);
	if (cached) {
		console.log('cached.')
		res.json(cached);
		return;
	}
	meteosapi.getForecast(req.params.id)
		.then(data => {
			cache.put(req.params.id, data, TTL);
			res.json(data);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});


module.exports = router;
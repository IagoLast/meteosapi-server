const express = require('express');
const router = express.Router();
const cache = require('memory-cache');


router.get('/:id', function(req, res, next) {
	let cached = cache.get(req.params.id);
	if (cached) {
		return res.json(cached);
	} else {
		next();
	}
});

module.exports = router;
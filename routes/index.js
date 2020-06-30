const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to Brewguru api server'));

module.exports = router;

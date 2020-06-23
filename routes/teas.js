const express = require('express');
const router = express.Router();
const { teas } = require('../controllers');

/* GET users listing. */
router.get('/', teas.get);

module.exports = router;

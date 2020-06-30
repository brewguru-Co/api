const express = require('express');
const router = express.Router();
const { teas } = require('../controllers');
const { route } = require('.');

router.get('/', teas.get);
router.post('/', teas.create);
router.patch('/', teas.update);

module.exports = router;

const express = require('express');

const router = express.Router();
const { teas } = require('../controllers');

router.get('/', teas.get);
router.post('/', teas.create);
router.patch('/', teas.update);

module.exports = router;

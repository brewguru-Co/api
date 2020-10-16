const express = require('express');

const router = express.Router();
const { materials } = require('../controllers');

router.post('/', materials.create);
router.get('/', materials.get);

module.exports = router;

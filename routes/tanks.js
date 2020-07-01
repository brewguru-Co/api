const express = require('express');

const router = express.Router();
const { tanks } = require('../controllers');

router.get('/', tanks.get);
router.post('/', tanks.create);
router.patch('/:tankId', tanks.update);
router.delete('/', tanks.remove);

module.exports = router;

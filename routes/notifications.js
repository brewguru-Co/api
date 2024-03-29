const express = require('express');

const router = express.Router();
const { notifications } = require('../controllers');

router.get('/', notifications.get);
router.post('/', notifications.create);
router.patch('/:id', notifications.update);
router.delete('/', notifications.remove);

module.exports = router;

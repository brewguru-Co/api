const express = require('express');

const router = express.Router();
const { notificationTargets } = require('../controllers');

router.get('/', notificationTargets.get);
router.post('/', notificationTargets.create);
router.patch('/:id', notificationTargets.update);
router.delete('/', notificationTargets.remove);

module.exports = router;

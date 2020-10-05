const express = require('express');

const router = express.Router();
const { batchs } = require('../controllers');

router.get('/', batchs.get);
router.post('/', batchs.create);
router.patch('/:id', batchs.update);
router.delete('/', batchs.remove);

module.exports = router;

const express = require('express');

const router = express.Router();
const { batchs } = require('../controllers');

// router.get('/', batchs.get);
// router.post('/', batchs.create);
// router.patch('/:batchId', batchs.update);
// router.delete('/', batchs.remove);

router.get('/data', batchs.getData);

module.exports = router;

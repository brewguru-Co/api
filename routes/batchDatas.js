const express = require('express');

const router = express.Router();
const { batchDatas } = require('../controllers');

// router.get('/', batchs.get);
// router.post('/', batchs.create);
// router.patch('/:id', batchs.update);
// router.delete('/', batchs.remove);

router.post('/', batchDatas.create);
router.get('/', batchDatas.get);

module.exports = router;

const express = require('express');

const router = express.Router();
const { batchDatas } = require('../controllers');

router.post('/', batchDatas.create);
router.get('/', batchDatas.get);

module.exports = router;

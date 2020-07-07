const express = require('express');

const router = express.Router();
const { tankDatas } = require('../controllers');

router.get('/', tankDatas.get);
router.post('/', tankDatas.create);

module.exports = router;

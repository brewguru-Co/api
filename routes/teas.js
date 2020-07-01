const express = require('express');

const router = express.Router();
const { teas } = require('../controllers');

router.get('/', teas.get);
router.post('/', teas.create);
router.patch('/:teaId', teas.update);
router.delete('/', teas.remove);

module.exports = router;

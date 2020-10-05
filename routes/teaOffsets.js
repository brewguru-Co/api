const express = require('express');

const router = express.Router();
const { teaOffsets } = require('../controllers');

router.get('/', teaOffsets.get);
router.post('/', teaOffsets.create);
router.patch('/:id', teaOffsets.update);
router.delete('/', teaOffsets.remove);

module.exports = router;

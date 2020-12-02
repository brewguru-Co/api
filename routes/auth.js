const express = require('express');

const router = express.Router();
const { auth } = require('../controllers');

router.post('/login', auth.login);
router.post('/signup', auth.create);

module.exports = router;

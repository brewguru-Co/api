const express = require('express');

const router = express.Router();
const { auth } = require('../controllers');

router.post('/login', auth.login);
router.post('/signup', auth.create);
router.get('/check', auth.check);

module.exports = router;

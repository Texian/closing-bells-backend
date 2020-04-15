const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/users', ctrl.auth.register);
router.post('/login', ctrl.auth.login);

module.exports = router;
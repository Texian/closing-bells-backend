const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');

router.get('/items', verifyToken, ctrl.items.index);
router.get('items/:id', ctrl.items.show);
router.post('/items', ctrl.items.create);
router.put('/items/:id', ctrl.items.update);
router.delete('/items/:id', ctrl.items.destroy);

router.get('/users', verifyToken, ctrl.users.index);
router.get('users/:id', ctrl.users.show);
router.post('/users', ctrl.users.create);
router.put('/users/:id', ctrl.users.update);
router.delete('/users/:id', ctrl.users.destroy);

module.exports = router;
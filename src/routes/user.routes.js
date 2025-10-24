const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authenticate, authorizeRole } = require('../middleware/auth');

router.post('/', authenticate, authorizeRole('ADMIN'), UserController.create);
router.get('/', authenticate, UserController.list);
router.get('/:id', authenticate, UserController.get);
router.put('/:id', authenticate, authorizeRole('ADMIN'), UserController.update);
router.delete('/:id', authenticate, authorizeRole('ADMIN'), UserController.remove);

module.exports = router;

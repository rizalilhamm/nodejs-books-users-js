const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, BookController.create);
router.get('/', authenticate, BookController.list);
router.get('/:id', authenticate, BookController.get);
router.put('/:id', authenticate, BookController.update);
router.delete('/:id', authenticate, BookController.remove);

module.exports = router;

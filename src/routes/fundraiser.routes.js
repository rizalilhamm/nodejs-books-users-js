const express = require('express');
const router = express.Router();
const FundraiserController = require('../controllers/fundraiser.controller');

router.post('/leaderboards', FundraiserController.list);
router.post('/', authenticate, BookController.create);

module.exports = router;


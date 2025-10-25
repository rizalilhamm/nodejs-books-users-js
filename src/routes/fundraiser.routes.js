const express = require('express');
const router = express.Router();
const FundraiserController = require('../controllers/fundraiser.controller');

router.post('/leaderboards', FundraiserController.list);

module.exports = router;


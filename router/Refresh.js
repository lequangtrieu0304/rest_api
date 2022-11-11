const express = require('express');
const router = express.Router();

const refresh = require('../controllers/refreshToken')

router.get('/', refresh.handledRefresh);

module.exports = router;
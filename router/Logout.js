const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

const logout = require('../controllers/logout')

router.get('/', logout.handledLogout);

module.exports = router;
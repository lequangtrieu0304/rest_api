const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register');

router.post('/', registerController.handledRegister);

module.exports = router
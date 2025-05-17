const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');

router.post('/signup', signupController.signup);
router.post('/login', loginController.login);

module.exports = router;



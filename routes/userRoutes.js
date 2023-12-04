const express = require('express');
const userController = require('../controllers/userController');
const {authMiddleware} =  require("../utils/authMiddleware")

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);


module.exports = router;

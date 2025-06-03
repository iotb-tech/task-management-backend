const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyAccessToken } = require('../helpers/token.helpers');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update', verifyAccessToken, userController.updateProfile);
router.get('/profile', verifyAccessToken, userController.getProfile);
router.post('/logout', verifyAccessToken, userController.logout);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyAccessToken } = require('../helpers/token.helpers');

router.post('/register', userController.register); // htpp://localhost:8080/api/users/register
router.post('/login', userController.login); // htpp://localhost:8080/api/users/login
router.get('/profile', verifyAccessToken, userController.getProfile);
router.put('/update', verifyAccessToken, userController.updateProfile);
router.post('/logout', verifyAccessToken, userController.logout);

module.exports = router;

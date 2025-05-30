const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyAccessToken } = require('../helpers/token.helpers');

router.post('/register', userController.register); // htpp://localhost:8080/api/users/register
router.post('/login', verifyAccessToken, userController.login); // htpp://localhost:8080/api/users/login
// router.get('/profile', userController.getProfile);
// router.put('/update', userController.updateProfile);
// router.post('/logout', userController.logout);

module.exports = router;

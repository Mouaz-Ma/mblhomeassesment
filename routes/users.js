const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const { verifyToken } = require('../middleware');


// register a new user
router.route('/register').post(users.register);

// // login 
router.route('/login').post(users.login)

// // profile
router.route('/user').get(verifyToken ,users.user)

// // logout
router.post('/logout', users.logout)


module.exports = router;
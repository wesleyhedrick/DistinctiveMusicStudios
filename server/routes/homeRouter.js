const express = require('express');
const router = express.Router();
const { homeController } = require('../controllers')

router.post('/sign-in', homeController.signIn)
router.post('/sign-up', homeController.signUp)


module.exports = router
const express = require('express');
const router = express.Router();
const homecontroller = require('../controllers/home_controller')
console.log('Router loaded');
router.get('/', homecontroller.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments',require('./comments'));
// for any further routes,access from here
//router.use()'/routername',require('terfile);.rou
module.exports = router;
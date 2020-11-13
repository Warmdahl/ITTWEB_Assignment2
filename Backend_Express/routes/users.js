var express = require('express');
var router = express.Router();
var usercontroller = require('../Controllers/usercontroller')
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

//GET
router.get('/form', auth, usercontroller.AddUserForm)

/* GET users listing. */
router.get('/getusers', auth, usercontroller.GetUsers)

//Post
router.post('/adduser', usercontroller.AddUser)

//Login
router.post('/userlogin', usercontroller.UserLogIn)

//Delete users in db
router.post('/deleteusers', auth, usercontroller.deleteusers)



module.exports = router;

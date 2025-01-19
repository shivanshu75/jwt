const express=require('express');
const {userController,loginController} = require('../controller/user.controller');
const router=express.Router()


router.post('/',userController)
.get('/login',loginController)

module.exports=router;
const express=require('express');
const {userController,loginController} = require('../controller/user.controller');
const router=express.Router()


router.post('/',userController)
.get('/login',loginController)

router.get('/',(req,res)=>{
  console.log("Test")
}
  )

module.exports=router;

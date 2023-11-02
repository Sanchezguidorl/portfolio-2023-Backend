const express= require('express');
const { loginUser } = require('../controllers/auth.controller');
const bcrypt= require('bcrypt');
const router= express.Router();

router.post('/login',loginUser);

router.post('/create/user',(req, res)=>{

console.log(req.body.password)
if(req.body.password){    const salt= 10;
    bcrypt.compare(req.body.password, "$2b$10$YcpJOKEEwSuH1PiPWxnjZe0n6o6MK4DCqdqMhkJzaoPGIX5I9ImYO", function(err, result) {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
        }
      });}
});

module.exports= router;
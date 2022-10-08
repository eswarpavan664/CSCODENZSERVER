const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('./keys');
 
const router = express.Router();
const StudentUser = mongoose.model('StudentUser');

 

const AdminUser = mongoose.model('AdminUser');
 
router.post('/StudentUserSignupOrSignin',async (req,res)=>{
   
    const {email,password,Name,PhoneNumber,collegeId,Role,CollegeName,UserId} = req.body;
    const user = await StudentUser.findOne({email})
     

        if(!user){
        const user = new StudentUser({email,password,Name,PhoneNumber,collegeId,Role,CollegeName,UserId});
          user.save();
          res.send({"Status":"Logged"})
        }
        else{
          
          res.send({"Status":"Logged"})
        }   
})







router.post('/AdminSignup',async (req,res)=>{
   
  const {email,password,PhoneNumber,Name,Role} = req.body;

  try{
    const user = new AdminUser({email,password,PhoneNumber,Name,Role});
    await  user.save();
  
    res.send("done")

  }catch(err){
    return res.status(422).send(err.message)
  }
  
  
})

router.post('/AdminSignin',async (req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
       res.send({"Status":"NO"})
  }
  const user = await AdminUser.findOne({email})

  if(!user){
       res.send({"Status":"NO"})
  }
  else{
      AdminUser.find({email:email,password:password},(err, docs) => {
        if (docs.length>0) {
            res.send(docs);
           
        } else {
          res.send({"Status":"NO"})
        }
      });
  }



})




//get items to admin panel
router.get('/GetStudent', function(req, res, next) {
  const email=  req.query.email;
 
    StudentUser.find({email:email},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  
});






module.exports = router
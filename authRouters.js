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
      return res.status(422).send({error :"must provide email or password"})
  }
  const user = await AdminUser.findOne({email})
  if(!user){
      return res.status(422).send({error :"must provide email or password"})
  }
  try{
    await user.comparePassword(password);    
    const token = jwt.sign({userId:user._id},jwtkey)
    res.send({token})
  }catch(err){
      return res.status(422).send({error :"must provide email or password"})
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
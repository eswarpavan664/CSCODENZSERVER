const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('./keys');
const router = express.Router();

const StudentUser = mongoose.model('StudentUser');
const AdminUser = mongoose.model('AdminUser');

const Enroll =mongoose.model('enrollCourse');
const Courses =mongoose.model('Courses');



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


// Add Courses

router.post('/AddCourses',async (req,res)=>{
     
  const {CourseName,CoursePhoto,CourseDate,CourseTime,CourseDuration,CoursePrice,CourseId,CourseDiscription,CourseTopics} = req.body
   
  const course = new Courses({CourseName,CoursePhoto,CourseDate,CourseTime,CourseDuration,CoursePrice,CourseId,CourseDiscription,CourseTopics});
  await  course.save();
  res.send({"Status":"Done"});
})




// Enroll Course

router.post('/EnrollCourses',async (req,res)=>{
     
  const {StudentName,ContactNumber,StudentId,CourseName,CoursePhoto,CourseDuration,CoursePrice,CourseId,TransactionId,CourseStatus} = req.body
   
  const user = await Enroll.findOne({TransactionId})

   if(!user){
          const enroll = new Enroll({StudentName,ContactNumber,StudentId,CourseName,CoursePhoto,CourseDuration,CoursePrice,CourseId,TransactionId,CourseStatus});
          await  enroll.save();
          res.send({"Status":"Done"});
    }
    else{
      
      res.send({"Status":"No"});
    }   
})


//Get Courses

router.get('/GetCourses', function(req, res, next) {
   
    Courses.find((err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  
});

//Get Enrolls

router.get('/GetEnrolls', function(req, res, next) {
  
  const {id} =req.query.id;
   
  Enroll.find({StudentId:id},(err, docs) => {
    if (!err) {
         res.send(docs);
    } else {
        console.log('Failed to retrieve the Course List: ' + err);
    }
  });

});


module.exports = router
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
   
    const {email,password,Name,PhoneNumber,CollegeId,Role,CollegeName,UserId,Photo} = req.body;
    const user = await StudentUser.findOne({email})
     

        if(!user){
        const user = new StudentUser({email,password,Name,PhoneNumber,CollegeId,Role,CollegeName,UserId,Photo});
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
  console.log("hi");
  
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

// Get Admin 

router.get('/GetAdmin', function(req, res, next) {
  const email=  req.query.email;
 
    AdminUser.find({email:email},(err, docs) => {
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
   
   


  try{
    const course = new Courses({CourseName,CoursePhoto,CourseDate,CourseTime,CourseDuration,CoursePrice,CourseId,CourseDiscription,CourseTopics});

    await  course.save();
    res.send({"Status":"Done"});

  }catch(err){
    return res.status(422).send(err.message)
  }

 
})




// Enroll Course

router.post('/EnrollCourses',async (req,res)=>{
     
  const {StudentName,ContactNumber,StudentId,CourseName,CoursePhoto,CourseDuration,CoursePrice,CourseId,TransactionId,CourseStatus,StudentEmailId,Date,EnrollmentId} = req.body
   
  const user = await Enroll.findOne({TransactionId})

   if(!user){
          const enroll = new Enroll({StudentName,ContactNumber,StudentId,CourseName,CoursePhoto,CourseDuration,CoursePrice,CourseId,TransactionId,CourseStatus,StudentEmailId,Date,EnrollmentId});
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



// Get Courses by User

router.get('/GetCoursesByUser', function(req, res, next) {
   
  const id =req.query.id;

  Enroll.find({StudentEmailId:id},(err, docs) => {
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



// Update Student Profile Details

router.put('/UpdateUserDetails',async (req,res)=>{
  const {PhoneNumber,Name,CollegeId,CollegeName,Id} = req.body
  
  StudentUser.findByIdAndUpdate(Id,{PhoneNumber:PhoneNumber,Name:Name,CollegeId:CollegeId,CollegeName:CollegeName },{useFindAndModify:false})
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
     console.log("error");
  })
})



router.post('/PlaceEnrollment',async (req,res)=>{
     
  const {StudentName,ContactNumber,StudentId,CourseName,CoursePhoto,CourseDuration,CoursePrice,CourseId,TransactionId,CourseStatus} = req.body
   
   
    const course = new Enroll({StudentName,ContactNumber,StudentId,CourseName,CoursePhoto,CourseDuration,CoursePrice,CourseId,TransactionId,CourseStatus});
    await  course.save();
    res.send({"Status":"Done"});
    
  
 
  console.log(StudentName,ContactNumber,StudentId,CourseName,CoursePhoto,CourseDuration,CoursePrice,CourseId,TransactionId,CourseStatus);
  
})




// Update Student Application Status Details

router.put('/UpdateApplicationStatus',async (req,res)=>{
  const {Status,Id} = req.body
  
  Enroll.findByIdAndUpdate(Id,{CourseStatus:Status},{useFindAndModify:false})
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
     console.log("error");
  })
})






//Get Enrolls

router.get('/GetEnrollsForAdmin', function(req, res, next) {
  
  const status=req.query.status;
  const tran=req.query.Tran;
  if(tran===""){
    Enroll.find({CourseStatus:status},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  }
  else{
    Enroll.find({CourseStatus:status,TransactionId:tran},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  }

});




router.get('/deleteCourse', function (req, res) {
  var id = req.query.id;
  
 
  Courses.deleteOne({ _id:id}, function (err, results) {
    if(!err){
      console.log("Deleted successfully");
    }
  });

  res.json({ success: id })
});


module.exports = router
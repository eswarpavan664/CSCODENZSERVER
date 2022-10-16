const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


 

const StudentUserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        
    },
    Name:{
        type:String,
        
    },
   
    PhoneNumber:{
        type:String,
       
    },
    CollegeId:{
        type:String,
        
    },
    Role:{
        type:String,
        required:true
    },
    CollegeName:{
        type:String,
    },
    UserId:{
        type:String,
        required:true
    },
    Photo:{
        type:String,

    },
    
})



const AdminUserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },  
    Role:{
        type:String,
        required:true
    },
    

})


 
const CourseSchema = new mongoose.Schema({
    CourseName:{
        type:String,
        required:true
    },
    CoursePhoto:{
        type:String,
        required:true
    },
    CourseDate:{
        type:String,
        required:true
    },
    CourseTime:{
        type:String,
        required:true
    },
    CourseDuration:{
        type:String,
        required:true
    },
    CoursePrice:{
        type:String,
        required:true
    },
    CourseId:{
        type:String,
        required:true
    },
    CourseDiscription:{
        type:String,
        required:true
    },
    CourseTopics:{
        type:String,
        
    },

})



const EnrollSchema = new mongoose.Schema({

    StudentName:{
        type:String,
        required:true
    },
    ContactNumber:{
        type:String,
    
    },
    StudentEmailId:{
        type:String,
        required:true
    },
    CollegeId:{
        type:String,
        
    },
    CollegeName:{
        type:String,
    },
    StudentId:{
        type:String,
        required:true
    },
    CourseName:{
        type:String,
        required:true
    },
   
    CoursePhoto:{
        type:String,
        required:true
    },
    CourseDuration:{
        type:String,
        required:true
    },
    CoursePrice:{
        type:String,
        required:true
    },
    CourseId:{
        type:String,
        required:true
    },
    TransactionId:{
        type:String,
        required:true
    },
    CourseStatus:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    EnrollmentId:{
        type:String,
        required:true

    },
})













 

mongoose.model('StudentUser',StudentUserSchema);
 
mongoose.model('AdminUser',AdminUserSchema);




mongoose.model('Courses',CourseSchema);
 
mongoose.model('enrollCourse',EnrollSchema);
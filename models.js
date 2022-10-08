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


 

 


 

mongoose.model('StudentUser',StudentUserSchema);
 
mongoose.model('AdminUser',AdminUserSchema);
 
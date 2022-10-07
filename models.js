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


 

 


AdminUserSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})

 



AdminUserSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}


mongoose.model('StudentUser',StudentUserSchema);
 
mongoose.model('AdminUser',AdminUserSchema);
 
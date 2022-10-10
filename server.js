const express = require('express');
 
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require("cors");
 
const {mogoUrl} = require('./keys');
mongoose.connect(mogoUrl)
 
require('./models');
 
 

 

const authRoutes = require('./authRouters');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(authRoutes)
 

mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("database connected ...")
})


mongoose.connection.on('error',(err)=>{
    console.log("error occered... ",err);
})

 

 


app.get('/',(req,res)=>{
    res.send("Working");

})
 


 
 

app.listen(process.env.PORT || 5000,()=>{
    console.log("server is runnung on port 5000");
})
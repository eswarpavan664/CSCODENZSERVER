const express = require('express');
 
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require("cors");
const fast2sms = require('fast-two-sms')
const {mogoUrl} = require('./keys');
mongoose.connect(mogoUrl)
 
require('./models');
 
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'itonystark58@gmail.com',
    pass: 'zjzacbjjnvmbhtzh'
  }
});

 

 

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





/*

zjzacbjjnvmbhtzh

*/



 

app.get('/sendOrderAsSms',async (req,res)=>{
    const orderid = req.query.OrderId ;
    const customername = req.query.CustomerName ;
    const phonenumber = req.query.PhoneNumber ;
   var options = {authorization :'ul5V2dpBCiEz01rOck739GoyHKIZfmbwXhtnevLW4JFDMRUq8YFLZeUPJW23qOaY5R8CjcVsTE6rxIzG' , message : 'Customer:- '+customername+'\t Mobile No:-'+phonenumber+' with Order Id:-'+orderid ,  numbers : ['7993031882']} 
    const response = await fast2sms.sendMessage(options)
 
     res.send(response)
    // console.log(orderid,customername,phonenumber);
    

})




app.get('/sendgmail',(req,res)=>{

    const msg=req.query.msg;
    const gmail =req.query.gmail;

    var mailOptions = {
        from: 'eswaraaa8@gmail.com',
        to: gmail,
        subject: 'CS CODENZ',
        text: msg
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send({"status":"No"});
        } else {
          res.send({"status":"Done"});
        }
      });
       
})
 
 
 

app.listen(process.env.PORT || 5000,()=>{
    console.log("server is runnung on port 5000");
})
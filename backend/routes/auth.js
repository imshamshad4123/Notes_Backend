const express=require('express');
const User=require('../models/User');
const router=express.Router();
const bcrypt = require('bcryptjs');
// const { body, validationResult } = require('express-validator');
const { body, validationResult } = require('express-validator');
const JWT_SECRET="shamshadisagoodb$oy";
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');
router.post('/createuser',[
    body('name','enter a valid name').isLength({ min: 5 }),
    body('email','enter a valid email').isEmail(),
    body('password','password must be at least 5charcters').isLength({ min: 5 }),
],async (req,res)=>{
    let success=false
    // console.log(req.body);
    // const user=User(req.body);
    // user.save();
    // below line will check for errror in input name email,passworrd
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    try{
    let user=await User.findOne({email:req.body.email});
    if (user){
        console.log(user)
        return res.status(400).json({ success,error:"Sorry Email already exist Try something else"})
    }
    const salt= await bcrypt.genSalt(10);
    const secpassword= await bcrypt.hash(req.body.password,salt)
    //creating a new user with name email and password from usermodel  from folder model
    user=await User.create({
        name: req.body.name,
        password: secpassword,
        email:req.body.email,
    })

    // we are signing the jwt and creating a authentication token which is taking a userid from database
    const data={
        user:{
            id:user.id,
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)
    console.log(authtoken);
    success=true;
    // res.json({user})
    res.json({success,authtoken})
}catch(error){
    console.log(error.message);
    res.status(500).send("internal server error");
}
    // .then(user => res.json(user))
    //  .catch(err=> {console.log(err),
    //   res.json({error:"please enter a unique value for email",message:err.message})});
        // res.send(req.body);
})
// here start login endpoint//
router.post('/login',[
    body('email','enter a valid email').isEmail(),
    //to check password that cannot be blak we have exists method 
    body('password','password cannot be blank').exists(),
],async (req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //we are taking out email and password from req body by destructuring method
    const {email,password}=req.body
    try {
        //finding the email of user 
        let user=await User.findOne({email});
        if (!user){
            success=false
            return res.status(400).json({error:"kindly login with valid credentials"});
        }
        //compareing the password using bcrypt
        const comparepassword=await bcrypt.compare(password,user.password)
        if (!comparepassword){
            success=false
            return res.status(400).json({success,error:"kindly login with valid credentials"});
        }
        const data={
            user:{
                id:user.id,
            }
        }
        //signing the auttoken along with user id and secretkey
        const authtoken=jwt.sign(data,JWT_SECRET)
        console.log(authtoken);
        // res.json({user})
        success=true
        res.json({success,authtoken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})

//get user endpoint
//this endpoint will give the logged in user details
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        userId=req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
});
module.exports=router

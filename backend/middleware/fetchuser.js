var jwt=require('jsonwebtoken');
const JWT_SECRET="shamshadisagoodb$oy";
const fetchuser=(req,res,next)=>{

    //get the user from jwt token and append  id to request object
    //header name -'auth-token' 
    const token=req.header('auth-token');
    if (!token){
        res.status(401).send({error:"invalid token"});
    }
    try {
        //verifying both secretkey and token
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user
        next();
    } catch (error) {
        res.status(401).send({error:"invalid token kindly have valid token"});
    }
    

}


module.exports=fetchuser;
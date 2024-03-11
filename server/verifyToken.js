import  jwt  from "jsonwebtoken";
const verifyToken=(req,res,next)=>{
    const token=req.cookies.auth_token;
    if(!token)
    {
        return res.status(401).send({ auth: false, message: "No Token Provided" });
    }
    try {
        jwt.verify(token,process.env.JWT,(error,user)=>{
            if (error) {
                return res.status(500).send({ auth: false, message: "Invalid Token" });
            }
            else{
                 req.user = user;
                 next();
            }
        }) 
    } catch (error) {
        console.log(error);
        return res.status(400).send({auth: false,message: "Fail to authenticate token."});
    }
}

export default verifyToken;

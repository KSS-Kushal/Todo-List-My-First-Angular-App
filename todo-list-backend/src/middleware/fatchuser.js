const jwt = require('jsonwebtoken');
const JWT_SECRET = 'kushalisagoodb$oy';

const fatchuser=(req,res,next)=>{
    try {
        //Get the user from the jwt token and add to req object
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({error:"Invalid Token"});
        }
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"Invalid Token"});
    }
}

module.exports = fatchuser;
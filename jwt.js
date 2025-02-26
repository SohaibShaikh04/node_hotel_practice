const jwt = require('jsonwebtoken');

const jwtMiddleware = (req,red,next)=>{
    // Extrat the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unauthorized '});


    
    try{
            //Verify theJWT token
            
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
           
             //Attatch user information to the request object
             req.user = decoded
             next();

    }
    catch(err){
        console.error(err);
        res.status(401). json({error:'Invalid token'})

    }
}

//Function to generate JWT token
const generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}



module.exports = {jwtMiddleware,generateToken}
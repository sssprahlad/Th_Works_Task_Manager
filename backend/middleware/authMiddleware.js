const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ","");

    if(!token) return res.status(401).json({message:"No Token Provided"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        console.error("Token verification failed: ", error);
        return res.status(401).json({message:"Invalid or expire token"});
    }

}

module.exports = authMiddleware;
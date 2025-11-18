//middleware for checking token is valid or not
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {   //the middleware fn which will be called before actual route
    const token = req.header("Authorization");
    try{   
        if(!token)
                return res.status(401, () => console.log("did not get the token"));
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;  //now every line can use req.user.id
            next(); //go to next route 
    }    
    catch(err){
        res.status(400).send("invalid token");
    }   
};;
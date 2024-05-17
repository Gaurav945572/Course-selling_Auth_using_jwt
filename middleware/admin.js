const jwt = require("jsonwebtoken");
let {jwtPassword} = require("../config");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. 
    //Check readme for the exact headers to be expected
    //console.log("hi there")
    let token=  req.headers.authorization;
    let arr = token.split(" ");
    const jwtToken = arr[1];
    //console.log(jwtToken);
    try{
        const decodeToken = jwt.verify(jwtToken,jwtPassword);
        let decodedUsername = decodeToken.username;
        next();

    }
    catch(error){
        res.status(404).json({
            "message":"wrong token",
        })
    }
}

module.exports = adminMiddleware;

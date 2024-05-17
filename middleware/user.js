const jwt = require("jsonwebtoken");
let {jwtPassword} = require("../config");


async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB.
    // Check readme for the exact headers to be expected

    let token=  req.headers.authorization;
    let arr = token.split(" ");
    const jwtToken = arr[1];
    const decodeToken = jwt.verify(jwtToken,jwtPassword);
    let decodedUsername = decodeToken.username;
    if(decodedUsername){
        req.username = decodedUsername; //this will send the data to next middleware
        next();
    }
    else{
        res.status(404).json({
            "message":"wrong token",
        })
    }


}

module.exports = userMiddleware;
// THIS IS THE Javascript Web Token
const javaWebToken = require("jsonwebtoken"); 

// THIS IS MIDDLEWARE and authorizes user
// THIS OCCURS BEFORE THIS IS PASSED ONTO THE CONTROLLER
module.exports = {
    authenticate( request, res, next) {
        // THE javaWebToken is what VERIFIES also called jwt w00t
        javaWebToken.verify(request.cookies.usertoken,
        process.env.JWT_SECRET,     //THIS IS THE SECRET KEY, it can be called anything
        (err, payload) => {
            if (err){   // 401 is UNAUTHORIZED response, this occurs if check is not passed with correct key
                res.status(401).json({ verified:false });
            } 
            else {      // IF VALID YOU GO TO THE NEXT PAGE
                next();
            }
            
        });
    }
};

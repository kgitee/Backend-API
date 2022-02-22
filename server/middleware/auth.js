/*
    const config = require('config');
    const jwt = require('jsonwebtoken');

    function auth(req, res, next) {
        const token = req.header('x-auth-token');

        // Check for token
        if(!token){
            return res.status(401).json({ msg: 'No token, authorization denied'});
        }
        
        try{
            // Verify token
            const decoded = jwt.verify(token, config.get('jwtsecret'));
            //Add user from payload
            req.user = decoded;
        next();
        } catch(e){
            res.status(400).json({ msg:'Token is not valid'});
        }
    }

    module.exports = auth;
*/

const config = require('config');
const jwt = require("jsonwebtoken");
const secret = "EcommerceAPI"

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    return jwt.sign(data, secret, {}) //the empty object can receive various optional settings, but we do not need any
}

module.exports.verify = (req, res, next) => {
    //get our JSON web token from the request's authorization header (req.headers.authorization)
    let token = req.headers.authorization;

    //if a token is NOT included in the request, it is undefined.
    if(typeof token !== "undefined") {
        console.log(token)
        token = token.slice(7, token.length) 

        return jwt.verify(token, secret, (err, data) => {
    
            if(err){
                return res.send({auth: "failed"})
            }else{
                next() 
            }
        })
    }else{ 
        return res.send({auth: "failed"})
    }
}

module.exports.decode = (token) => {
    if(typeof token !== "undefined"){
        token = token.slice(7, token.length)

        //perform verify again just to be safe
        return jwt.verify(token, secret, (err, data) => {
            if(err){
                return null //if token cannot be verified, return null
            }else{
                return jwt.decode(token, {complete: true}).payload
                //return the payload from decoding the token, which is an object
            }
        })
    }else{ //if no token, return null
        return null
    }
}
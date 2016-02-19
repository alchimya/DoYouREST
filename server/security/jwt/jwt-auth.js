/**
 * Created by domenicovacchiano on 11/01/16.
 * Implements a Jason Web Toke authentication
 */

var jwt=require('jsonwebtoken'),
    config= require ('../.././config/app-config')(),
    fs=require('fs'),
    authentication=require('../authentication-enums')();

function JWKResponse(){
    return{
        send:function(req, res, next,err,decoded){
            if (err ) {
                return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        }
    };
}
function JWTSecurity(){

    return{
        auth:  function (req, res, next) {
            // check header or url parameters or post parameters for token
            var token = (req.body ? req.body.token:null) || (req.query ? req.query.token:null) || req.headers['x-access-token'];

            if (token) {
                // verifies secret and checks exp
                switch (config.authentication.jwt.cryptography){
                    case authentication.jwt.cryptography.SYMMETRIC:
                        jwt.verify(token, config.authentication.jwt.symmetricKey, function(err, decoded) {
                            JWKResponse().send(req,res,next,err,decoded);
                        });
                        break;
                    case authentication.jwt.cryptography.ASYMMETRIC:
                        //verify a token asymmetric
                        var cert = fs.readFileSync(config.authentication.jwt.asymmetricPublicKey);  // get public key
                        var self=this;
                        jwt.verify(token, cert, { algorithm: 'RS256'},function(err, decoded) {
                            JWKResponse().send(req,res,next,err,decoded);
                        });
                        break;
                }

            } else {

                // if there is no token
                // return an error
                return res.status(401).send({ success: false, message: 'No token provided.' });
            }

        }
    };

}

module.exports=JWTSecurity;
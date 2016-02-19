/**
 * Created by domenicovacchiano on 11/01/16.
 */

var express = require('express'),
    router = express.Router(),
    securityUser= require ('./../security-users'),
    errorResponse = require('./../../helpers/error-response'),
    config= require ('../.././config/app-config')(),
    authentication=require('../authentication-enums')(),
    fs=require('fs'),
    jwt=require('jsonwebtoken');

router.post('/', function (req, res,next) {

    console.log(req.body);

    if (!req.body | !req.body.uid | !req.body.pwd){
        return res.status(401).send(errorResponse(401,"unauthorized","unauthorized"));
    }

    //gets username and password
    var uid,pwd;
    uid=req.body.uid;
    pwd=req.body.pwd;


    var  unauthorized={
        success: false,
        token: null
    };
    //////////////////////////////////////////////////
    //checks if the user sent with the input params
    //is configured on your system (see securityusers.json)
    //you can customize this code, checking the credentials with different ways
    //for instance in a table database
    var user=new securityUser();
    if (!user.load(uid,pwd)){
        return res.status(401).send(unauthorized);
    }
    //////////////////////////////////////////////////

    var payload={
        username:uid,
        password:pwd
    };

    // if user is found and password is right
    // create a token
    var token =null;
    switch (config.authentication.jwt.cryptography){
        case authentication.jwt.cryptography.SYMMETRIC:
            token=jwt.sign(payload, config.authentication.jwt.symmetricKey, {
                expiresInMinutes: config.authentication.expirationToken
            });
            break;
        case authentication.jwt.cryptography.ASYMMETRIC:
            //sign with RSA SHA256
            var cert = fs.readFileSync(config.authentication.jwt.asymmetricPivateKey);
            token = jwt.sign(payload, cert, { algorithm: 'RS256'});
            break;
    }

    // return the information including token as JSON
    res.json({
        success: true,
        token: token
    });


});

module.exports = router;
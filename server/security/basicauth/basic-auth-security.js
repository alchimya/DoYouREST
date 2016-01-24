/**
 * Created by domenicovacchiano on 07/01/16.
 */

var basicAuth = require('basic-auth'),
    errorResponse = require('./../../helpers/error-response'),
    securityUser= require ('./../security-users');


//implements a basic authentication by using basic-auth module
//if the credentials set on the class constructor are different of the credentials
//sent on the header, it returns an unauthorized 401 status
function BasicAuthSecurity(){

    return{
        auth:  function (req, res, next) {

            function unauthorized(res) {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                res.status(401).send(errorResponse(401,"unauthorized","unauthorized"));
            };
            var userIn = basicAuth(req);
            //console.log(userIn);
            if (!userIn || !userIn.name || !userIn.pass) {
                return unauthorized(res);
            };
            //////////////////////////////////////////////////
            //checks if the user sent with the header basic auth credentials
            //is configured on your system (see securityusers.json)
            //you can customize this code, checking the credentials with different ways
            //for instance in a table database

            var user=new securityUser();
            if (!user.load(userIn.name,userIn.pass)){
                return unauthorized(res);
            }
            return next();
            //////////////////////////////////////////////////


        }
    };

}

module.exports = BasicAuthSecurity;
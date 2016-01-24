/**
 * Created by domenicovacchiano on 07/01/16.
 * Load all the users that can login on the system.
 * These users are used to implement the security middleware (see basicauth and jwt)
 */

var fs = require('fs');

function AuthUser(){
    this.uid=null;
    this.pwd=null;
}

AuthUser.prototype.load=function(uid,pwd){

    //load all the users stored within the json file
    var basicauthusers = JSON.parse(fs.readFileSync('./security/securityusers.json'), 'utf8');
    //try to find the request use
    var user =basicauthusers.users.filter(function(item) {
        return item.uid === uid && item.pwd === pwd
    });
    //if the user exists, returns username and password
    if (user[0]){
        this.uid=user[0].uid;
        this.pwd=user[0].pwd;
        return true;
    }
    return false;

};


module.exports=AuthUser;
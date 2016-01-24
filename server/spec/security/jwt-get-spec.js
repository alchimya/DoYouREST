/**
 * Created by domenicovacchiano on 24/01/16.
 */

var request = require('request'),
    TestHelper=require ('./../test-helper')();

describe('TOKEN GET',function(){

    it("/token with no body params, should respond with 401 status code", function(done) {
        request({
            url: TestHelper.makeBaseUrl() + '/token',
            method: 'POST'
        }, function(error, response, body){
            expect(response.statusCode).toBe(401);
            done();
        });
    });

    it("/token with a wrong user, should respond with 401 status code", function(done) {
        request({
            url: TestHelper.makeBaseUrl() + '/token',
            method: 'POST',
            json:{
                uid:"fake_user",
                pwd:"fake_password"
            }
        }, function(error, response, body){
            expect(response.statusCode).toBe(401);
            done();
        });
    });

    it("/token with a valid user, should respond with 200 status code", function(done) {
        request({
            url: TestHelper.makeBaseUrl() + '/token',
            method: 'POST',
            json:{
                uid:"my_uid_1",
                pwd:"my_pwd_1"
            }
        }, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(body.token).toBeDefined();
            expect(body.token).not.toBeNull();
            done();
        });
    });

});

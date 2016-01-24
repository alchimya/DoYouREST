/**
 * Created by domenicovacchiano on 24/01/16.
 */

var request = require('request'),
    TestHelper=require ('./../test-helper')();

describe('TOKEN AUTH',function(){

    it("a request with no token,should respond with 401 status code", function(done) {
        request({
            url: TestHelper.makeApiUrl('test'),
            method: 'POST'
        }, function(error, response, body){
            expect(response.statusCode).toBe(401);
            done();
        });
    });


    it("a request with a wrong token,should respond with 401 status code", function(done) {
        request({
            url: TestHelper.makeApiUrl('test'),
            method: 'POST',
            json:{
                token:"1234"
            }
        }, function(error, response, body){
            expect(response.statusCode).toBe(401);
            done();
        });
    });

    it("a request with a valid token,should respond with 200 status code", function(done) {
        request({
            url: TestHelper.makeBaseUrl() + '/token',
            method: 'POST',
            json:{
                uid:"my_uid_1",
                pwd:"my_pwd_1"
            }
        }, function(error, response, body){
            request({
                url: TestHelper.makeApiUrl('test'),
                method: 'POST',
                json:{
                    token:body.token
                }
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                done();
            });
            done();
        });


    });

});

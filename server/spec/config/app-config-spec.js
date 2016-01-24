/**
 * Created by domenicovacchiano on 24/01/16.
 */
var config=require("./../../config/app-config")();

describe('CONFIG OBJECT CHECK',function(){

    it("config server object shoud have all properties defined", function(done) {
        //server
        expect(config.server.port).toBeDefined();
        expect(config.server.port).toEqual(jasmine.any(Number));

        expect(config.server.apiRoute).toBeDefined();
        expect(config.server.apiRoute).toEqual(jasmine.any(String));

        expect(config.server.isCluster).toBeDefined();
        expect(typeof config.server.isCluster).toEqual('boolean');

        expect(config.server.headers).toBeDefined();
        expect(config.server.headers).toEqual(jasmine.any(Array));



        done();
    });

    it("config database object shoud have all properties defined", function(done) {

        //database
        expect(config.database.name).toBeDefined();
        expect(config.database.name).toEqual(jasmine.any(String));

        expect(config.database.user).toBeDefined();
        expect(config.database.user).toEqual(jasmine.any(String));

        expect(config.database.password).toBeDefined();
        expect(config.database.password).toEqual(jasmine.any(String));

        expect(config.database.host).toBeDefined();
        expect(config.database.host).toEqual(jasmine.any(String));

        expect(config.database.port).toBeDefined();
        expect(config.database.port).toEqual(jasmine.any(Number));

        expect(config.database.connectionPool).toBeDefined();
        expect(config.database.connectionPool).toEqual(jasmine.any(Number));

        expect(config.database.isEnabled).toBeDefined();
        expect(typeof config.database.isEnabled).toEqual('boolean');


        done();
    });

    it("config authentication object shoud have all properties defined", function(done) {

        //authentication
        expect(config.authentication.isEnabled).toBeDefined();
        expect(typeof config.authentication.isEnabled).toEqual('boolean');

        expect(config.authentication.type).toBeDefined();
        expect(config.authentication.type).toEqual(jasmine.any(Number));

        expect(config.authentication.expirationToken).toBeDefined();
        expect(config.authentication.expirationToken).toEqual(jasmine.any(Number));

        expect(config.authentication.jwt).toBeDefined();
        expect(config.authentication.jwt).toEqual(jasmine.any(Object));

        expect(config.authentication.jwt.cryptography).toBeDefined();
        expect(config.authentication.jwt.cryptography).toEqual(jasmine.any(Number));

        expect(config.authentication.jwt.symmetricKey).toBeDefined();
        expect(config.authentication.jwt.symmetricKey).toEqual(jasmine.any(String));

        expect(config.authentication.jwt.asymmetricPivateKey).toBeDefined();
        expect(config.authentication.jwt.asymmetricPivateKey).toEqual(jasmine.any(String));

        expect(config.authentication.jwt.asymmetricPublicKey).toBeDefined();
        expect(config.authentication.jwt.asymmetricPublicKey).toEqual(jasmine.any(String));

        done();
    });

    it("config socketio object shoud have all properties defined", function(done) {

        //socketio
        expect(config.socketio.isEnabled).toBeDefined();
        expect(typeof config.socketio.isEnabled).toEqual('boolean');

        done();
    });



});
# DoYouREST
A ready to use project to develop your REST API under NodeJS.

# What is this?
You can see this project as a template to develop RESTful services using the NodeJS ecosystem.
<br/>
In a very easy way (through a JSON config file) you can configure:

 - <b>Server variables</b> such as: listening port, API routing path, clustering behaviour, headers.
 - <b>Database variables</b> such as: login and host params, connenciton pool, enable/disable.
 - <b>Authentication mode</b>: you can choose to enable/disable the authentication and you can setup it through JSON Web Token or basic-auth.
 - <b>Socket.io</b>: you can enable/disable this feature, that allows to implement a real-time behaviour

Basically, this project has been developed around the following Node modules:
- ExpressJS: used to develop some useful middleware and to implement the REST behaviour (http://expressjs.com/)
- SequelizeJS: is a promise-based ORM (http://docs.sequelizejs.com/en/latest/)
- MySql Driver: is a node.js driver for mysql written in JavaScript (https://github.com/felixge/node-mysql)
- Socket.io: used to implement a realtime behaviour (http://socket.io).
<br/>
<br/>
 This package also includes different test client solutions for the following environments:
 
- iOS
- Android
- AngularJS
- jQuery
- PHP (TODO)
- .NET Client (as a WPF solution)


# How to install

- cd DoYouREST/server
- sudo npm install

# Server Project Structure

——> app
<br/>
    —————> config
    <br/>
    —————> controllers
    <br/>
    —————> helpers
    <br/>
    —————> security
    <br/>
	   ———————> basicauth
	        <br/>
	   ———————> jwt
	        <br/>
    —————> sequelize
    <br/>
    —————> models
    <br/>
    —————> spec
    <br/>
	   ———————> config
	        <br/>
	   ———————> security
	        <br/>

where:

- <b>config</b>: contains the config file and its “driver” class
- <b>controllers</b>:contains all the API modules
- <b>helpers</b>: contains some helper classes
- <b>basicauth</b>: middleware for the basic-auth
- <b>jwt</b>: middleware for the JSON Web Token authentication
- <b>sequelize</b>: contains the main class to manage the db connection
- <b>models</b>: put here all your sequelize models
- <b>spec</b>: contain all the jasmine tests

# Configuration
All the configuration settings listed below are included within the file <b>/Config/appconfig.json</b>

1) <b>Server Configuration</b>
<br/>Use this configuration to setup the server settings.
<br/>You can find these information under the object server as follow:

```javascript
"server":{
    "port":8080,
    "apiRoute":"/api",
    "isCluster":true,
    "headers":[
      {"name":"Access-Control-Allow-Origin","value":"*"},
      {"name":"Access-Control-Allow-Headers","value":"Origin, X-Requested-With, Content-Type, Accept"},
      {"name":"Access-Control-Allow-Methods","value":"GET,PUT,POST,DELETE,OPTIONS"}
    ]
```
where:
- <b>port</b>: is the port where the server is listening
- <b>apiRoute</b>: is the base routing path to access to the api (eg http://localhost:8080<b>/api</b>/customers)
- <b>isCluster</b>: by setting this value to true the Node app will be clustered and you will take advantage of multi-core systems (here a good tutorial about the node clustering http://stackabuse.com/setting-up-a-node-js-cluster/ and here the official documentation https://nodejs.org/api/cluster.html).
- <b>headers</b>:put here all the response headers that you want to use, for example to enable the cross-origin resource sharing.

2) <b>Database Configuration</b>
<br/>
Within the scripts folder of this package, you can find the <b>DoYouRest.sql</b> file, that allows to create a test database.
If you will setup the <b>doyourest</b> database into your MySql environment, you will be able to use the test api included into the api-sequelize-test,js module (<b>/sequelize/customers</b> and <b>/sequelize/customers/id</b>).
<br/>Use this configuration to setup the MySql settings.
<br/>You can find these information under the object database as follow:

```javascript
"database":{
    "name":"doyourest",
    "user":"your_mysql_user",
    "password":"your_mysql_password",
    "host":"localhost",
    "port":3306,
    "connectionPool":100,
    "isEnabled":true,
    "type":0
  }
```
where:
- <b>name</b>: the name of your database
- <b>user</b>: the user name to login into you database
- <b>password</b>: the password to login into you database
- <b>host</b>: the host of your MySql instance
- <b>port</b>:listening port of your MySql
- <b>connectionPool</b>:setup here the conneciton pool (if you are not familiar with conenciton pool see here https://en.wikipedia.org/wiki/Connection_pool)
- <b>isEnabled</b>: set this param to false if you don't want to use and to connect to the database.

- 
3) <b>Auth Configuration</b>
<br/> Use this configuration to specify the kind of authentication that you want to use (basich-auth or JSON Web Token) and to enable/disable this behaviour.
<br/>You can find this information under the object authentication as follow:

```javascript
"authentication":{
    "isEnabled":true,
    "type":1,
    "expirationToken":1440,
    "jwt":{
      "cryptography":1,
      "symmetricKey":"my_super_top_secret_key!!!",
      "asymmetricPivateKey":"./security/private.key",
      "asymmetricPublicKey":"./security/public.pem"
    }
  }
```
where:
- <b>isEnabled</b>: enable/disable the authentication for all http request
- <b>type</b>: 0 to enable the basic-authentication, 1 for the JSON Web Token.
- <b>expirationToken</b>: use this param (minutes) to limit the lifetime of the token
- <b>jwt.cryptography</b>: represents the kind of cryptography that you want to use for the token: 0 for a symmetric cryptography with a key, 1 to use a cryptography based on a public/private key pair.
- <b>jwt.symmetricKey</b>:key used encrypt/decrypt the token.
- <b>jwt.asymmetricPivateKey</b>: a private key to sign the token with the RS256 algorithm
- <b>jwt.asymmetricPublicKey</b>: a public key used to decrypt the token.

For this purpose, the user list granted to access, are stored into the configuration file (./security/securityusers.json), but is intended that you can use a different approach.
<br/>
To do this you need to customize the <b>AuthUser()</b> class (./security/security-users.js).
<br/>
If you enable the JSON Web Token, before each request you have to obtain a token (http://yourserver:port/token) and then you have to send it (as a JSON boby, request params or x-access-token) for each API request.

![ScreenShot](https://raw.github.com/alchimya/DoYouREST/master/screenshots/token_flow.png)

<br/>
To request a token you have to send a POST with a JSON body with an user name and a password as folow:
```javascript
{
  "uid":"my_uid_1",
  "pwd":"my_pwd_1"
}
```
As response you will recevive a JSON body as follow:

```javascript
{
  "success": true,
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6Im15X3VpZF8xIiwicGFzc3dvcmQiOiJteV9wd2RfMSIsImlhdCI6MTQ1MzY2MTkyM30.M4yuuEsrruQgOcRdgFgDS5ohBvq38Gnd5fVJQYiKs6inQzQLqMYfECjokM-MH0uNc7vpuSKUVt1uzQKd478taLlOZFxkLphKaSXezDTu9TpLPk8FXuosel-rYfSSTgJKF4YPIo9raCEBueScA7p3YIS6-ySF-cyPVb8JZicE6WKIYQ4xICB4QeTa2YxTB4sCVEFsIhOiroAtifAphlBaMd0uF1A5w7iGcw0v9hc4nvT6fDEdqIf_4oVrIjt9dhu0JGJ1PTZ_2A91aVCei3jodNLmQr72UB9B339qppM3UuSVzXkj81PxIN-UJbRqMDEYXKM_YODEf2I0d4-2aTaWwg"
}
```
For further details see the clients included with this package.

4) <b>Socket.io Configuration</b>
<br/> Use this configuration to setup the socket.io settings.
<br/>You can find these information under the object socketio as follow:

```javascript
"socketio":{
    "isEnabled":true
  }
```
where:
- <b>isEnabled</b>: enable/disable the socket.io behaviour.
<br/>
Why did I use Socket.io for RESTFul web services? 
<br/>
Well, I think that it should be useful to implement a real-time communication with other "actors" in a more complex architecture.
<br/>
Imagine a similar scenario:

![ScreenShot](https://raw.github.com/alchimya/DoYouREST/master/screenshots/rest_socket.png)

In this scenario a mobile application executes for example a login through a web api.
<br/>
The server, through Socket.io, will dispatch a signal that a new client is logged-in, to all the clients (e.g. a web client monitor) connected to the server through an instance of socket.io. 
<br/>
In this way you can monitor all the activities and actions of each client (e.g. mobile devices) connected  to the server.
<br/>
Imagine that you have a mobile app with a “check-in” function like Facebook. 
<br/>
The mobile device sends a request through a web api, sending latitude and longitude of its current position.
<br/>
The server will recevive these data and will dispatch, for example, these information to a web client, connected to the server with socket.io, that can show these information on a map.

![ScreenShot](https://raw.github.com/alchimya/DoYouREST/master/screenshots/CheckInOut.gif)

# How to start the server
You have just to execute under node the server.js module

# How to create your custom API
With this package, is quite easy to add a new REST resource module to define your custom API.
<br/>
All the API are included into the <b>controllers</b> folder.
<br/>
To create a new REST resource module you have to open the file <b>/controllers/index.js</b> and to add the following directive:
```javascript
app.use('/you_routing_path', require('./your_api_module_definition'));
```
where:
<b>you_routing_path</b>: defines the route of the api (e.g. /api/customers)
<b>your_api_module_definition</b>:is your custom js module that contains your REST definitions for the http verbs tha you want to implement.

# API Examples
Within the <b>controllers</b> folder tu can find, as example purpose, the following API modules:

- <b>api-basic-test.js</b>: this module shows how to implement the basic operation for a GET and a POST with the router of ExpressJS framework.
<br/>
The routing of this module (see /controllers/index.js) is mapped as /apiRoute/test
<br/>
There are three resources consumable as:
<br/>
GET <b>/apiRoute/test</b>
<br/>
GET <b>/apiRoute/test/id</b>
<br/>
POST <b>/apiRoute/test</b>

- <b>api-sequelize-test.js</b>: this module shows how to implement an API by querying data to the doyourest database by using sequelize.
<br/>
There are two kind of data query: by ORM Model and by SQL String. 
<br/>
The routing of this module (see /controllers/index.js) is mapped as /apiRoute/sequelize.
<br/>
There are three resources consumable as:
<br/>
POST <b>/apiRoute/sequelize/query/table</b>:will executed a <b>SELECT *</b> on the table passed with the request path
<br/>
POST <b>/apiRoute/sequelize/customers</b>:will load all the records of the customers table (see doyourest sample db)
<br/>
POST <b>/apiRoute/sequelize/customers/id</b>:will load the record of the customers table filtered by the id passed with the request path

- <b>api-mysql-test.js</b>: this module shows how to implement an API by querying data to the doyourest database by using the mysql driver and sequelize. Try to switch the type parameter on the database config params to test the two database drivers.
<br/>
The routing of this module (see /controllers/index.js) is mapped as /apiRoute/mysql.
<br/>
There is one resource consumable as:
<br/>
POST <b>/apiRoute/mysql/query/table</b>:will executed a <b>SELECT *</b> on the table passed with the request path.
<br/>

- <b>api-socketio-test.js</b>: this module shows how to emit a signal through socket.io after performing an operation.
<br/>
The routing of this module (see /controllers/index.js) is mapped as /apiRoute/geolocation.
<br/>
There are two resources consumable as:
<br/>
POST <b>/apiRoute/geolocation/checkin/</b>
<br/>
POST <b>/apiRoute/geolocation/checkout/</b>


# Tests

I developed some useful tests by using jasmine-node (https://github.com/mhevery/jasmine-node).
All the tests are included into the spec folder.
To run the tests you have to use the command
```javascript
jasmine-node file_name-spec.js
```
For example to run the <b>jwt-get-spec</b> under the <b>./spec/security</b> folder you have to type:
```javascript
jasmine-node ./security/jwt-get-spec.js
```
Example:
```javascript
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
```

# Clients
All the clients included with this package, are just an example of how to consume a RESTful sevrice under different environments and with different programming languages.
<br/>
When in a client folder you will find a <b>package.json</b> file (e.g. Angular and jQuery), it means that you have to install it through npm.

- <b>iOS</b>: the http request happens, asynchronously, through <b>NSMutableURLRequest</b> and <b>NSURLSession</b>, see  L3SDKJWARequest.swift class (https://github.com/alchimya/iOS-JSON-API).
- <b>Android</b>: the http request happens, asynchronously, through <b>AsyncHttpClient</b> (http://loopj.com/android-async-http/), see RequestHandler.java class.
- <b>Angular</b>: the http request happens, asynchronously, through the <b>$http</b> service. The reuqested token will be stored in a $scope variable, see MainController.js controller.
- <b>jQuery</b>: the http request happens, asynchronously, through the<b>jQuery.ajax()</b> method, see HttpRequest.js class. The reuqested token will be stored in to the body DOM element through the jQuery.data() method, see MainController.js.
- <b>.NET (WPF Solution)</b>:  the http request happens, asynchronously, through the <b>HttpClient</b>, see  HttpAsyncRequest.cs class.
- <b>PHP</b>:...is coming...sorry!

# Conclusion
Enjoy!

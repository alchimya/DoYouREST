/**
 * Created by domenicovacchiano on 06/01/16.
 */
var config= require ('./config/app-config')(),
    express=require('express'),
    bodyParser = require('body-parser'),
    socketio= require('./helpers/socket-io'),
    authentication=require('./security/authentication-const')(),
    errorResponse = require('./helpers/error-response'),
    morgan= require('morgan'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length;


    if (cluster.isMaster && config.server.isCluster) {
        console.log("cpus:" + numCPUs);
        for (var i = 0; i < numCPUs; i++) {
            // Create a worker
            cluster.fork();
        }
        //Cluster Error Handling
        cluster.on('exit', function(worker, code, signal) {
            console.log('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
            cluster.fork();
        });

    } else {
        // Workers share the TCP connection in this server

        //#######################################################################
        //Express and app initialization

        //creates app on express 
        var app=express();

        //body parser setup
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        //use morgan to log requests to the console
        app.use(morgan('dev'));

        //HEADER SETTING
        app.all('/*', function(req, res, next) {
            config.server.headers.forEach(function(item) {
                //console.log(item);
                res.header(item.name, item.value);
            });
            next();
        });

        //auth setup
        if (config.authentication.isEnabled){
            switch (config.authentication.type){
                case authentication.type.BASIC_AUTH:
                    //require authentication on each api request
                    var basicAuthSecurity=require('./security/basicauth/basic-auth-security');
                    app.all(config.server.apiRoute + '/*', basicAuthSecurity().auth)
                    break;
                case authentication.type.JWT:
                    //require JSON token on each api request
                    var jwtAuthSecurity= require('./security/jwt/jwt-auth');
                    app.all(config.server.apiRoute + '/*', jwtAuthSecurity().auth)
                    app.use('/token', require('./security/jwt/jwt-get'));
                    break;
            }
        }


        //starts listening on configured port 
        var server=app.listen(config.server.port,function(){
            console.log("Server started on port " + config.server.port);
        });

        //Http Error Handling on \
        app.use(function(err, req, res, next) {
            //TODO LOG ERROR
            console.log(err);
            res.status(500).send(errorResponse(1000,"Application Error","Application Error"));
        });



        //#######################################################################
        //Routing setup

        //require index contronode serverller
        var router = require('./controllers')(app);

        //#######################################################################
        //Socket.io: liste to the client conenctions
        if (config.socketio.isEnabled){
            //creates a socket.io instance with connection and disconnect events
            var io = require('socket.io')(server);
            io.on('connection', function (socket) {
                socketio.connections().push(socket);
                console.log('A new socket is connected!');
                socket.on('disconnect', function() {
                    var socketIndex = socketio.connections().indexOf(socket);
                    console.log('socket = ' + socketIndex + ' disconnected');
                    if (socketIndex >= 0) {
                        socketio.connections().splice(socketIndex, 1);
                    }
                });
            });
        }

    }



/**
 * Created by domenicovacchiano on 22/03/15.
 */

var config= require ('.././config/app-config')();

module.exports = function (app) {

    //put here yout api modules
    //app.use('/you_routing_path', require('./your_api_module_definition'));
    //for further details see the Express documentation

    app.use( config.server.apiRoute + '/test', require('./api-basic-test'));
    app.use( config.server.apiRoute + '/geolocation', require('./api-socket-io-test'));
    app.use( config.server.apiRoute + '/geolocation', require('./api-socket-io-test'));
    app.use( config.server.apiRoute + '/sequelize', require('./api-sequelize-test'));
};


/**
 * Created by domenicovacchiano on 14/01/16.
 * Sequelize helper
 * Note:every time that this class will be cached by NodeJs, so
 * it has a singleton behaviour
 */
var sequelize = require('sequelize')
    config= require ('.././config/app-config')();

function Sequelize(){


    if (config.database.isEnabled) {

        var _connection = new sequelize(config.database.name, config.database.user, config.database.password, {
            host: config.database.host,
            port: config.database.port,
            pool: {
                maxConnections: config.database.connectionPool,
                maxIdleTime: 30
            },
            logging: false,
            define: {
                timestamps: false
            }
        });

        _connection.authenticate()
            .then(function () {
                console.log("MySlq connection established");
            })
            .catch(function (err) {
                console.log("db connection error", err);
                res.status(500).send(errorResponse(1001, "Database Connection Error", "Application Error"));
            })
            .done();
    }
    return {
        connection:_connection
    };
}

module.exports=Sequelize;
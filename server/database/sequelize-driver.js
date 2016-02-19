/**
 * Created by domenicovacchiano on 13/02/16.
 * Sequelize helper
 * Note:every time that this class will be cached by NodeJs, so
 * it has a singleton behaviour
 */

var sequelize = require('sequelize'),
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
    }
    return {
        connection:_connection
    };
}

module.exports=Sequelize;
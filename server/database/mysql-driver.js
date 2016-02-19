/**
 * Created by domenicovacchiano on 13/02/16.
 * MySql helper
 * Note:every time that this class will be cached by NodeJs, so
 * it has a singleton behaviour
 */

var mysql= require('mysql'),
    config= require ('.././config/app-config')();

function MySql(){

    if (config.database.isEnabled) {
        var _connection  = mysql.createPool({
            connectionLimit : config.database.connectionPool,
            host            : config.database.host,
            port            : config.database.port,
            user            : config.database.user,
            password        : config.database.password,
            database        : config.database.name
        });
    }

    return {
        connection:_connection
    };
}

module.exports=MySql;
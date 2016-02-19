/**
 * Created by domenicovacchiano on 13/02/16.
 */

var config= require ('.././config/app-config')(),
    databaseEnum=require('./database-enums')();

function Database(){

    var _connection=null;
    if (config.database.isEnabled){
        switch (config.database.type){
            case databaseEnum.type.MYSQL_SEQUELIZE:
                var sequelizeDrv=require('./sequelize-driver')();
                _connection=sequelizeDrv.connection;
                break;
            case databaseEnum.type.MYSQL_DRIVER:
                var mysqlDrv=require('./mysql-driver')();
                _connection=mysqlDrv.connection;
                break;
        }
    }
    return{
        connection:_connection
    };

}
module.exports=Database;
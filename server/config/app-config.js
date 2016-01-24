/**
 * Created by domenicovacchiano on 06/01/16.
 * Note:every time that this class will be cached by NodeJs, so
 * it has a singleton behaviour
 */

var fs = require('fs');

function Config(){
    //read the config json file and fille the object
    var jsonconfig = JSON.parse(fs.readFileSync('./config/appconfig.json'), 'utf8');

    return{
        server:{
            port:jsonconfig.server.port,
            apiRoute:jsonconfig.server.apiRoute,
            isCluster:jsonconfig.server.isCluster,
            headers:jsonconfig.server.headers
        },
        database:{
            name:jsonconfig.database.name,
            user:jsonconfig.database.user,
            password:jsonconfig.database.password,
            host:jsonconfig.database.host,
            port:jsonconfig.database.port,
            connectionPool:jsonconfig.database.connectionPool,
            isEnabled:jsonconfig.database.isEnabled
        },
        authentication:{
            isEnabled:jsonconfig.authentication.isEnabled,
            type:jsonconfig.authentication.type,
            expirationToken:jsonconfig.authentication.expirationToken,
            jwt:{
                cryptography:jsonconfig.authentication.jwt.cryptography,
                symmetricKey:jsonconfig.authentication.jwt.symmetricKey,
                asymmetricPivateKey:jsonconfig.authentication.jwt.asymmetricPivateKey,
                asymmetricPublicKey:jsonconfig.authentication.jwt.asymmetricPublicKey
            }
        },
        socketio:{
            isEnabled:jsonconfig.socketio.isEnabled
        }
    };
}
module.exports=Config;

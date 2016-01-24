/**
 * Created by domenicovacchiano on 12/05/15.
 */

var config=require("./../config/app-config")()

function TestHelper(){

    return{
        //makes an URL with a resource path
        makeApiUrl:function(resource){
            return this.makeBaseUrl() + config.server.apiRoute + '/' +  resource;
        },
        //makes a base URL
        makeBaseUrl:function(){
            return'http://localhost:' + config.server.port;
        }
    };

}

module.exports=TestHelper;
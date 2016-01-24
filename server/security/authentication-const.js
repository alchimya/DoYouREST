/**
 * Created by domenicovacchiano on 08/01/16.
 */

function Authentication(){
    return{
        type:{
            BASIC_AUTH:0,
            JWT:1
        },
        jwt:{
            cryptography:{
                SYMMETRIC:0,
                ASYMMETRIC:1
            }
        }

    }

}


module.exports=Authentication;
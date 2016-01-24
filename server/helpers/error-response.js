/**
 * Created by domenicovacchiano on 07/01/16.
 * Helper class for the error representation.
 */

function ErrorResponse(code,message,domain){
    return  {
        error:{
            code:code,
            message:message,
            domain:domain
        }
    };
}
module.exports=ErrorResponse;
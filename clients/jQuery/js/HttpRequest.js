/**
 * Created by domenicovacchiano on 16/01/16.
 */

function HttpRequest(){

}

HttpRequest.prototype.request=function(url,method,data){
    var def = $.Deferred();

    $.ajax({
        url : url,
        type: method,
        data : data,
        success: function(data, status, jqXHR) {
            def.resolve(data);
        },
        error: function (data, status, errorMessage) {
            def.reject(data);
        }
    });

    return def.promise();

}
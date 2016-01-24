/**
 * Created by domenicovacchiano on 15/01/16.
 */



$("#token").on("click",function(){

    var tokenUtility= new TokenUtility();
    tokenUtility.clear();

    var http= new HttpRequest();
    http.request(
        "http://localhost:8080/token",
        "POST",
        {uid:'my_uid_1',pwd:'my_pwd_1'},
        "TOKEN_REQUEST"
    ).then(function(result) {
        //console.log(result)
        tokenUtility.save(result);
        $('#response').val(JSON.stringify(result));
    }, function(errStatus) {
        //console.log(errStatus)
        $('#response').val(JSON.stringify(result));
    });
});

$("#apiTest").on("click",function(){

    var tokenUtility= new TokenUtility();

    var http= new HttpRequest();
    http.request(
        "http://localhost:8080/api/test",
        "POST",
        {token:tokenUtility.load()},
        "TOKEN_REQUEST"
    ).then(function(result) {
        //console.log(result)
        $('#response').val(JSON.stringify(result));
    }, function(errStatus) {
        //console.log(errStatus)
        $('#response').val(JSON.stringify(result));
    });
});


function TokenUtility(){

}
TokenUtility.prototype.clear=function(){
    $("body").removeData("token");
}
TokenUtility.prototype.save=function(data){
    $("body").data("token",data.token);
}
TokenUtility.prototype.load=function(){
    return $("body").data("token");
}

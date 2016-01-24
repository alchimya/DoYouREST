/**
 * Created by domenicovacchiano on 15/01/16.
 */

var mainController=angular.module('app.MainController',[]);
mainController.controller('MainController',function($scope,$http){

    $scope.httpData={};
    $scope.httpDataString=null;
    $scope.token=null;

    $scope.requestToken = function() {

        $scope.httpRequest(
            "http://localhost:8080/token",
            "POST",
            "'Content-Type': 'application/json'",
            null,
            {uid:'my_uid_1',pwd:'my_pwd_1'},"TOKEN_REQUEST");
    };
    $scope.apiTestBasic=function(){

        $scope.httpRequest(
            "http://localhost:8080/api/test",
            "POST",
            "'Content-Type': 'application/json'",
            {token:$scope.token},
            null,null);

    };
    $scope.httpRequest=function(url,method,headers,params,data,tag){

        $http({
            method: method,
            url:url ,
            headers:headers,
            params:params,
            data:data
        })
            .success(function (data, status, headers, config) {
                $scope.isRequestInProgress=false;
                $scope.httpData=data;
                $scope.httpDataString=JSON.stringify($scope.httpData);
                if (tag==="TOKEN_REQUEST"){
                    $scope.token=data.token;
                }
            })
            .error(function (data, status, headers, config) {
                if (data){
                    $scope.httpData=data;
                    $scope.httpDataString=JSON.stringify($scope.httpData);
                    throw new Error(data.message + " " + status);
                }
            });
    };




});
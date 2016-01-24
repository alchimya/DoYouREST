/**
 * Created by domenicovacchiano on 14/05/14.
 */


app.config(function($routeProvider) {
    $routeProvider.when('/',{
            controller: 'MainController',
            templateUrl: 'views/main.html'
        })
        .otherwise({
            templateUrl: 'views/not_found.html'
        });

});

/**
 * Created by pery on 06/06/2015.
 */

angular.module('Authenticate',[])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function (Authenticate,$q) {
        var regCheck = /(^\/\/\/)|(^\/\/localhost:8081\/)/;
        return {
            'request': function(config) {
                if(config.url.match(regCheck)){
                    return Authenticate.then(function (auth) {
                        if(!auth.authResponse){
                            console.error('request for data before authentication');
                            return $q.reject('request for data before authentication');
                        }
                        config.headers.Authentication = auth.authResponse.userID;
                        config.headers.FBToken = auth.authResponse.accessToken;
                        return config;
                    });
                }
                return config;

            }
        };
    });
})
.service('Authenticate',function authenticate($rootScope, Facebook) {
    return Facebook.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            $rootScope.loggedIn = true;
        } else {
            $rootScope.loggedIn = false;
        }
    });
})
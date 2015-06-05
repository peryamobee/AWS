/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',[
    'Logs'
    ,'facebook'
    ,'ui.router'
    ,'ui.router.stateHelper'
    ,'root.js'
    ,'customFacebook'
])
    .config(function(FacebookProvider) {
        FacebookProvider.init('362389493857685');
    })
    .config(function (stateHelperProvider,$urlRouterProvider, $stateProvider,$locationProvider ) {
            $locationProvider.html5Mode(true);
    })
    .config(function ($httpProvider) {
        var server = '//localhost:8081/';
        //var server = 'http://54.186.42.197:8081/';
        $httpProvider.interceptors.push(function (Authenticate,$q) {
            var regCheck = /^\/\/\//;
            return {
                'request': function(config) {
                    if(config.url.match(regCheck)){
                        config.url = config.url.replace(regCheck,server);
                        return Authenticate.then(function (auth) {
                            if(!auth.authResponse){
                                console.error('requst for data before authentication');
                                return $q.reject();
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
    .run(function ($rootScope) {
        $rootScope.$on("$stateChangeError", console.log.bind(console));
    });


;



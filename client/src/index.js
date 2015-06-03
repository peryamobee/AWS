/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',[
    'Logs'
    ,'facebook'
    ,'ui.router'
    ,'ui.router.stateHelper'
    ,'root.js'
])
    .config(function(FacebookProvider) {
        FacebookProvider.init('362389493857685');
    })
    .config(function (stateHelperProvider,$urlRouterProvider, $stateProvider,$locationProvider ) {
            $locationProvider.html5Mode(true);
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('theRightServer');
    })
    .factory('theRightServer',function () {
        var server = '//localhost:8081/';
        //var server = 'http://54.186.42.197:8081/';

        return {
            'request': function(config) {
                config.url = config.url.replace(/^\/\/\//,server);
                return config;
            }
        };
    })
    .service('authenticate',function authenticate($rootScope, Facebook) {
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



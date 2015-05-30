/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',[
    'Logs'
    ,'facebook'
    ,'ui.router'
    ,'ui.router.stateHelper'
    ,'appConfig'
])
    .config(function(FacebookProvider) {
        FacebookProvider.init('362389493857685');
    })
    .config(function (stateHelperProvider,$urlRouterProvider, $stateProvider ) {
            stateHelperProvider
                .state({
                    name:'root',
                    //url:'^',
                    template:'<ui-view name="top"></ui-view> <ui-view name="main" ></ui-view>',
                    controller:'mainController',
                    children:[{
                        name:'border',
                        url:'^',
                        views:{
                            'top':{
                              templateUrl:'page/main/topbar.html'
                            },
                            'main': {
                                templateUrl:'page/main/main.html'
                            }
                        }
                    }]
                })

    })
    //.constant('configuration',{})
    //.run(function($rootScope, $state, $http, configuration){
    //
    //    $rootScope.$on('$stateChangeStart'
    //        ,function(event, toState, toParams, fromState, fromParams){
    //            var realDomain ='http://54.186.42.197:8080/';
    //            var localDomain = 'localhost:8080';
    //            if( $state.include('debug')){
    //                configuration.serverDomain = realDomain;
    //            }else{
    //                configuration.serverDomain = localDomain;
    //            }
    //            //event.preventDefault();
    //            // transitionTo() promise will be rejected with
    //            // a 'transition prevented' error
    //
    //        });
    //})
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('theRightServer');
    })
    .factory('theRightServer',function () {
        return {
            'request': function(config) {
                config.url = config.url.replace(/^\/\/\//,'//localhost:8080/');
                return config;
            },

            // optional method
            'requestError': function(rejection) {
                // do something on error
                return rejection;
            },

            // optional method
            'response': function(response) {
                // do something on success
                return response;
            },

            // optional method
            'responseError': function(rejection) {

                return rejection;
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
    .controller('mainController',function($scope,$rootScope,Log,$parse,Facebook, authenticate, $injector){
        var daysBack = 30;
        authenticate.then(function () {
            $scope.login = function() {
                // From now on you can use the Facebook service just as Facebook api says
                Facebook.login(function(response) {
                    console.log(response);
                    $state.go('root.main');
                });
            };

            Facebook.api('/me', function(user) {
                $rootScope.user = user;
                console.log(user);
                Log.updataList(daysBack,user.id);
            });

            $scope.Log =  Log;

            $scope.addLog = function(){
                Log.addLog($scope.model.log);
                $scope.model.log = '';
            };
        });
    })


;



/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',[
    'Logs'
    ,'facebook'
    ,'ui.router'
    ,'ui.router.stateHelper'
])
    .config(function(FacebookProvider) {
        FacebookProvider.init('362389493857685');
    })
    .config(function (stateHelperProvider,$urlRouterProvider, $stateProvider,$locationProvider ) {
            $locationProvider.html5Mode(true);
            stateHelperProvider
                .state({
                    name:'root',
                    url:'/',
                    template:'<ui-view name="top"></ui-view> <ui-view name="main" ></ui-view>',
                    controller:'mainController',
                    abstract:true,
                    children:[{
                        name:'main',
                        url:'',
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
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('theRightServer');
    })
    .factory('theRightServer',function () {
        var server = '//localhost:8080/';
        //var server = 'http://54.186.42.197:8080/';

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



/**
 * Created by pery on 31/05/2015.
 */
angular.module('root.js',['mainPage.js'])
    .config(function (stateHelperProvider,$urlRouterProvider, $stateProvider,$locationProvider ) {
        stateHelperProvider
            .state({
                name:'root',
                url:'/',
                template:'<ui-view name="top"></ui-view> <ui-view name="main" ></ui-view>',
                controller:'mainController',
                abstract:true,
                children:[
                    angular.module('mainPage.js').page
                ]
            })
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
    });


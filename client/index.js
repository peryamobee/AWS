/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',[
    'Logs'
    ,'facebook'
])
    .config(function(FacebookProvider) {
        FacebookProvider.init('362389493857685');
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
    .controller('mainController',function($scope,$rootScope,Log,$parse,Facebook, authenticate){
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



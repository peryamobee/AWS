/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',['Logs','facebook'])
    .config(function(FacebookProvider) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
        FacebookProvider.init('362389493857685');
    })
    .controller('mainController',function($scope,Log,$timeout,$parse,Facebook){
        $scope.login = function() {
            // From now on you can use the Facebook service just as Facebook api says
            Facebook.login(function(response) {
                console.log(response);
                // Do something with response.
            });
        };
        var daysBack = 30;


        $scope.$on('Facebook:statusChange', function(ev, data) {
            console.log('Status: ', data);
            if (data.status == 'connected') {
                $scope.loggedIn = true;
                Facebook.api('/me', function(user) {
                    $scope.user = user;
                    console.log(user);
                    Log.updataList(daysBack,user.id);
                });
            } else {
                $scope.loggedIn = false;
            }
        });

        $scope.Log =  Log;
        $scope.$parse = $parse;


        $scope.addLog = function(){
            Log.addLog($scope.model.log);
            $scope.model.log = '';
        };

        $scope.moment = moment;

    });

/**
 * Created by pery on 15/05/2015.
 */
angular.module('mainPage',[ 'ui.router', 'ui.router.stateHelper' ])
    .constant('mainPageOutline',{
        name: 'login',
        templateUrl:'src/page/login/loginPage.html',
        url:"/",
        controller: 'loginController'
        //restrict: authenticatedOnly,
    })
    .controller('mainController',function($scope,Facebook,$state){

        $scope.login = function() {
            // From now on you can use the Facebook service just as Facebook api says
            Facebook.login(function(response) {
                console.log(response);
                $state.go('root.main');
            });
        };


    });



;

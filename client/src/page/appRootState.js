/**
 * Created by pery on 31/05/2015.
 */
angular.module('appRootState',[])
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
    .controller('mainController',function($scope,$rootScope,Log,$parse,Facebook, Authenticate, $injector){
        $scope.login = function() {
            // From now on you can use the Facebook service just as Facebook api says
            Facebook.login(function(response) {
                console.log(response);
                $state.go('root.main');
            });
        };
    });


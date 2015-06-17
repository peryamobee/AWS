/**
 * Created by pery on 31/05/2015.
 */
angular.module('appRootState',[
    'main.page.js',
    'dictionary.page.js'
])
    .config(function (stateHelperProvider,$urlRouterProvider, $stateProvider,$locationProvider ) {
        stateHelperProvider
            .state({
                name:'root',
                url:'',
                templateUrl:'page/frame/frame.html',
                controller:'mainController',
                abstract:true,
                children:[
                    angular.module('main.page.js').page,
                    angular.module('dictionary.page.js').page
                ]
            })
    })
    .controller('mainController',function($scope,$rootScope,Log,$parse,Facebook ){
        $scope.login = function() {
            // From now on you can use the Facebook service just as Facebook api says
            Facebook.login(function(response) {
                console.log(response);
                $state.go('root.main');
            });
        };
    });


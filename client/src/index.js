/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',[
    'Logs'
    ,'facebook'
    ,'mainPage'
    ,'ui.router'
    ,'ui.router.stateHelper'
])
    .config(function(FacebookProvider) {
        FacebookProvider.init('362389493857685');
    })
    .config(function (stateHelperProvider, mainPageOutline) {
        //$urlRouterProvider.rule(function ($injector, $location) {
        //});
        stateHelperProvider
            .state({
                name: 'root',
                template:'<ui-view></ui-view>',
                controller:'rootController',
                url:"^",
                resolve: { authenticate: authenticate }
                ,children: [mainPageOutline]

            })
    })
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope, $state) {
    })
    .controller('rootController', function ($scope) {

    })
;
function authenticate($q, $rootScope, Facebook, $state, $timeout) {
    return Facebook.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            $rootScope.loggedIn = true;
        } else {
            $rootScope.loggedIn = false;
            $state.go('root.login')
        }
    });
}


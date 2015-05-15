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
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
        FacebookProvider.init('362389493857685');
    })
    .config(function (stateHelperProvider, mainPageOutline) {
        stateHelperProvider
            .state({
                name: 'root',
                template:'<ui-view></ui-view>',
                controller:'rootController',
                url:"^"
                //,restrict: authenticatedOnly
                ,children: [mainPageOutline]
            })
    }).run(function ($rootScope,$state) {
        $rootScope.$on('$stateNotFound ',
            function(event,unfoundStatem, toState, toParams, fromState, fromParams){
                console.log(unfoundState.to);
                console.log(unfoundState.toParams);
                console.log(unfoundState.options);
                event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
            });
        $state.go('root.main');
    })
    .controller('rootController', function ($scope) {

    })
;
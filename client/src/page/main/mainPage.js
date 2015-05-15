/**
 * Created by pery on 15/05/2015.
 */

angular.module('mainPage',[
    'ui.router',
    'ui.router.stateHelper'
])
.constant('mainPageOutline',{
    name: 'main',
    templateUrl:'src/page/main/mainPage.html',
    url:"/",
    controller: 'mainController'
    //restrict: authenticatedOnly,
})
.controller('mainController',function($scope,$rootScope,Log,$parse,Facebook){
   var daysBack = 30;

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

})



;

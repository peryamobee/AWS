/**
 * Created by pery on 31/05/2015.
 */
angular.extend(angular.module('mainPage.js',[]),{
    page: {
        name:'main',
        url:'',
        views:{
            'top':{
                templateUrl:'page/main/topbar.html',
                controller:function($scope, $rootScope, Facebook){
                    Facebook.api('/me', function(user) {
                        $rootScope.user = user;
                        console.log(user);
                    });
                }
            },
            'main': {
                templateUrl:'page/main/main.html',
                controller:function($scope, Log, Facebook ){
                    $scope.Log =  Log;

                    $scope.addLog = function(){
                        Log.addLog($scope.model.log);
                        $scope.model.log = '';
                    };



                    var daysBack = 30;
                    Log.updataList(daysBack);


                }
            }
        }
    }
});
/**
 * Created by pery on 31/05/2015.
 */
angular.extend(angular.module('mainPage.js',['facebook']),{
    page: {
        name:'main',
        url:'',
        views:{
            'top':{
                templateUrl:'page/main/topbar.html',
                controller:function($scope, $rootScope, User){
                    $rootScope.user = User;
                }
            },
            'main': {
                templateUrl:'page/main/content.html',
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
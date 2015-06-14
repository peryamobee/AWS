/**
 * Created by pery on 31/05/2015.
 */
angular.extend(angular.module('main.page.js',['facebook']),{
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
                templateUrl:'page/main/dashboard.html',
                controller:function($scope, Log, Facebook ){
                    $scope.Log =  Log;

                    $scope.addLog = function(){
                        Log.addLog($scope.model.log);
                        $scope.model.log = '';
                    };


                    $scope.streams = [{
                        name:'ארועים',
                        records:[{
                            create:moment(),
                            text: 'לתונה'
                        }]
                    }];

                    var daysBack = 30;
                    Log.updataList(daysBack);


                }
            }
        }
    }
});
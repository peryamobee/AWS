/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',['Logs'])
    .controller('mainController',function($scope,Log,$timeout,$parse){
            var daysBack = 30;
            $scope.Log =  Log;
            Log.updataList(daysBack);

            $scope.addLog = function(){
                Log.addLog($scope.model.log);
                $scope.model.log = '';
            };
    });

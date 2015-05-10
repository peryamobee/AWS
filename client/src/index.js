/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',['Logs'])
    .controller('mainController',function($scope,Log){
            var inc = 0;
            Log.getLogs(10).then(function (logs) {
                $scope.daysOfLogs = logs;
            });

            $scope.send = function(){
                Log.add($scope.model.log);
                Log.getLogs();
            }

    });

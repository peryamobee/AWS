/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',['Logs'])
    .controller('mainController',function($scope,Log){
            var inc = 0;
            Log.getLogs().then(function (logs) {
                $scope.recorsd = logs;
            });

            $scope.send = function(){
                Log.add($scope.model.log);
                Log.getLogs();
            }

    });

/**
 * Created by pery on 08/05/2015.
 */
angular.module('Main',['Logs'])
    .controller('mainController',function($scope,Log){
            var daysBack = 30;
            Log.getLogs(daysBack).then(function (logs) {
                $scope.days = logs;
            });

            $scope.addLog = function(){
                Log.addLog($scope.model.log).then(function () {
                    Log.getLogs(daysBack).then(function (logs) {
                        $scope.days = logs;
                    });
                });
            };
        setInterval(function () {
            $scope.timeNow = moment().format('HH:MM');

        },1000);
        $scope.moment = moment;

    });

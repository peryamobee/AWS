/**
 * Created by pery on 06/05/2015.
 */
var  ngApp =  angular.module('myApp', ['logs'])
    .controller('myController',myController);
function myController($scope,$timeout, Logs){

    $scope.send = function (logText) {
        Logs.send(logText)
            .then(function () {
                $scope.status = 'sucess'+ ++inc;
            });
    };
    var inc = 0;
    Logs.getLogs().then(function (data) {
        $scope.logRecords = data;
    });

    $scope.currentTime = moment().format('HH:MM');
    $timeout(function () {
        $scope.currentTime = moment().format('HH:MM');
    },1000*60)




}

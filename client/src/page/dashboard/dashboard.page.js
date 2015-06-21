/**
 * Created by pery on 31/05/2015.
 */
angular.module('dashboard.page',['facebook']).page =  {
    name:'~',
    url:'/dashboard',
    templateUrl:'page/dashboard/dashboard.html',
    controller:'dashboardController'
};

angular.module('dashboard.page')
    .controller('dashboardController', function($scope, Log, Facebook ){
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


        $scope.tags = [{
            id: 0,
            text: 'hello'
        }, {
            id: 1,
            text: 'whould'
        },{
            id:2,
            text:'world'
        }]


    });
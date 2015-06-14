/**
 * Created by pery on 14/06/2015.
 */
angular.extend(angular.module('dictionary.page.js',[]),{
    page: {
        name:'dictionary',
        url:'dictionary',
        templateUrl:'page/dictionary.page.html',
        controller:function($scope, Dictionary){
            $scope.dictionary = Dictionary;
            Dictionary.get().then(function (res) {
                $scope.words = res.data;
            })


        }
    }
});
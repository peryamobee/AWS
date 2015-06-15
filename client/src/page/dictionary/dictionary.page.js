/**
 * Created by pery on 14/06/2015.
 */
angular.extend(angular.module('dictionary.page.js',[]),{
    page: {
        name:'dictionary',
        url:'/dictionary',
        templateUrl:'page/dictionary/dictionary.page.html',
        controller:function($scope, Dictionary){
            $scope.dictionary = Dictionary;
            Dictionary.get().then(function (res) {
                $scope.words = res.data;
                $scope.words.push({})
            });

            $scope.shakeWordList = shakeWordList;
            $scope.save = save;

            function save(){
                _.remove($scope.words,function (word,i) {
                    return  (word.he == '') || (word.en == '') ;
                });

                Dictionary.save($scope.words).then(function (words) {
                    $scope.words = words;
                })
            }

            function shakeWordList(){
                _.remove($scope.words,function (word,i) {
                        return _.isEmpty(word);
                    });
                $scope.words.push({});



            }


        }
        //views:{
        //    main:{
        //
        //    }
        //}

    }
});
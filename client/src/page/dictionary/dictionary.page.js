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
            $scope.save = _.debounce(save,150,{trailing:true});

            function save(word,i){
                if((word.en == '') || (word.he == '')){
                  return;
                }
                Dictionary.save(word).then(function (words) {
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
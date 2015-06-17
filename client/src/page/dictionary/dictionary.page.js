/**
 * Created by pery on 14/06/2015.
 */
angular.module('dictionary.page.js',[]).page =  {
    name:'dictionary',
    url:'/dictionary',
    templateUrl:'page/dictionary/dictionary.page.html',
    controller:'dictionaryController'
};
//angular.extend(angular.module('dictionary.page.js',[]),)
angular.module('dictionary.page.js')
    .controller('dictionaryController', function($scope, Dictionary){
        $scope.dictionary = Dictionary;
        Dictionary.get().then(function (res) {
            $scope.words = res.data;
            $scope.words.push({})
        });

        $scope.shakeWordList = shakeWordList;
        $scope.save = _.debounce(save,500,{leading: false,trailing:true});

        function save(word,i){
            console.log('call to save');
            Dictionary.save(word).then(
                function (resWord) {
                    angular.copy(resWord,word);
                },
                function (resson) {
                    console.log(resson);
                })

        }

        function shakeWordList(){
            _.remove($scope.words,function (word,i) {
                return _.isEmpty(word);
            });
            $scope.words.push({});
        }


    });
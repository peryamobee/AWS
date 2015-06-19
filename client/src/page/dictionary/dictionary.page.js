/**
 * Created by pery on 14/06/2015.
 */
angular.module('dictionary.page',[]).page =  {
    name:'dictionary',
    url:'/dictionary',
    templateUrl:'page/dictionary/dictionary.page.html',
    controller:'dictionaryController'
};

//angular.extend(angular.module('dictionary.page.js',[]),)
angular.module('dictionary.page')
    .controller('dictionaryController', function($scope, Dictionary){
        $scope.dictionary = Dictionary;
        $scope.shakeWordList = shakeWordList;
        $scope.save = _.debounce(save,700,{leading: false,trailing:true});
        $scope.remove = remove;
        var words = $scope.words = Dictionary.list;

        Dictionary.get().then(function (res) {
            words.push({})
        });


        function save(word,index){
            Dictionary.save(word).then(
                function () {
                    $scope.dictionaryForm['en' + index].$setPristine();
                    $scope.dictionaryForm['he' + index].$setPristine();
                },
                function (resson) {
                    console.log(resson);
                })

        }

        function remove(word){
            Dictionary.remove(word)
        }

        function shakeWordList(){
            //_.remove($scope.words,_.isEmpty);
            if(!_.isEmpty(words.slice(-1)[0])){
                words.push({});
            }

        }


    });
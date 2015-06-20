 /**
 * Created by pery on 14/06/2015.
 */
angular.module('dictionary',[])
.service('Dictionary', function ($http, $q,$resource) {

        /*is a lack of validation on saving and not delete resource form list on $remove*/
    //var Dictionary = $resource('///dictionary/:id',{id:'@_id'},{
    //    get:{method:'GET',isArray:true },
    //    add:{method:'PUT'},
    //    save:{method:'PUT',interceptor:{request:validation1} },
    //    remove:{method:'DELETE'}
    //});

var list   = [];
    /*API*/
    return {
        get:get,
        save:save,
        remove:remove,
        list :list
    };



    function get(){
        return $http.get('///dictionary',{
            params:{
                size:100,
                words:[],
                lang:'en'
            }
        }).then(function (res) {
            angular.copy(res.data,list);
            return list;
        })
    }



    function save(word){
        _.defaults(word,{en:'',he:''});
        if(validation(word)){
            return $http.put('///dictionary',word).then(function (res) {
                angular.copy(res.data,word);
                return res.data;
            })
        }else{
            return  $q.reject('word not valid');
        }

    }

    function remove(word){
        if(word._id){
            return $http.delete('///dictionary/'+word._id).then(function (res) {
                _.remove(list,word);

            })
        }else{
            _.remove(list,word);
            $q.resolve();
        }

    }

    function validation(word){
        return !(_.isEmpty(word) || _.some(word, _.isEmpty));
    }
})
;
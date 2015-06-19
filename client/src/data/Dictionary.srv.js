/**
 * Created by pery on 14/06/2015.
 */
angular.module('dictionary',[])
.service('Dictionary', function ($http, $q) {
    /*API*/
    return {
        get:get,
        add:add,
        save:save,
        remove:remove
    };

    function get(){
        return $http.get('///dictionary',{
            params:{
                size:100,
                words:[],
                lang:'en'
            }
        })
    }
    function add(word){
        return $http.put('///dictionary',word)
    }

    function save(word){
        _.defaults(word,{en:'',he:''});
        if(validation(word)){
            return $http.put('///dictionary',word).then(function (res) {
                return res.data;

            })
        }else{
            return  $q.reject('word not valid');
        }

    }

    function remove(word){
        if(word._id){
            return $http.delete('///dictionary/'+word._id)
        }else{
            $q.resolve();
        }

    }

    function validation(word){
        return !(_.isEmpty(word) || _.some(word, _.isEmpty));
    }
})
;
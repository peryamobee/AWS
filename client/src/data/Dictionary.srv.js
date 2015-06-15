/**
 * Created by pery on 14/06/2015.
 */
angular.module('dictionary',[])
.service('Dictionary', function ($http) {
    /*API*/
    return {
        get:get,
        add:add,
        save:save
    };

    function get(){
        return $http.get('///dictionary',{
            params:{
                size:100,
                words:['card','event'],
                lang:'en'
            }
        })
    }
    function add(word){
        return $http.put('///dictionary',word)
    }

    function save(words){
        return $http.post('///dictionary',words)
    }
})
;
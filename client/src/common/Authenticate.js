/**
 * Created by pery on 06/06/2015.
 */

angular.module('Authenticate',[])
.service('Authenticate',function authenticate($rootScope, Facebook) {
    return Facebook.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            $rootScope.loggedIn = true;
        } else {
            $rootScope.loggedIn = false;
        }
    });
})
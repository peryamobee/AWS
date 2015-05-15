/**
 * Created by pery on 15/05/2015.
 */
angular.module('User',[])
    .service('user', function (Facebook) {
        var me = this;
        me.promise = Facebook.api('/me', function(user) {
            angular.extend(this,user);
        });

    });

/**
 * Created by pery on 15/05/2015.
 */
angular.module('User',[])
    .service('User', function (Facebook) {
        var me = this;
        me.promise = Facebook.userApi('/me')
            .then(function(user) {

                angular.extend(me, user);
                me.lang ='he';
            }, function (e) {
                console.error(e);
            });

    });

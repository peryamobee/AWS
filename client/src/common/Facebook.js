/**
 * Created by pery on 06/06/2015.
 */
angular.module('customFacebook',[])
    .config(function ($provide) {
        $provide.decorator('Facebook', function ($delegate,$q) {
            var api = $delegate.api;

            $delegate.userApi = function () {
                var arg = [].slice.apply(arguments);
                arg.push(angular.noop);
                return $delegate.getLoginStatus(angular.noop)
                    .then(function (auth) {
                        return api.apply($delegate,arg);
                    })
                ;
            };

            return $delegate;
        });
    })

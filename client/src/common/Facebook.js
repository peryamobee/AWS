/**
 * Created by pery on 06/06/2015.
 */
angular.module('customFacebook',['Main'])
    .config(function ($provider) {
        $provider.decorator('Facebook', function ($delegate,$q,Authenticate) {
            var api = $delegate.api;

            $delegate.api = function () {
                var arg = arguments;
                return Authenticate
                    .then(function () {
                        api.apply($delegate,arg);
                    })
            };

            return $delegate;
        });
    })

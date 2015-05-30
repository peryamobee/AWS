/**
 * Created by pery on 29/05/2015.
 */
var appConfig = angular.module('appConfig',[])
    .config(function () {

        ///* @if NODE_ENV!='production' */
        //appConfig.constant('configuration',{
        //    server:'localhost:3000'
        //
        //});
        ///* @endif */

        /* @if NODE_ENV='production' */
        appConfig.constant('configuration',{
            server:'localhost:3000'

        });
        /* @endif */

    })


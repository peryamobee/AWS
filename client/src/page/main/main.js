/**
 * Created by pery on 31/05/2015.
 */
angular.extend(angular.module('mainPage.js',[]),{
    page: {
        name:'main',
        url:'',
        views:{
            'top':{
                templateUrl:'page/main/topbar.html'
            },
            'main': {
                templateUrl:'page/main/main.html'
            }
        }
    }
});
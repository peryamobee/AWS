/**
 * Created by pery on 06/05/2015.
 */
angular.module('logs',[])
    .service('Logs', function ($http) {

        /*API*/
        this.send = send;
        this.getLogs = getLogs;

//--------- implements ---------------

        function send(logText){
            return $http.post('/log',{
                log:logText
            })
        }

        function getLogs(){
            return $http.get('/log').then(function (res) {
                var data = res.data;
                data.forEach(function (log) {
                    log.create = moment(log.create).format('HH:MM');
                });
                return data;

            })
        }

    });
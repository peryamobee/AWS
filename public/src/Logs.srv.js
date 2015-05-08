/**
 * Created by pery on 08/05/2015.
 */
angular.module('Logs',[])
    .service('Log', function ($http) {

        this.getLogs = getLogs;
        this.add = getLogs;

        function addLog(logText){
            return $http.post('/log',{
                log:logText
            }).then(function (res) {
               return res.data
            })
        }

        function getLogs(){
            return $http.get('/log').then(function (res) {
              res.data.forEach(function (day) {
                  day.records.forEach(function (record) {
                      record.create = moment(record.create).format('HH:MM');
                  })
              });
            return res.data;


            })
        }
    });

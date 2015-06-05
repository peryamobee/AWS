/**
 * Created by pery on 08/05/2015.
 */
angular.module('Logs',[])
    .service('Log', function ($http) {

        var _list = [];
        var _groupedList = [];

        /** API **/
        this.updataList = updataList;
        this.addLog = addLog;

        Object.defineProperties(this,{
            list:{
                get:function(){
                    return _list;
                }
            },
            groupedList:{
                get: function () {
                    return _groupedList;
                }
            }
        });



        function addLog(logText){
            return $http.post('///log',{
                text:logText
            })
            .then(function (res) {
                return _list.push(res.data),  _list;
            })
            .then(regrouped)
            .then(addGroupOfThatDay)
        }

        function updataList(lastDays){
            return $http
                .get('///log',{
                    params:{
                        lastDays:lastDays
                    }
                })
                .then(function (res) {
                    return angular.copy(res.data || [], _list ) ;
                })
                .then(regrouped)
                .then(addGroupOfThatDay)
        }




        function regrouped(list){
            _.forEach(list,function (record) {
                var time = moment(record.create);
                record.year = time.get('year');
                record.day = time.get('day');
                record.month = time.get('month');
                record.moment = time;
            });
            return _groupedList = _(list)
                .groupBy('year')
                .mapValues(function (year) {
                    return _.groupBy(year, function (record) {
                        return dayStamp(record.moment);
                    })
                }).value()
        }

        function addGroupOfThatDay(grouped){
            var now = moment(),
                g = grouped,
                yearText = now.get('year'),
                dayText = dayStamp(now)
                ;
            g[yearText] = g[yearText] || {};
            g[yearText][dayText] = g[yearText][dayText] || [];
            return grouped;
        }

        function dayStamp(m){
            return [m.get('day'),'/',m.get('month')].join('');
        }

    });

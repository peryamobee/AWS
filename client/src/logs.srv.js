/**
 * Created by pery on 08/05/2015.
 */
angular.module('Logs',[])
    .service('Log', function ($http) {

        this.updataList = updataList;
        this.addLog = addLog;

        Object.defineProperties(this,{
            list:{
                get:function(){
                    return _list;
                }
            }
        });

        var _list = [];

        function addLog(logText){
            return $http.post('/log',{
                text:logText
            }).then(function (res) {
                _list.slice(-1)[0].records.push(res.data);
                return res.data
            })
        }

        function updataList(lastDays){
            return $http.get('/log',{
                params:{
                    lastDays:lastDays
                }
            }).then(function (res) {
                angular.copy(res.data,_list) ;
                var lastDay = _list.slice(-1)[0];
                var d = lastDay._id;
                if(!moment().isSame(d.date,'day')){
                    addThisDay();
                }
                //return _list;


            })
        }
        function addThisDay(){
            var now = moment();
            _.list.push({
                _id:{
                    day: now.format('DD'),
                    month:now.format('MM'),
                    year: now.format('yyyy')
                },
                records:[]
            })
        }


    });

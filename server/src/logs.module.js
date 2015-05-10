/**
 * Created by pery on 08/05/2015.
 */
var logCollection = null;
var route = null;
var moment = require('moment');
module.exports = function init (db, app ){
    logCollection = db.collection('logs',function(err){
        if(err) throw err;
        console.log("logs collection arrive");
    });

    route = app;

    //routes
    app.get('/log', function(req, res ){
        getLogs(req.param.lastsDays,function(recoreds){
            res.send(recoreds)
        })
    });
    app.post('/log', function (req, res) {
        createLog(req.body);
        res.send('log inserted');
    });



    function createLog(text){
        var log = {text:text,log:text, create: new Date()};
        logCollection.insert(log);
    }

    function getLogs(lastDaysAmount, callback) {
        //callback(items)
        var fromDay = moment().subtract(lastDaysAmount||1,'day').startOf('day').toDate();

        logCollection.aggregate([{
            $match:{create:{$gt: fromDay }}
        },{
            $group:{
                _id: {month:{$month:'$create'},day: { $dayOfMonth: "$create" }, year: { $year: "$create" }},
                records:{$push:"$$ROOT"}
            }
        }], function (err, result) {
            if(err){throw err;}
            callback(result);
        })
    }

};




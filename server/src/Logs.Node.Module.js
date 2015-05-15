/**
 * Created by pery on 08/05/2015.
 */
var logCollection = null;
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

module.exports = function init ( db ){

    logCollection = db.collection('logs',function(err){
        if(err) throw err;
        console.log("logs collection arrive");
    });

    this.saveLog = function saveLog(req, res){
        var logDocument = req.body;
        logDocument.create =  new Date(Date.now());
        logCollection.save(logDocument,{w:1}, function (err, record) {
            res.send(record.ops[0]);
        });
    };

    this.getLogs = function getLogs(req, res) {
        var fromDay = moment()
                .subtract(req.query.lastDays||1,'day')
                .startOf('day').toDate();
        var userId = req.params.id;
        logCollection.aggregate([
           {
            $match:{
                create:{
                    $gt: fromDay
                },
                userId:userId*1
            }
        },{
            $group:{
                _id: {
                    month:{$month:'$create'},
                    day: { $dayOfMonth: "$create" },
                    year: { $year: "$create" },
                    date:{ $dateToString: { format: "%Y-%m-%d", date: "$create" }}
                },
                records:{
                    $push:"$$ROOT"
                }

            }
        },{
            $sort:{
                '_id.month':1,
                '_id.day':1,
                '_id.year':1
            }
        }], function (err, result) {
            if(err){throw err;}
            res.send(result);
        })
    }

};




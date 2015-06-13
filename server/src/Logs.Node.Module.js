/**
 * Created by pery on 08/05/2015.
 */
var logCollection = null;
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

module.exports = function init ( db, router ){

    /** init **/
    logCollection = db.collection('logs',function(err){
        if(err) throw err;
        console.log("logs collection arrive");
    });

    router.get('/log', function (req, res) {
        getLogs({
            fromDay:moment().subtract(req.query.lastDays || 1,'day').startOf('day').toDate(),
            userId:req.headers.authentication
        }, function (err, result) {
            if(err){throw err;}
            res.send(result);
        })
    });

    router.get('/log/:hashTag', function (req, res) {
        getLogs({
            fromDay:moment().subtract(req.query.lastDays || 1,'day').startOf('day').toDate(),
            userId:req.headers.authentication,
            hashTag:req.params.hashTag
        }, function (err, result) {
            if(err){throw err;}
            res.send(result);
        })
    });
    router.post('/log', saveLog);

    /** API **/
    function saveLog(req, res){
        var logDocument = req.body;
        logDocument.create =  new Date(Date.now());
        //logDocument.text
        //logDocument.hashTags
        logDocument.userId = req.headers.authentication;
        logCollection.save(logDocument,{w:1}, function (err, record) {
            res.send(record.ops[0]);
        });
    }


    function getLogs(config, cb) {
        var pipe = [],
            match = {$match:{
                create:{
                    $gt: config.fromDay
                },
                userId:config.userId,
                tags:{$in:config.hashTag.split('/')}
            }},
            grouped = {$group:{
                _id: {
                    month:{$month:'$create'},
                    day: { $dayOfMonth: "$create" },
                    year: { $year: "$create" },
                    date:{ $dateToString: { format: "%Y-%m-%d", date: "$create" }}
                },
                records:{
                    $push:"$$ROOT"
                }
            }},
            sort = {$sort:{
                'create':1
            }}
        ;

        pipe.push(match);
        //pipe.push(grouped);
        pipe.push(sort);

        logCollection.aggregate(pipe, cb)
    }


};




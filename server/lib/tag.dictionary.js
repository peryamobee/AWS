/**
 * Created by pery on 13/06/2015.
 */
var collection = null;
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');

module.exports = function init(db, router) {

    /** init **/
    var collection = db.collection('tagDictionary',function(err){
        if(err) throw err;
        console.log("dictionary collection arrive");
    });

    /**
     * the layout of the documnt in tag.dictionary is
     * {
     *  en:'word',
     *  he:'word',
     *  fr:'word',
     *  }
     **/

    router.get('/dictionary', function (req, res) {
        var words = req.query.words,
            lang = req.query.lang,
            size = req.query.size,
            pipe = []
        ;
        if(!_.isEmpty(words) ){
            var match = {} ;
            match[lang] = {$in: _.isArray(words)? words:[words]};
            pipe.push({$match: match});
        }


        collection.aggregate(pipe, function (err, result) {
            if(err){throw err;}
            res.send(result);
        })
    });

    router.post('/dictionary', function (req, res) {
        var wordTranslation = req.body;
        wordTranslation._id = wordTranslation.en;
        collection.save(wordTranslation,{w:1}, function (err, record) {
            res.send(record.ops[0]);
        });
    });

    //todo:build a ui for add word. and remmber all tag must save in en
};
/**
 * Created by pery on 13/06/2015.
 */
var collection = null;
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

module.exports = function init(db, router) {

    /** init **/
    var collection = db.collection('tagDictionary',function(err){
        if(err) throw err;
        console.log("tag dictionary collection arrive");
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
        var foreignLanguageTags = req.query.tags,
            lang = req.query.lang
        ;
        var q = {};
        q[lang] = {$in:foreignLanguageTags};
        collection.find(q, function (err, result) {
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
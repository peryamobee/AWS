/**
 * Created by pery on 13/06/2015.
 */
var collection = null;
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');
var status = require('./HttpStatus');

module.exports = function init(db, router) {

    /** init **/
    collection = db.collection('tagDictionary',function(err){
        if(err) throw err;
        console.log("dictionary collection arrive");
    });

    /**
     * the layout of the documnt in tag.dictionary is
     * {
     *  en:'word',
     *  he:'word',
     *  fr:'word',
     *  state_driven:[]
     *  }
     **/

    module.exports.getTagsById = function(ids, cb){
      return collection.find({_id:{$in:ids}},cb)
    };


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
            if(err){ res.send(err); }
            else{ res.send(result);}
        })
    });

    router.put('/dictionary', function (req, res) {
        var word = req.body;
        word._id && (word._id = ObjectID(word._id));
        collection.save(word,{w:1}, function (err, record) {
            if(err){ res.send(err); }
            else{    res.status(status.CREATED).send(word);}
        });
    });

    router.delete('/dictionary/:id', function (req, res) {
        var id = ObjectID(req.params.id);
        //var id = req.params.id;
        collection.remove({_id:id},1, function (err, opt) {
            if(err){ res.send(err); }
            else{
                if(opt.result.n == 1)
                    res.send();
                else

                    res.status(status.NOT_FOUND).send('not find word to delete with id '+ req.params.id )

            }
        })
    });

    //todo:build a ui for add word. and remmber all tag must save in en
};
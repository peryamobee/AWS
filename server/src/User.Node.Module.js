/**
 * Created by pery on 15/05/2015.
 */
var userCollection = null;
var ObjectID = require('mongodb').ObjectID;

module.exports = function init ( db ){

    userCollection = db.collection('user', function (err) {
        if(err) throw err;
        console.log('user collection arrive');
    });
    /* API */
    return {
        user:user,
        addHashTag:addHashTag
    };

    /*---------------------------------*/
    function user(req, res){
        var userObject = req.body;
        userObject._id = ObjectID.createFromHexString(userObject.id);
        userObject.create =  new Date(Date.now());
        userObject.hashTags = [];
        userCollection.save(userObject,{w:1}, function (err, userRecord) {
            res.send(userRecord.ops[0]);
        });
    }

    function getHashTag (req,res){

    }

    function addHashTag(req,res){
        var hashTags = req.body;
        var userId = ObjectID.createFromHexString(req.headers.auth);
        userCollection.update(
            {_id:userId}
            ,{ $addToSet:{ hashTags:{$each:hashTags}}}
            ,{w:1}
            , function (err, userRecord) {
                res.send(userRecord.ops[0]);
            });
    }
};

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

    this.user = function addUser(req, res){
        var userObject = req.body;
        userObject._id = ObjectID.createFromHexString(userObject.id);
        userObject.create =  new Date(Date.now());
        userCollection.save(userObject,{w:1}, function (err, userRecord) {
            res.send(userRecord.ops[0]);
        });
    }
};

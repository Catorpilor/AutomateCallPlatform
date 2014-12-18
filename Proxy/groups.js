var eventproxy = require('eventproxy');
var _ = require('lodash');

exports.getGroupsByQuery = function (connection,query,opt,callback) {
  connection.query(query,opt,function(err,results){
    if(err) callback(err);
    if(results.length == 0 ) callback(null,[]);
    console.log(results);
    // var ep = new eventproxy();
    // ep.after('details_done',results.length,function(groups) {
    //   console.log(groups);
    // });
    // var groups_id = _.pkuck(results,'PK_GROUP');
    // ep.fail(callback);
    // groups_id.forEach(function(PK_GROUP,i) {
    //   exports.getGroupDetailsByGroupID(connection,PK_GROUP,ep.group('details_done',function(phones){
    //     console.log(phones);

    //   }));

    // })
    callback(null, results);
  });
};

exports.getGroupDetailsByGroupID = function( connection, groupid, callback) {
  var query = "select ?? from ?? where ?? = ?";
  var opt = ['PK_PHONENUM','call_numgroup','PK_GROUP',groupid];
  connection.query(query,opt,function(err,results) {
    if(err) callback(err);
    console.log(results);
    callback(null,results);
  });
};

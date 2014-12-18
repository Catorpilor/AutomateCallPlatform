//var _ = require("lodash");

exports.getPhonesByQuery = function (connection,query,opt,callback) {
  connection.query(query,opt,function(err,results){
    if(err) callback(err);
    if(results.length == 0 ) callback(null,[]);
    console.log(results);
    callback(null, results);
  });
};




//exports.addPhonesByQuery = function (connection,query,opt,callback) {
//
//}

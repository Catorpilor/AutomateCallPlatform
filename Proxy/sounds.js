exports.getSoundsByQuery = function (connection,query,opt,callback) {
  var sqlquery = connection.query(query,opt,function(err,results){
    if(err) callback(err);
    if(results.length == 0 ) callback(null,[]);
    console.log(results);
    callback(null, results);
  });
  console.log(sqlquery.sql);
};

var path = require("path");

var config = {
  debug: true,
  
  port : 3030, //self configuration
  
  session_db: 'mongodb://127.0.0.1:27017/CallPlatFromSession',
  session_db_name : 'CallPlatFormSession',
  session_secret : '076ee61d63aa10a125ea872411e433b9', // 务必修改
  auth_cookie_name : 'callfrom_session',
  
  //mysql configuration
  mysql_option : {
    host : '127.0.0.1',
    user : 'lcpmgr',
    password : 'lcpmgr01',
    port : 3306, //port mysql
    database : 'db_out',
    insecureAuth: true
  }
};

module.exports = config;

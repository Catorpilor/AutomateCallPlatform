var express = require('express'),
  app     = express(),
  path = require('path');

var cors = require("cors");
var bodyparser = require("body-parser");
var session = require('express-session');
var cons = require("consolidate");
var MongoStore = require('connect-mongo')(session);
var mysql = require("mysql");
var myConnection = require("express-myconnection");
var errorhandler = require('error-handler');
var webRoute = require("./web_router");
var apiRouteV1 = require('./api_v1_router');
var config = require("../config.default");

app.engine("html",cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/../Views');
app.use(session({
  secret: config.session_secret,
  store: new MongoStore({
    url: config.session_db
  }),
  resave: true,
  saveUninitialized: true,
}));
//app.use(express.static(path.join(__dirname,"/../public")))
app.use(require("method-override")());
app.use(require('cookie-parser')(config.session_secret));
app.use('/js',express.static(path.join(__dirname, "/../public/js")));
app.use('/css',express.static(path.join(__dirname,"/../public/css")));
app.use('/bower_components',express.static(path.join(__dirname,"/../public/bower_components")));
app.use('/font-awesome',express.static(path.join(__dirname,"/../public/font-awesome")));
app.use('/fonts',express.static(path.join(__dirname,"/../public/fonts")));
app.use(myConnection(mysql,config.mysql_option,'single'));
//app.use(cors());


app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());
app.use('/',webRoute);
app.use('/api/v1',cors(),apiRouteV1);

//error handler
//if (config.debug) {
//  app.use(errorhandler());
//} else {
//  app.use(function (err, req, res, next) {
//    return res.status(500).send('500 status');
//  });
//}
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//
//app.get('/',routes.showLogin);
//app.post('/login',routes.checkLogin);
//app.get('/admin/?*',adminRoute);
//app.get('/logout',routes.logout);
//app.get('/user/:username',userRoutes.index);
//app.get('/user/:username/phonenos',userRoutes.phoneManager);
//app.get('/user/:username/groups',userRoutes.groupManager);
//app.get('/user/:username/tasks',userRoutes.tasksManager);
//app.get('/user/:username/strategy',userRoutes.strategyManager);


app.listen(config.port,function () {
  console.log("Server running ....");
});

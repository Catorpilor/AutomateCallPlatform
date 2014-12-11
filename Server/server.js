var express = require('express'),
    app     = express()
    path = require('path');

var cors = require("cors");
var bodyparser = require("body-parser");
var cons = require("consolidate");
var adminRoute = require("../controller/admin");
var routes = require("../controller/route");
var userRoutes = require("../controller/user");

app.engine("html",cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/../Views');
app.use(express.static(path.join(__dirname,"/../public")))
//app.use('admin/js',express.static(path.join(__dirname, "/../public/js")));
//app.use('admin/css',express.static(path.join(__dirname,"/../public/css")));
//app.use('admin/font-awesome',express.static(path.join(__dirname,"/../public/font-awesome")));
app.use(cors());


app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());


app.get('/',routes.login);
app.post('/login',routes.checkLogin);
app.get('/admin/?*',adminRoute);
app.get('/logout',routes.logout);
app.get('/user/:username',userRoutes.index);
app.get('/user/:username/phonenos',userRoutes.phoneManager);
app.get('/user/:username/groups',userRoutes.groupManager);
app.get('/user/:username/tasks',userRoutes.tasksManager);
app.get('/user/:username/strategy',userRoutes.strategyManager);


app.listen(3030);
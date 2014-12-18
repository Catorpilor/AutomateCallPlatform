var express = require("express");
var sign 		= require("../controller/sign");
var userRoutes 		= require("../controller/user");
var adminRoutes  = require("../controller/admin");

var router = express.Router();

router.get('/', sign.showLogin);
router.post('/login',sign.checkLogin);
router.get('/logout',sign.logout);


//user controller
router.get('/user/:username/partials/:name',userRoutes.partials);
router.get('/user/:username',userRoutes.index);
router.get('/user/:username/phonenos',userRoutes.phoneManager);
router.get('/user/:username/groups',userRoutes.groupManager);
router.get('/user/:username/tasks',userRoutes.tasksManager);
router.get('/user/:username/strategy',userRoutes.strategyManager);

//admin controller
router.get('/admin/?*',adminRoutes);

module.exports = router;
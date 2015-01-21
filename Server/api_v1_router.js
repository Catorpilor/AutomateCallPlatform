var express = require("express");
var apis = require("../controller/api/v1/api");

var router = express.Router();

//get phones
router.get('/phones',apis.phones);
router.post('/phones',apis.addPhone);
router.delete('/phones',apis.deletePhone);

//get groups
// router.get('/groups',apis.groups);
// router.delete('/groups',api.deleteGroup);


//get strategies
router.get('/strategy',apis.strategies);
router.post('/strategy',apis.addStrategy);
router.put('/strategy',apis.editStrategy);
router.delete('/strategy',apis.deleteStrategy);

//get tasks
//
router.get('/task',apis.getTasks);
router.get('/taskDetail',apis.getTaskDetails);
router.post('/task',apis.postTask);
router.post('/taskDetail',apis.postTaskDetail);
router.put('/taskDetail',apis.updateTaskDetail);
router.delete('/taskDetail',apis.deleteTaskDetail);


router.get('/reports',apis.getReports);
router.get('/reports_b',apis.getBasicReports);

//app interface
router.post('/register',apis.checkRegister);
router.get('/tasks',apis.getTaskLists);
router.get('/taskRecords',apis.getTaskRecords);
router.get('/taskDetail/:taskid',apis.getTaskDetail);
router.post('/addTask',apis.addTask);


module.exports = router;

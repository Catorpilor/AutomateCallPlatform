/**
 * Created by chris on 12/11/14.
 */

var eventproxy = require("eventproxy");
var PhoneManager = require("../proxy/phones");
var GroupManager = require("../proxy/groups");
var StrategyManager = require("../proxy/strategies");
var TaskManager = require("../proxy/tasks");


exports.index = function(req,res,next){
    //retrive from db the current user's phones groups strategies and tasks
    var ep = new eventproxy();
    ep.fail(next);
    ep.all('phones','groups','strategies','tasks',function (phones,groups,strategies,tasks) {
        req.session.user.phones = phones;
        req.session.user.groups = groups;
        req.session.user.strategies = strategies;
        req.session.user.tasks = tasks;
        res.render('user/index',{
            title : 'User Dashboard',
            user : req.params.username,
            phoneCount: phones.length,
            groupCount: groups.length,
            strategyCount: strategies.length,
            taskCount: tasks.length
        });
    });

    req.getConnection(function (err,connection) {
        if(err) console.log(err);
        var pk_usernum = req.session.user.pkuserid;
        var query="select ?? from ?? where PK_USERINFO = ?";
        var opt = [['PK_PHONENUM','PHONE_NUM','PK_USERINFO'], 'call_phonenum', pk_usernum ];
        PhoneManager.getPhonesByQuery(connection, query, opt, ep.done('phones'));

        //query groups by pk_userinfo
        opt = [['PK_GROUP','GROUP_NAME','GROUP_CODE'],'call_group',pk_usernum];
        GroupManager.getGroupsByQuery(connection, query, opt, ep.done('groups'));

        //query strategies by pk_userinfo
        opt=[['PK_TACTICS','TACTICS_NAME','CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY'],'call_tactics',pk_usernum];
        StrategyManager.getStrategiesByQuery(connection, query, opt, ep.done('strategies'));

        //query tasks by pk_userinfo
        opt=[['PK_TASK','TASK_CODE','TASK_NAME','TASK_STATUS'],'call_task',pk_usernum];
        TaskManager.getTasksByQuery(connection, query, opt, ep.done('tasks'));

    })

};

exports.phoneManager = function(req,res){
    //fetch the phones from database

    //here we simply simulator some datas
    var phones=[
        {
            phoneNo : 13800138000,
            group : 'Group A'
        },
        {
            phoneNo : 13800138001,
            group : 'Group A'
        },
        {
            phoneNo : 13800138002,
            group : 'Group C'
        },
        {
            phoneNo : 13800138004,
            group : 'Group A'
        }
    ];
    res.render('user/phones',{
        title : 'Phone Manager',
        user : req.params.username,
    });
//    res.render('user/phones',{
//        title : 'Phone Manager',
//        user : req.params.username,
//        phones : phones
//    });
};

exports.groupManager = function(req,res){
    //fetch the groups from database

    //simulator groups
    var groups = [
        {
            groupId : 'a1df',
            groupName : 'Group A',
            strategy : 'Strategy A',
            phones : [13800138000,13800138001,13800138002,13800138003]
        },
        {
            groupId : 'ae2f',
            groupName : 'Group B',
            strategy : 'Strategy B',
            phones : [13800138000,13800138001,13800138002,13800138003]
        },
        {
            groupId : 'af2d',
            groupName : 'Group C',
            strategy : 'Strategy C',
            phones : [13800138000,13800138001,13800138002,13800138003]
        }
    ];

    res.render('user/groups',{
        title : 'Groups Manager',
        user : req.params.username
    });

};

exports.tasksManager = function(req,res){
    //fetch tasks from database

    //simulate some tasks
    var tasks = [
        {
            taskID: 1,
            taskName: 'test1',
            strategyID: 22,
            status: 0, //0 for done, 1 for doing ,2 for future
            phones: [13800138000, 13800138001, 13800138002, 13800138003]
        },
        {
            taskID: 2,
            taskName: 'test2',
            strategyID: 24,
            status: 1, //0 for done, 1 for doing ,2 for future
            phones: [13800138000, 13800138001, 13800138002, 13800138003]
        },
        {
            taskID: 3,
            taskName: 'test3',
            strategyID: 21,
            status: 2, //0 for done, 1 for doing ,2 for future
            phones: [13800138000, 13800138001, 13800138002, 13800138003]
        }

    ];

    res.render('user/tasks',{
        title: 'Task Manager',
        user : req.params.username,
        tasks: tasks
    });
};

exports.strategyManager = function(req,res){
    //fetch from db

    //simulate some
    var stas = [
        {
            strategyId: 1,
            strategyName: 'test1'
        },
        {
            strategyId: 2,
            strategyName: 'test2'
        },
        {
            strategyId: 3,
            strategyName: 'test3'
        },
        {
            strategyId: 4,
            strategyName: 'test4'
        }
    ];

    res.render('user/strategy',{
        title: 'Strategy Manager',
        user: req.params.username
    });
};

exports.partials = function (req,res) {
    var pname = req.params.name;
    res.render('partials/'+pname);
}


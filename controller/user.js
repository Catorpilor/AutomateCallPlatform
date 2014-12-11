/**
 * Created by chris on 12/11/14.
 */


module.exports.index = function(req,res){
    res.render('user/index',{
        title : 'User Dashboard',
        user : req.params.username
    });
};

module.exports.phoneManager = function(req,res){
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
        title : 'Phone Books',
        user : req.params.username,
        phones : phones
    });
};

module.exports.groupManager = function(req,res){
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
        user : req.params.username,
        groups : groups
    });

};

module.exports.tasksManager = function(req,res){
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

module.exports.strategyManager = function(req,res){
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
        user: req.params.username,
        strategies: stas
    });
}
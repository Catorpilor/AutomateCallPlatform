var _ = require('lodash');
var phoneManager = require("../../../proxy/phones");
//simple test data
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

//GET Phones for user
exports.phones = function(req,res,next){
  //just retrive phones from res.sessions.user.phones
  //res.session.user got updated when user log in
  console.log(req.session.user);
  res.json({
    phones:req.session.user.phones
  });
};

//add phone for user
exports.addPhone = function (req,res,next) {
  //console.log(req);
  req.getConnection(function (err,connection) {
    if(err) return next(err);
    var query="insert into call_phonenum set ?";
    var phone = {
      PHONE_NUM: req.body.phoneNum*1,
      PK_USERINFO: req.session.user.pkuserid,
      CREATEDATE : new Date(),
      LAST_UPDATEDTIME : new Date()
    };
    //var opt = ['call_phonenum',phone];
    connection.query(query,phone,function(err,result){
      if(err) return next(err);
      console.log(result.insertId);
      phone.PK_PHONENUM = result.insertId;
      req.session.user.phones.push(phone);
      res.send(200,{status:'ok'});
    });
  })

};

exports.deletePhone = function (req,res,next) {
  //console.log(req.query.phone);
  console.log(req.body,req.query);
  var c = req.query.phonenum;
  console.log(c);
  req.getConnection(function (err,connection) {
    if(err) return next(err);
    var query="delete from call_phonenum where PHONE_NUM = ? && PK_USERINFO = ?";
    var opt=[c,req.session.user.pkuserid];
    connection.query(query,opt,function(err,result){
      if(err) return next(err);
      //console.log(result);
      //shrink the req.session.user.phones
      for(var i =0;i<req.session.user.phones.length;i++){
        if(req.session.user.phones[i].PK_PHONENUM == c ){
          req.session.user.phones.splice(i,1);
          break;
        }
      }
      res.send(200,{status:"ok"});
    });
  })

};


//groups api
//list groups

//strategy api
exports.strategies = function(req,res,next) {
  // req.getConnection(function(err,connection) {
  //   if(err) return next(err);
  //   var query="select ?? from ?? where PK_USERINFO = ?";
  //   var pk_usernum = req.session.user.pkuserid;
  //   opt=[['PK_TACTICS','TACTICS_CODE','TACTICS_NAME','CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY'],'call_tactics',pk_usernum];
  //   connection.query(query,opt,function(err,results) {
  //     if(err) return next(err);
  //     console.log(results);
  //     req.session.user.strategies = results;
  //     res.json({
  //       strategies:results
  //     });
  //   });
  // });
  res.json({
    strategies:req.session.user.strategies
  });
};

exports.addStrategy = function(req,res,next) {
  console.log('insert strategy',req.body,req.session.user.pkuserid);
  req.getConnection(function(err,connection){
    if(err) return next(err);
    var strategy = {
      TACTICS_NAME:req.body.strategy.TACTICS_NAME,
      CALL_DURATION:req.body.strategy.CALL_DURATION,
      CALL_INTERVAL: req.body.strategy.CALL_INTERVAL,
      CALL_TIMES:req.body.strategy.CALL_TIMES,
      CALL_DISPLAY:req.body.strategy.CALL_DISPLAY,
      PK_USERINFO:req.session.user.pkuserid
    };

    var query = "insert into call_tactics set ?";
    //var opt = ['call_tactics',strategy];
    connection.query(query,strategy,function(err,result) {
      if(err) return next(err);
      console.log(result.insertId);
      strategy.PK_TACTICS = result.insertId*1;
      console.log(strategy);
      req.session.user.strategies.push(strategy);
      res.json({status:'ok',pk_tacid: result.insertId});
    });
    //console.log(rquery.sql);
  });
};

exports.editStrategy = function(req,res,next) {
  console.log('put update strategy',req.body);
  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var query="update call_tactics set ? where PK_TACTICS = ?";
    var t = _.pick(req.body,'TACTICS_NAME','CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY');
    var opt = [t,req.body.PK_TACTICS];
    var dbma = connection.query(query,opt,function(err,result) {
      if(err) return next(err);
      console.log(result);
      res.json({status:'ok'});
    });
    console.log(dbma.sql);
  });
};

exports.deleteStrategy = function(req,res,next) {
  console.log('delete strategy', req.body,req.query);
  req.getConnection(function (err,connection) {
    if(err) return next(err);
    var query="delete from ?? where PK_TACTICS = ? ";
    var opt=['call_tactics',req.query.strategyId];
    connection.query(query,opt,function(err,result){
      if(err) return next(err);
      //console.log(result);
      //shrink the req.session.user.phones
      // for(var i =0;i<req.session.user.strategies.length;i++){
      //   if(req.session.user.strategies[i].PK_TACTICS == req.query.strategyId*1 ){
      //     req.session.user.strategies.splice(i,1);
      //     break;
      //   }
      // }
      res.json({status:"ok"});
    });
  });
};


//tasks related

exports.getTasks = function(req,res,next) {
  console.log('get tasks');
  res.send(200,{
    status:'ok',
    tasks: req.session.user.tasks,
    phonelists: req.session.user.phones,
    strategies: req.session.user.strategies
  });
};

exports.getTaskDetails = function(req,res,next) {
  console.log('get tasks details ');
  if(req.session.user.tasks.length == 0 ){
    res.send(200,{
        status:'ok',
        taskdetail: []
    });
  }else if( typeof( _.where(req.session.user.tasks,{'TASK_STATUS':1})) != "undefined" ){
    req.getConnection(function(err,connection) {
      if(err) return next(err);

      var ids = _.pluck(req.session.user.tasks,'PK_TASK');
      var idtuple = _(ids).forEach().join(',');
      var query="select ?? from ?? where ?? in ("+idtuple+')';
      var finalids = '('+idtuple+')';
      var opt=[['PK_TASKDETAIL','PK_TASK','GROUP_CODE','PHONE_NUM','CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY'], 'call_taskdetail','PK_TASK'];
      var tquery = connection.query(query,opt,function(err,results) {
        if(err) return next(err);
        console.log(results);
        res.send(200,{
          status:'ok',
          taskdetail: results
        });
      });
      console.log(tquery.sql);
    });
  }

};

exports.postTask = function(req,res,next) {
  console.log(req.body);
  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var taskinfo = {
      TASK_NAME: req.body.TASK_NAME,
      PK_USERINFO:req.session.user.pkuserid,
      TASK_STATUS: req.body.TASK_STATUS
    };
    var query = "insert into call_task set ?";
    var sqlres = connection.query(query,taskinfo,function(err,result) {
      if(err) return next(err);
      console.log(result.insertId);
      res.send(200,{
        status:'ok',
        taskid: result.insertId
      });
    });
    console.log(sqlres.sql);
  });
};

exports.postTaskDetail = function(req, res,next) {
  console.log(req.body);
  var strippedPhones = [];
  var tasks=[];
  _.forEach(req.body.phones,function (obj) {
    strippedPhones.push(_.pick(obj,'PHONE_NUM','strategy'));
  });
  _(strippedPhones).forEach(function(obj) {
  var stripped = _.values(_.pick(obj.strategy,'CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY'));
    stripped.push(req.body.PK_TASK);
    stripped.push(obj.PHONE_NUM);
    tasks.push(stripped);
  });
  console.log(tasks);
  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var query = "insert into call_taskdetail (CALL_DURATION,CALL_INTERVAL,CALL_TIMES,CALL_DISPLAY, PK_TASK,PHONE_NUM ) values ?";
    var opt = [tasks];
    var ressql = connection.query(query,opt,function(err,results) {
      if(err) return next(err);
      console.log(results);
      res.send(200,{
        status:'ok',
        insertId: results.insertId
      })
    });
     console.log(ressql.sql);
  });
}

exports.updateTaskDetail = function(req, res, next) {
  console.log('put update task detail',req.body);
  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var query="update ?? set ? where PK_TASKDETAIL = ?";
    var t = _.pick(req.body,'CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY');
    var opt = ['call_taskdetail',t,req.body.PK_TASKDETAIL];
    var dbma = connection.query(query,opt,function(err,result) {
      if(err) return next(err);
      console.log(result);
      res.json({status:'ok'});
    });
    console.log(dbma.sql);
  });
}

exports.deleteTaskDetail = function( req, res, next) {
  console.log('delete taskdetail', req.body,req.query);
  req.getConnection(function (err,connection) {
    if(err) return next(err);
    var query="delete from ?? where PK_TASKDETAIL = ? ";
    var opt=['call_taskdetail',req.query.taskdetailID];
    connection.query(query,opt,function(err,result){
      if(err) return next(err);
      //console.log(result);
      //shrink the req.session.user.phones
      // for(var i =0;i<req.session.user.strategies.length;i++){
      //   if(req.session.user.strategies[i].PK_TACTICS == req.query.strategyId*1 ){
      //     req.session.user.strategies.splice(i,1);
      //     break;
      //   }
      // }
      res.json({status:"ok"});
    });
  });
}







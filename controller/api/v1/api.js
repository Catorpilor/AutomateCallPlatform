var _ = require('lodash');
var phoneManager = require("../../../proxy/phones");
var eventproxy = require("eventproxy");
var validator = require('validator');
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
    phones:req.session.user.phones,
    sounds:req.session.user.sounds
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
  // if(req.session.user.tasks.length == 0 ){
  //   res.send(200,{
  //       status:'ok',
  //       taskdetail: []
  //   });
  // }else if( typeof( _.where(req.session.user.tasks,{'TASK_STATUS':1})) != "undefined" ){
  //   req.getConnection(function(err,connection) {
  //     if(err) return next(err);

  //     var ids = _.pluck(req.session.user.tasks,'PK_TASK');
  //     var idtuple = _(ids).forEach().join(',');
  //     var query="select ?? from ?? where ?? in ("+idtuple+')';
  //     var finalids = '('+idtuple+')';
  //     var opt=[['PK_TASKDETAIL','PK_TASK','GROUP_CODE','PHONE_NUM','CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY'], 'call_taskdetail','PK_TASK'];
  //     var tquery = connection.query(query,opt,function(err,results) {
  //       if(err) return next(err);
  //       console.log(results);
  //       res.send(200,{
  //         status:'ok',
  //         taskdetail: results
  //       });
  //     });
  //     console.log(tquery.sql);
  //   });
  // }
  res.json({
    phones:req.session.user.tasks,
    sounds:req.session.user.sounds
  });

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
  // var strippedPhones = [];
  // var tasks=[];
  // _.forEach(req.body.phones,function (obj) {
  //   strippedPhones.push(_.pick(obj,'PHONE_NUM','strategy'));
  // });
  // _(strippedPhones).forEach(function(obj) {
  // var stripped = _.values(_.pick(obj.strategy,'CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY'));
  //   stripped.push(req.body.PK_TASK);
  //   stripped.push(obj.PHONE_NUM);
  //   tasks.push(stripped);
  // });
  // console.log(tasks);
  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var query = "insert into call_taskdetail set ?";
    var opt = req.body;
    //convert json date to actual date
    var pdate = opt.CALL_NEXTTIME;
    opt.CALL_NEXTTIME = new Date(pdate);
    opt.CALL_BOOKTIME = new Date(pdate);
    opt.PK_USERINFO = req.session.user.pkuserid;
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
    var t = _.pick(req.body,'CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY','CALL_VOICE','PHONE_NUM','CALL_NEXTTIME');
    //convert json date to actual date
    var pdate = t.CALL_NEXTTIME;
    t.CALL_NEXTTIME = new Date(pdate);
    t.CALL_BOOKTIME = new Date(pdate);
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
    var opt=['call_taskdetail',req.query.taskid];
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


//get reports

exports.getReports = function(req, res, next) {
  console.log('Call from reportsManager interval query');
  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var query = "select ?? from ?? where PK_USERINFO = ?";
    var opt = [['PHONE_NUM','CALL_BOOKTIME','CALL_ENDTIME','CALL_TIMES','CALL_STATUS','CALLDETAIL_SUCCESS','CALLDETAIL_FAILED'], 'call_taskdetail',req.session.user.pkuserid ];
    var sqlcon = connection.query(query,opt,function(err,results) {
      if(err) return next(err);
      console.log(results);
      res.send(200,{
        status:'ok',
        reports: results
      });
    });
    console.log(sqlcon.sql);
  });
};

exports.getBasicReports  =function(req, res, next) {
  console.log('Call from the first call of reports');
  console.log(req.session.user.reports);
  res.json({
    reports: req.session.user.reports
  });
};

exports.checkRegister = function(req,res,next) {
  console.log(req.body);
  //req.body should like this
  //{
  //   UserName: 'xxxxx',
  //   device : 'xxxx'
  //}
  var username =validator.trim(req.body.UserName);
  //check with db
  console.log('calls from app register');
  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var columns = ['PK_USERINFO','USERNAME'];
    var query = "select ?? from ?? where USERNAME = ?";
    connection.query(query,[columns,'userinfo', username],function(err,results) {
      if(err) return next(err);
      console.log(results);
      if(results.length==0 ){
        //if not exists insert
	query="select ?? from ??";
	var opt=[['PK_GATEWAY'],'call_gateway'];
	connection.query(query,opt,function(err,results){
		if(err) return next(err);
		var obj = {
			USERNAME:username,
			PK_GATEWAY: results[0].PK_GATEWAY
		};
        	var esql = connection.query('insert into userinfo set ?', obj,function(err,result) {
         		if(err) return next(err);
          		res.json({status:'success',pk_userid:result.insertId*1,reason:''});
        	});
		console.log(esql.sql);
	});
      }else{
        res.json({status:'success',pk_userid:results[0].PK_USERINFO,reason:''});
      }
    });
  });
};

exports.getTaskLists = function(req, res, next) {
  console.log('calls from app gettasklists');
  console.log(req.query.pk_userid);
  var pk_usernum = req.query.pk_userid;
  //query from db
  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var query="select ??, DATE_FORMAT(CALL_BOOKTIME,'%Y-%m-%e %H:%i:%s') as CALL_BOOKTIME from ?? where PK_USERINFO = ?";
    //var opt = [['PK_PHONENUM','PHONE_NUM','PK_USERINFO'], 'call_taskdetail', pk_usernum ];
    var opt = [['PK_TASKDETAIL','PHONE_NUM','CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY','CALL_ENDTIME','CALL_STATUS'],'call_taskdetail',pk_usernum];
    connection.query(query,opt,function(err,results) {
      if(err) return next(err);
      //get the undone tasks
      //var stripedPhones = _.where(results,function(phone) {
      //  return phone.CALL_STATUS*1 <=1;
      //});
      res.json({status:'success',tasks:results});
    });
  });
};

exports.getTask = function(req, res, next){
	console.log("calls from app getTask by id");
	console.log(req.params.taskid);
	var taskid = req.params.taskid;
	req.getConnection(function(err,connection){
		if(err) return next(err);
		var query="select ??, CALLDETAIL_SUCCESS+CALLDETAIL_FAILED as CALL_TIMES, DATE_FORMAT(CALL_BOOKTIME,'%Y-%m-%e %H:%i:%s') as CALL_BOOKTIME, ifnull(DATE_FORMAT(CALL_ENDTIME,'%Y-%m-%e %H:%i:%s'),'--') as CALL_ENDTIME,( SELECT count(*) from call_calldetail where call_calldetail.CALLED = call_taskdetail.PHONE_NUM ) as TOTAL_CALLTIMES from ?? where PK_TASKDETAIL = ?";
		var opt = [['PHONE_NUM','CALL_DURATION','CALL_INTERVAL','CALL_STATUS','CALLDETAIL_SUCCESS','CALLDETAIL_FAILED'], 'call_taskdetail',taskid];
		var sqlque = connection.query(query,opt,function(err,result){
			if(err) return next(err);
			console.log(result);
			res.json({status:'succss',task:result[0]});
		});
		console.log(sqlque.sql);
	});
};

exports.getTaskRecords = function(req,res,next) {
  console.log('calls from app getTaskRecords');
  console.log(req.query.pk_userid);
  var pk_usernum = req.query.pk_userid;
  req.getConnection(function(err,connection) {
    if(err) return next(err);
      var query="select ??, DATE_FORMAT(CALL_BOOKTIME,'%Y-%m-%e %H:%i:%s') as CALL_BOOKTIME from ?? where PK_USERINFO = ?";
      //var opt = [['PK_PHONENUM','PHONE_NUM','PK_USERINFO'], 'call_taskdetail', pk_usernum ];
      var opt = [['PK_TASKDETAIL','CALL_VOICE','PHONE_NUM','CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY','CALL_ENDTIME','CALL_STATUS','CALLDETAIL_SUCCESS','CALLDETAIL_FAILED'],'call_taskdetail',pk_usernum];
      connection.query(query,opt, function(err,results) {
        if(err) return next(err);
        //get the done tasks
        //var donetasks = _.where(results,function(task) {
         // return task.CALL_STATUS*1 == 2;
        //});
        res.json({status:'success',records:results});
      });
  });
};

exports.getTaskDetail = function(req,res,next) {
  console.log('calls from app getTaskDetail');
  console.log(req.params.taskid);
  var taskid = req.params.taskid;
  req.getConnection(function(err, connection) {
    if(err) return next(err);
    var query = "select ?? ,DATE_FORMAT(STARTTIME,'%Y-%m-%e %H:%i:%s') as STARTTIME, DATE_FORMAT(ENDTIME,'%Y-%m-%e %H:%i:%s') as ENDTIME from ?? where CALL_REQUESTID = ?";
    var opt = [['PK_CALLDETAIL','CALLER','CALLED','CALLRESULT'],'call_calldetail', taskid];
    var sqlquery = connection.query(query,opt,function(err,results) {
      console.log(results);
      if(err) return next(err);
      res.json({status:'success',details:results});
    });
    console.log(sqlquery.sql);
  });
};

exports.addTask = function(req, res, next) {
  console.log('calls from app addTask');
  console.log(req.body);
  var obj = req.body;

  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var query = "select ?? from ??";
    opt = [['file_name','file_path','file_desc'],'call_fileinfo'];
    connection.query(query,opt,function(err,results) {
      if(err) return next(err);
      //specify the 1st wav file
      obj.CALL_VOICE = results[0].file_path;
      obj.CALL_VOICE_LEN = results[0].file_desc;
      obj.CALL_NEXTTIME = req.body.CALL_BOOKTIME;

      //then insert into the call_taskdetail
      var sqlcon = connection.query('insert into call_taskdetail set ?', obj, function(err, result) {
        if(err) return next(err);
        console.log(result);
        obj.PK_TASKDETAIL = result.insertId*1;
        res.json({status:'success',newtask:_.pick(obj,'PK_TASKDETAIL','PHONE_NUM','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY')})
      });
      console.log(sqlcon.sql);
    });
  });
};

exports.updateTask = function(req,res,next){
	console.log('calls from app updateTask');
	console.log(req.body);
  req.getConnection(function(err,connection) {
    if(err) return next(err);
    var query="update ?? set ? where PK_TASKDETAIL = ?";
    var t = _.pick(req.body,'CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY','PHONE_NUM','CALL_BOOKTIME');
    //convert json date to actual date
    var pdate = t.CALL_BOOKTIME;
    t.CALL_NEXTTIME = new Date(pdate);
    t.CALL_BOOKTIME = new Date(pdate);
    var opt = ['call_taskdetail',t,req.body.PK_TASKDETAIL];
    var dbma = connection.query(query,opt,function(err,result) {
      if(err) return next(err);
      console.log(result);
      res.json({status:'success',pk_taskid:req.body.PK_TASKDETAIL});
    });
    console.log(dbma.sql);
  });
};

exports.getAds = function(req, res, next){
  console.log('calls from app getAds');
  console.log(req.query.pk_userid,req.query.clickCount);
  req.getConnection(function(err,connection){
     if(err) return next(err);
     var query = "select ?? from ads order by ads_id DESC limit 0,1";
     var opt = [['name','pic_url','url','count']];
     var sqlcon = connection.query(query,opt,function(err,result){
         if(err) return next(err);
         console.log(result);
	 var iCount = req.query.clickCount;
	 if(iCount<=result[0].count){
	 	res.json({status:'success',ads:result[0]});
	 }else{
	 	res.json({status:'success'});
	}
     });
     console.log(sqlcon.sql);
  });
};

exports.addFeeds = function(req, res, next){
  console.log('calls from app addFeeds');
  console.log(req.body);
  var obj = req.body;
  req.getConnection(function(err,connection){
     if(err) return next(err);
     obj.create_time = new Date();
     var query = "insert into feedbacks set ?";
     connection.query(query,obj,function(err,result){
        if(err) return next(err);
	console.log(result);
        res.json({status:'success',feed_id:result.insertId*1});
     });
  });
};


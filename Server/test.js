var eventproxy = require('eventproxy');
var fs = require('fs');
var _ = require("lodash");

//var ep = new eventproxy();
//var a =['./api_v1_router.js','./server.js','./web_router'];
//
//ep.after('file',a.length,function (list) {
//	console.log(123);
//	console.log(list);
//});

//var phones=[
//	{
//		phoneNo : 13800138000,
//		group : 'Group A'
//	},
//	{
//		phoneNo : 13800138001,
//		group : 'Group A'
//	},
//	{
//		phoneNo : 13800138002,
//		group : 'Group C'
//	},
//	{
//		phoneNo : 13800138004,
//		group : 'Group A'
//	}
//];
//
//var phoneGroups = _.pluck(phones,'group');
//console.log(phoneGroups);
//
//var s = { PK_TACTICS: 9,
//  TACTICS_NAME: 'mytest',
//  CALL_DURATION: '10',
//  CALL_INTERVAL: '5',
//  CALL_TIMES: '512',
//  CALL_DISPLAY: '123' };
//var t = _.pick(s,'TACTICS_NAME','CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY');
//console.log(t);
//var d = [1,2,3];
//var df = _(d).forEach().join(',');
//var finale = '('+df+')';
//console.log(df,finale);
//console.log(a.length);
//a.forEach(function (filename,i) {
//	console.log(filename,i);
//	//fs.readFile(filename, 'utf-8', ep.group('file'));
//	fs.stat(filename, ep.group('file',function(result){
//		console.log(result);
//		return result;
//	}));
//});
//a.forEach(fs.stat(a[], ), )
//for(var i =0;i<a.length;i++){
//	fs.stat(a[i], ep.group('file',function (result) {
//		console.log(i,result);
//		return result;
//	}));
//}

var persons=[
	{
		name: 'jiao',
		age:21,
		group: 'Group A'
	},{
		name: 'jian',
		age:22,
		group: 'Group C'
	}
];
//
//var phones=[
//	{
//		phoneNo : 13800138000,
//		group : 'Group A'
//	},
//	{
//		phoneNo : 13800138001,
//		group : 'Group A'
//	},
//	{
//		phoneNo : 13800138002,
//		group : 'Group C'
//	},
//	{
//		phoneNo : 13800138004,
//		group : 'Group A'
//	}
//];
//
//var c = _(phones).forEach(function (obj) {
//	console.log(_.values(obj));
//});
//console.log(c );
//
//
//var d = { PK_TACTICS: 18,
//TACTICS_NAME: '呼死你',
//CALL_DURATION: '20',
//CALL_INTERVAL: '5',
//CALL_TIMES: '5',
//CALL_DISPLAY: '59349000' };
//
//d = _.values(_.pick(d,'CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY'));
//d.push(123);
//console.log(d);

var f = { TASK_NAME: '1183',
phones: 
 [ { PK_PHONENUM: 10,
		 PHONE_NUM: '13800138001',
		 PK_USERINFO: 4,
		 status: true,
		 strategy: { PK_TACTICS: 18,
		TACTICS_NAME: '呼死你',
		CALL_DURATION: '20',
		CALL_INTERVAL: '5',
		CALL_TIMES: '5',
		CALL_DISPLAY: '59349000' } },
	 { PK_PHONENUM: 11,
		 PHONE_NUM: '13900139230',
		 PK_USERINFO: 4,
		 status: true,
		 strategy: { PK_TACTICS: 18,
		TACTICS_NAME: '呼死你',
		CALL_DURATION: '20',
		CALL_INTERVAL: '5',
		CALL_TIMES: '5',
		CALL_DISPLAY: '59349000' } } ],
TASK_STATUS: 2,
taskId: 7 };

var strippedPhones = [];
var tasks=[];
_.forEach(f.phones,function (obj) {
	strippedPhones.push(_.pick(obj,'PHONE_NUM','strategy'));
});
_(strippedPhones).forEach(function(obj) {
	var stripped = _.values(_.pick(obj.strategy,'CALL_DURATION','CALL_INTERVAL','CALL_TIMES','CALL_DISPLAY'));
	stripped.push(f.taskId);
	stripped.push(obj.PHONE_NUM);
	tasks.push(stripped);
});
//var t = _.where(phones, {group:'Group A'});
//console.log(t);
//
////var res = _.groupBy(phones,'group');
////var newpe = _.indexBy(persons,'group');
//_(persons).forEach(function(obj){
//	obj.phones = _.where(phones,{group:obj.group});
//});
//
//console.log(persons);
//console.log(res,newpe);
//var renew = _.merge(res,newpe);
//console.log(renew);

var newary = [ { PK_TASK: 2,
TASK_CODE: null,
TASK_NAME: 'mytest',
TASK_STATUS: '2' },
{PK_TASK: 3,
TASK_CODE: null,
TASK_NAME: 'keepgoding',
TASK_STATUS: '2' },
 {PK_TASK: 4,
TASK_CODE: null,
TASK_NAME: 'kee',
TASK_STATUS: '2' },
 {PK_TASK: 5,
TASK_CODE: null,
TASK_NAME: 'waytogo',
TASK_STATUS: '2' },
 {PK_TASK: 6,
TASK_CODE: null,
TASK_NAME: '11823',
TASK_STATUS: '2' },
{ PK_TASK: 7,
TASK_CODE: null,
TASK_NAME: '1183',
TASK_STATUS: '2' },
 {PK_TASK: 8,
TASK_CODE: null,
TASK_NAME: '9083',
TASK_STATUS: '2' },
{ PK_TASK: 9,
TASK_CODE: null,
TASK_NAME: '123412312',
TASK_STATUS: '2' },
{ PK_TASK: 10,
TASK_CODE: null,
TASK_NAME: 'asfsd',
TASK_STATUS: '2' },
 {PK_TASK: 11,
TASK_CODE: null,
TASK_NAME: 'newtasks',
TASK_STATUS: '2' },
 {PK_TASK: 12,
TASK_CODE: null,
TASK_NAME: 'evnew',
TASK_STATUS: '2' },
 {PK_TASK: 13,
TASK_CODE: null,
TASK_NAME: 'kisfdafdafdafda',
TASK_STATUS: '2' },
 {PK_TASK: 14,
TASK_CODE: null,
TASK_NAME: 'fuckit',
TASK_STATUS: '2' } ]

console.log(_.findWhere(newary, {PK_TASK:14}).TASK_NAME);

var tasks=[
	{
		TASK_NAME: "kissmyass",
		TASK_STATUS: 1,
		detailtaskId: 7,
		PK_TASK: 5,
		phones:[
			{
				CALL_DISPLAY: "59349000",
				CALL_DURATION: "20",
				CALL_INTERVAL: "5",
				CALL_TIMES: "5",
				PHONE_NUM: "13800138001",
				PK_PHONENUM: 10,
				PK_USERINFO: 4,
				status: true,
				PK_TASKDETAIL: 5
			},
			{
				CALL_DISPLAY: "59349000",
				CALL_DURATION: "20",
				CALL_INTERVAL: "5",
				CALL_TIMES: "5",
				PHONE_NUM: "13800138002",
				PK_PHONENUM: 10,
				PK_USERINFO: 4,
				status: true,
				PK_TASKDETAIL: 6
			}
		]
	}
];

console.log(_.findWhere(tasks,{PK_TASK:5}).phones);
 
_.findWhere(tasks,{PK_TASK:5}).phones = _.without(_.findWhere(tasks,{PK_TASK:5}).phones, _.findWhere(_.findWhere(tasks,{PK_TASK:5}).phones, {PK_TASKDETAIL:6}));

console.log(tasks[0].phones);

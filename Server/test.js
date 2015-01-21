var eventproxy = require('eventproxy');
var fs = require('fs');
var _ = require("lodash");
var crypto = require("crypto");

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
	},{
		name: 'gong',
		age:23,
		group: 'Group C'
	}
];

var newt = _.where(persons,function (per) {
	return per.age <= 22;
});

console.log(newt);
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

var md5 = crypto.createHash('md5');
var password = md5.update('1234').digest('base64');
console.log(password);

console.log(new Buffer("1234").toString('base64'));

//var configs = {maxmemcount:"MzA=",maxconfcount:"Mw=="};
//var mems = new Buffer(configs.maxmemcount,'base64');
//console.log(mems.toString());
fs.readFile('config.js','utf-8',function(err,data){
	if(err) throw err;

	data = JSON.parse(data);
		console.log(data);
//	data = JSON.parse(data);
//	var mems = new Buffer(data.maxmemcount,'base64');
//	mems = mems.toString();
//	var confs = new Buffer(data.maxconfcount,'base64');
//	confs = confs.toString();
//	res.render('padmin', {title: '管理员界面', curnum: pdocs.length-1, maxmem: mems*1, maxconfs: confs*1});
});
var starttime = '2014-12-31T13:50';
var s = starttime.replace('T',' ').replace('Z','');


var duretime = '120';
console.log(duretime);

var endtime = new Date(s);
console.log(endtime);
//reformat the end time
	var cs = [31,28,31,30,31,30,31,31,30,31,30,31];
	var tempminutes = endtime.getMinutes() + duretime*1;
	var iHour = Math.floor(tempminutes/60);
	var remMins = tempminutes%60;

	console.log(iHour,remMins);

	var temphours = endtime.getHours() + iHour;
	var idate = Math.floor(temphours/24);
	var remHours = temphours%24;

	console.log(idate,remHours);

	var tempdates = endtime.getDate() + idate;
	var iMonth,remDate;
	
	if(tempdates == cs[endtime.getMonth()]){
		iMonth = 0;
		remDate = tempdates;
	}else{
		if(endtime.getMonth() == 1 && (endtime.getYear()+1900)%4 == 0 ){
				iMonth = Math.floor(tempdates/(cs[endtime.getMonth()]+1));
				remDate = tempdates%(cs[endtime.getMonth()]+1);
				//cs[err.getMonth()] = cs[err.getMonth()]+1;
		}else{
				iMonth = Math.floor(tempdates/cs[endtime.getMonth()]);
				remDate = tempdates%cs[endtime.getMonth()];
		}
	}
	
	

	console.log(tempdates,iMonth,remDate);

	var tempmonth = endtime.getMonth() + iMonth;
	var iyear = Math.floor(tempmonth/12);
	var remmonth = tempmonth%12;

	console.log(tempmonth,iyear,remmonth);

	var tempyear = endtime.getYear()+iyear+1900;

	remmonth = remmonth+1;
	if(remmonth<10) {
			remmonth = '0'+remmonth;
	}
	if(remDate<10) { remDate = '0'+remDate; }
	if(remMins<10) { remMins = '0'+remMins; }
	if(remHours<10) { remHours = '0'+remHours;}

	var e = tempyear+'-'+remmonth+'-'+remDate+' '+remHours+':'+remMins;
	console.log(e);

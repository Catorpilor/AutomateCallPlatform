/**
 * Created by chris on 12/10/14.
 */

var config = require("../config.default");

var eventproxy = require("eventproxy");
var validator = require('validator');
var nuuid = require("node-uuid");
var auth = require("../middleware/auth");



exports.logout = function (req,res){
    console.log(req.session);
    var username = req.session.user.username;
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name,{path:'/user'+username});
    res.redirect('/');
};

exports.showLogin = function( req,res ){
    console.log(req.body);
    res.render('template/login',{
        title : 'Login Page'
    });
};

exports.checkLogin = function(req,res){
    console.log(req.body);
    var ep = new eventproxy();
    var username = validator.trim(req.body.username).toLowerCase();
    var password = validator.trim(req.body.password);
    if(!username || !password){
        res.status(422);
        res.render('template/login',{
            error: 'Infomation imcomplete'
        });
    }
    
    ep.on('login_fail',function () {
        res.status(403);
        res.render('template/login',{
            error: 'Username/Password error'
        });
    });
    
    ep.on('user_notexist',function () {
        res.status(410);
        res.render('template/login',{
            error: 'User not exists'
        });
    });

    //check with dbs
    req.getConnection(function (err,connection) {
        if(err) console.log(err);
        var columns = ['PK_USERINFO','USERNAME', 'USERPWD'];
        connection.query('select ?? from ?? where USERNAME = ?',[columns,'userinfo',username],function (err,result) {
            if(err) console.log(err);
            if(result.length==0 ) return ep.emit('user_notexist');
            if(result[0].USERPWD != password ) return ep.emit('login_fail');
            //store the information to session
            var user = {};
            user._id = nuuid.v1();
            user.username = result[0].USERNAME;
            user.pkuserid = result[0].PK_USERINFO;
            
            auth.gen_session(user,res);
            req.session.user = user;
            if( username == 'admin' ){
                res.redirect('/admin')
            }else{
                res.redirect('/user/'+username);
            }
        });
    });
    //here we just make simple test
//    if( username == 'admin' ){
//        res.redirect('/admin')
//    }else{
//        res.redirect('/user/'+username);
//    }

}
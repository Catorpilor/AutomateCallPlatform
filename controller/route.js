/**
 * Created by chris on 12/10/14.
 */

module.exports.logout = function (req,res){
    res.redirect('/');
};

module.exports.login = function( req,res ){
    console.log(req.body);
    res.render('template/login',{
        title : 'Login Page'
    });
};

module.exports.checkLogin = function(req,res){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    //check with dbs

    //here we just make simple test
    if( username == 'admin' ){
        res.redirect('/admin')
    }else{
        res.redirect('/user/'+username);
    }

}
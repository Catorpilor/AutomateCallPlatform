var config = require("../config.default");


function gen_session(user,res){
	var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
	 res.cookie(config.auth_cookie_name, auth_token,
		{path: '/user'+user.username, maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true}); //cookie 有效期30天
}

exports.gen_session = gen_session;
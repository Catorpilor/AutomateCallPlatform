/**
 * Created by chris on 12/10/14.
 */

var navs = [
    'chart',
    'table'
];


function arrayContains(needle)
{
    return (navs.indexOf(needle) > -1);
}

module.exports = function(req,res ){
    if( arrayContains(req.params[0])){
        console.log(req.params[0]);
        res.render('admin/'+req.params[0], {
            title: req.params[0],
            user : 'admin',
            navs : navs
        });
    }else{
        console.log(1);
        res.render('admin/index', {
            title: 'Dashboard',
            user: 'admin'
        });
    }


}
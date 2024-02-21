const auth = require('../../auth');
module.exports = function checkAuth (){
    function middleware(res, res, next){
        auth.checkToken.confirmarToken(req);
        next();
    }
    return middleware;
}
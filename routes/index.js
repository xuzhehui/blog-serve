
const register = require("./login/register.js")
const login = require('./login/login.js')
const userInfo = require('./login/UserInfo.js')
const repleasePassword = require('./login/repleasePassword.js')
const userModul = require('./user/user.js')
const lebal = require('./lebal/index.js')
const note = require('./note/index.js')
const session =require('express-session');

module.exports = function(app) {
    // app.use(cookieParser('sessiontest'));
    app.use(session({
    secret:'sessiontest',
    resave: true,
    cookie: {maxAge:20000 },
    saveUninitialized:true
    }))
    userInfo(app)//验证用户
    register(app);//注册
    login(app)//登录
    repleasePassword(app)//修改密码
    userModul(app)//管理用户
    
    lebal(app)//标签类
    note(app)//发布文章类
   
    
}


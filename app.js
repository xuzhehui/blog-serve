const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require("multer");
const session =require('express-session');


const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
// 设置图片上传路径
const multerObj = multer({dest:'upload'})

app.use(express.static(path.join(__dirname, 'views')));

mongoose.connect("mongodb://localhost/blogSever");//连接数据库

const db = mongoose.connection;

db.on('error',()=>console.log('blogSever数据库未连接'));//连接失败

db.on('open',()=>console.log('blogSever数据库已连接'));//成功连接


//设置跨域权限
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authentication,Origin,x-requested-with,Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json");
    next();
});





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('sessiontest'));
app.use(session({
  secret:'sessiontest',
  resave: true,
  saveUninitialized:true
}))
//图片上传



routes(app)
app.use(multerObj.any())


module.exports = app;
// 监听端口，启动程序
app.listen(4001, function () {
  console.log("应用启动成功")
})
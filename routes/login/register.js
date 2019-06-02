const Reger = require('../../schemaModel/register.js') //注册模型
const multipart = require('connect-multiparty');
const fs = require("fs")

let multipartMiddleware = multipart();
module.exports = function(app){
    app.post('/server/register',multipartMiddleware,(req,res)=>{
        if(!req.files.file){
            return res.json({
                success:false,
                msg:'请选择一张头像'
            })
        }
        let nowtime = Date.now()+'.jpg'
        // 处理图片加上后缀名
        fs.rename(req.files.file.path, "public/images/" + nowtime, function (err) {
            if (err) {
                throw err;
            }
        })
        let reqdata = req.body
        reqdata.type = 1
        reqdata.href=`images/${nowtime}`
        Reger.findOne({userName:reqdata.userName},(e,s)=>{
            if(e){
                return e
            }else if(s){
                res.json({
                    success:false,
                    msg:'此用户已被注册',
                })
            }else{
                Reger.create(reqdata,(err,data)=>{
                    if(err){
                    return err
                    }else{
                        res.json({
                            success:true,
                            href:data.href,
                            msg:'注册成功'
                        })
                    }
                })
            }
        })
    })

    app.post('/server/repleaseAvatar',multipartMiddleware,(req,res)=>{
        if(req.session.userInfo){
            let nowtime = Date.now()+'.jpg'
            fs.unlink(`public/${req.session.userInfo.href}`,(err)=>{
                if(err){
                    return err
                }else{
                    fs.rename(req.files.file.path, "public/images/" + nowtime, function (err) {
                        if (err) {
                            return err;
                        }else{
                            Reger.update({'userName':req.session.userInfo.userName},{'href':`images/${nowtime}`},(error,data)=>{
                                if(error){
                                    return error
                                }else{
                                    req.session.userInfo.href=`images/${nowtime}`
                                    res.json({
                                        success:true,
                                        msg:'更换成功',
                                        result:req.session.userInfo
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }else{
            res.json({
                success:false,
                msg:'请重新登录'
            })
        }
       
       
    })
}
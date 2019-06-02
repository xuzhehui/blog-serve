const Loger = require("../../schemaModel/register.js")



module.exports = function(app){
    app.post('/server/login',(req,res)=>{//登录
       
        let userInfo = {
            userName:req.body.userName,
            passWord:req.body.passWord
        }
        Loger.findOne(userInfo,(err,data)=>{
           if(err){
               return err
           }else{
               if(!data){
                   res.json({
                       success:false,
                       msg:"用户名或密码不正确"
                   })
               }else{
                    req.session.userInfo ={
                        userName:data.userName,
                        href:data.href,
                        type:data.type
                    }
                    req.session.cookie.maxAge = 1000*60*60
                    res.json({
                        success:true,
                        msg:'登录成功',
                        userName:data.userName,
                        href:data.href,
                        result:req.session.userInfo
                    })
               }
               
           }
       })
    })

    app.post('/server/loginOut',(req,res)=>{//退出登录
        req.session.destroy(function(err) {
            if(err){
                return err
            }else{
                res.json({
                    success:true,
                    msg:'退出成功',
                    result:null
                })
            }
        })
        
    })
}
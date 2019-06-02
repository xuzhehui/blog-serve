const repleasePassword = require("../../schemaModel/register.js");

module.exports = function(app){
    app.post(`/server/repleasePassword`,(req,res)=>{
        let oldpassword = req.body.oldpassword;
        let newpassword = req.body.newpassword;
        repleasePassword.findOne({'userName':req.body.userName,'passWord':oldpassword},(notfind,data)=>{
            if(notfind){
                return notfind
            }else if(!data){
                res.json({
                    success:false,
                    msg:'原密码不正确'
                })  
            }else{
                repleasePassword.update({'passWord':oldpassword},{'passWord':newpassword},(err,sdata)=>{
                    res.json({
                        success:true,
                        msg:'更新成功',
                    })     
                })
            }
        })
    })
}

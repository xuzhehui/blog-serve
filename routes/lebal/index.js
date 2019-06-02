const Lebal = require('../../schemaModel/lebal.js')
const Note = require("../../schemaModel/note.js")
const axios = require('axios')

module.exports = function(app){
    app.post('/server/addlebal',(req,res)=>{
        if(req.body.lebal){
            Lebal.create({lebalname:req.body.lebal},(err,data)=>{
                if (err) return {err}
                res.json({
                    success:true,
                    msg:'新增成功'
                })
            })
        }
    }),
    app.get('/server/getlebal',(req,res)=>{ 
        Lebal.find({},(err,data)=>{
            if(err){return err}
            res.json({
                success:true,
                msg:'查询成功',
                result:data
            })
        })
    }),
    app.post('/server/removelebal',(req,res)=>{
        if(req.session.userInfo){
            Lebal.remove({lebalname:req.body.lebal},(err,data)=>{
                if(err){return err}
                res.json({
                    success:true,
                    msg:'删除成功',
                })
            })
        }else{
            res.json({
                success:false,
                msg:'权限不足'
            })
        }
    })

    app.get('/server/lebalSerch',(req,res)=>{
        let leb = req.query.lebname;
        new Promise((reslove,reject)=>{
            Note.find({lebalname:leb}).then(resq=>{
                res.json({
                    result:resq,
                    success:true,
                    msg:'分类查询成功'
                })
            })
        })
    })

    app.get('/server/newslebal',(req,res)=>{
       Note.find({},(err,data)=>{
           if(err){return err}
           res.json({
               success:true,
               msg:'查询成功',
               result:data.reverse()
           })
       }).limit(5)
    })
}
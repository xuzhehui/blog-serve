const Note = require("../../schemaModel/note.js")

module.exports = function (app) {
    app.post('/server/addnotes', (req, res) => { //发布文章
            if (req.session.userInfo) {
                if (!req.body.id) {//not sessionType as created
                    let sin = new Date
                    let note = {
                        title: req.body.title,
                        userName: req.session.userInfo.userName,
                        avatar: req.session.userInfo.href,
                        visit: 0,
                        point: 0,
                        time: sin.toLocaleDateString(), //时间
                        content: req.body.content,
                        int: 1, //是否发布1为草稿，0为已发布
                        lebalname: req.body.lebalname, //文章分类
                    }
                    Note.create(note, (err, data) => {
                        if (err) {
                            return err
                        };
                        res.json({
                            success: true,
                            msg: '保存成功'
                        })
                    })
                }else{
                    
                    let id = req.body.id;
                    let updataObj = {
                        title:req.body.title,
                        lebalname:req.body.lebalname,
                        content:req.body.content,
                    }
                    Note.update({_id:id},updataObj,(err,data)=>{
                        if(err){return err}
                        res.json({
                            success:true,
                            msg:'更新成功'
                        })
                    })
                }


            } else {
                res.json({
                    success: false,
                    msg: '请登录'
                })
            }
        }),
        app.get('/server/getnotes', (req, res) => { //获取个人对应的文章
            if (req.session.userInfo) {
                Note.find({
                    'userName': req.session.userInfo.userName
                }, (err, data) => {
                    if (err) {
                        return err
                    } else {
                        res.json({
                            success: true,
                            msg: '请求成功',
                            result: data
                        })
                    }
                })
            } else {
                res.json({
                    success: false,
                    msg: '请登录'
                })
            }
        })

    app.post('/server/removenotes', (req, res) => { //删除个人文章
            if (req.session.userInfo) {
                let deleteobj = {
                    userName: req.session.userInfo.userName,
                    title: req.body.title,
                }
                Note.remove(deleteobj, (err, data) => {
                    if (err) { return err}
                    res.json({success: true,msg: '删除成功 '})
                })
            } else {
                res.json({success: false,msg: '请登录'})
            }
        }),
        app.post('/server/publishnotes', (req, res) => {//发布文章与撤回
            if(req.session.userInfo){
                Note.update({_id:req.body.id},{int:req.body.int},(err,data)=>{
                    if(err){return err}
                    res.json({success:true,msg:'发布成功'})
                })
            }else{
                res.json({success:false,msg:'请登录'})
            }
        }),
        app.get('/server/getAllnotes',(req,res)=>{//拉取首页文章
            let pageIndex = req.query.pageIndex;
            let index = (pageIndex - 1 )*5;
            let Pages=null;
            Note.find({int:req.query.int},(err,data)=>{
                Pages = Math.ceil(data.length/5)
                Note.find({int:req.query.int},(err,data)=>{
                    if(err){return err}
                    res.json({success:true,msg:'请求成功',result:data,totalPages:Pages})
                }).limit(5).skip(index)
            })
            
        }),

        app.post('/server/addvisit',(req,res)=>{//获取单篇文章的浏览量
            Note.update({_id:req.body.id},{visit:req.body.visit},(err,data)=>{
                if(err){return err}
                res.json({
                    success:true,
                    msg:'OK',
                })
            })
        })
}
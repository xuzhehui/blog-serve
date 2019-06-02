const Loger = require("../../schemaModel/register.js")



module.exports = function (app) {
    app.get('/server/finduser', (req, res) => { //查询所有用户
            if (req.session.userInfo) {
                let pageIndex = req.query.pageIndex;
                let index = (pageIndex - 1 )*15;
                let Pages=null;
                Loger.find({},(err,data)=>{
                    Pages = Math.ceil(data.length/15)
                })
                Loger.find({}, (err, data) => {
                    if (err) {
                        return err
                    } else {
                        let er = []
                        data.map((v, i, index) => {
                            er.push({
                                'userName': v.userName,
                                'type': v.type
                            })
                        })
                        res.json({
                            success: true,
                            msg: '查询成功',
                            result: er,
                            totalPages:Pages
                        })
                    }
                }).limit(15).skip(index)
            } else {
                res.json({
                    success: false,
                    msg: '请登录'
                })
            }
        }),
        app.post('/server/userType', (req, res) => { //修改用户type
            if (req.session.userInfo) {
                let name = req.body.userName;
                if (req.body.type==0||req.body.type==1) {
                    let Type = req.body.type;
                    Loger.update({
                        'userName': name
                    }, {
                        'type': Type
                    }, (err, data) => {
                        if (err) {
                            return err
                        }
                        res.json({
                            success: true,
                            msg: '修改成功'
                        })
                    })
                } else {
                    Loger.remove({
                        'userName': name
                    }, (err, data) => {
                        if (err) {
                            return err
                        } else {
                            res.json({
                                success: true,
                                msg: '删除成功'
                            })
                        }
                    })
                }
            } else {
                res.json({
                    success: false,
                    msg: '请登录'

                })
            }
        })
}
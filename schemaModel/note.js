const mongose = require('mongoose') 

let Schema = mongose.Schema;

let Note = new Schema({
    title:String,//标题
    userName:String,//作者
    avatar:String,//作者头像
    visit:Number,//访问量
    point:Number,//点赞数
    time:String,//时间
    content:String,//文章正文
    int:Number,//是否发布1为草稿，0为已发布
    lebalname:String,//文章分类
})

module.exports =  mongose.model('note',Note)
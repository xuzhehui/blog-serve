const mongose = require('mongoose') 

let Schema = mongose.Schema;

let Reger = new Schema({
    userName:String,
    passWord:String,
    href:String,
    type:Number,
    id:Number
})

module.exports =  mongose.model('user',Reger)
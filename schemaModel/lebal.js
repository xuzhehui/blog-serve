const mongose = require('mongoose') 

let Schema = mongose.Schema;

let Lebal = new Schema({
    lebalname:String
})

module.exports =  mongose.model('lebal',Lebal)
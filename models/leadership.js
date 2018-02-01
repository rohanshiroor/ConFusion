var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var leaderSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image: {
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true,
        unique:true
    },
    abbr:{
       type:String,
        required:true,
        unique:true
    },
    featured: {
        type: Boolean,
        default:false
    },
    description: {
        type:String,
        required:true
    }
},
   {
    
    timestamps:true  
})

var Leaders = mongoose.model('Leader',leaderSchema);
module.exports = Leaders;
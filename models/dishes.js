var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var currency = mongoose.Types.Currency;
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
var dishSchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
        unique:true
    },
    category: {
        type:String,
        required:true,
    },
    label: {
        type:String,
        required:false,
        default: ""
    },
    price:{
        type:currency,
        required:true
    },
    featured: {
        type: Boolean,
        default:false
    },
    description: {
        type:String,
        required:true
    },
    comments:[commentSchema]
    },
  
 {
    
    timestamps:true
})

var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;
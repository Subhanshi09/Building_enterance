const mongoose=require('mongoose');

const entrySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        trim:true,
    },
    cinh:{
        type:Number,
        min:0,
        max:23,
        required:true,
    },
    cinm:{
        type:Number,
        min:0,
        max:59,
        required:true,
    }


});
const Entry=mongoose.model('Entry',entrySchema);
module.exports=Entry;
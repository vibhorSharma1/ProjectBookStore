const mongoose=require('mongoose')
const timestamps=require('mongoose-timestamps');

const CouponsSchema=new mongoose.Schema({
    book:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true},
    discount:{type:Number,required:true}

});


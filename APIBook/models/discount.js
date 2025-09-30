const mongoose=require('mongoose')
const timestamps=require('mongoose-timestamps');

const discountSchema=new mongoose.Schema({
    book:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true},
    discountName:{type:String,required:true},
    discountType:{type:String,required:true,default:'fixed',enum:['fixed','Percentage']},
    discountValue:{type:Number,required:true,default:0},
    validFrom:{type:Date},
    validTo:{type:Date},
    status:{type:String,required:true,default:'Active',enum:['Active','InActive']},
    createdAt:Date,
    updatedAt:Date

});


discountSchema.plugin(timestamps,{index:true});
module.exports=mongoose.model('Discount',discountSchema);


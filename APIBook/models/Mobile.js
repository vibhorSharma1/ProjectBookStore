const mongodb=require('mongoose');
const timestamps=require('mongoose-timestamps');

const MobileSchema=new mongodb.Schema({
    brand:{type:String,required:true},
    model:{type:String,required:true},
    sku:{type:Number,required:true,unique:true},
    description:{type:String,required:true},
    releaseDate:{type:Date,required:true},
    OS:{type:String,require:true},
    OsVersion:{type:Number,require:true},
    chipSet:{type:String,require:true},
    CPU:{type:String,require:true},
    GPU:{type:String,require:true},
    RAM:{type:Number,require:true},
    ROM:{type:Number,require:true},
    display:{type:String,require:true},
    chargingType:{type:String,require:true,default:'Wired',enum:["Wired","WireLess"]},
    camera:{type:String,require:true},
    connectivity:{type:[String],require:true},
    sensors:{type:[String],require:true},
    color:{type:String,require:true},
    weight:{type:Number,require:true},
    height:{type:Number,require:true},
    width:{type:Number,require:true},
    price:{type:Number,require:true},
    isAvailable:{type:Boolean,require:true,default:true},
    warrantyMonths:{type:Number,require:true},
    image:{type:String,require:true},
    isReplaceable:{type:Boolean,required:true,default:true,enum:[true,false]},
    createdAt:Date,
    updatedAt:Date
});
MobileSchema.plugin(timestamps,{index:true});
module.exports=mongodb.model('Mobile',MobileSchema);
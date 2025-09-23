const mongoose=require('mongoose');
const timestamps=require('mongoose-timestamps');

const bookSchema=new mongoose.Schema({
    booktitle:{type:String,required:true},
    authorName:{type:String,required:true},
    shortDiscription:{type:String,required:true},
    longDiscription:{type:String,required:true},
    language:{type:String,required:true, default:"Hindi",enum:["Hindi","English","Punjabi"]},
    binding:{type:String,required:true, default:"PaperBinding",enum:["PaperBinding","HardCover","SpiralBinding"]},
    publisher:{type:String,required:true},
    quantity:{type:Number,required:true,default:0},
    originalPrice:{type:Number,required:true},
    genre:{type:String,required:true,enum:["Science","Fiction","Motivational","Fantasy","Biography","Comic","Horror"]},
    isBn:{type:String,required:true},
    edition:{type:String,required:true},
    isUsed:{type:Boolean,required:true},
    isNEW:{type:Boolean,required:true,default:true,enum:[true,false]},
    pages:{type:Number,required:true},
    publishYear:{type:Number,required:true},
    width:{type:Number,required:true},
    height:{type:Number,required:true},
    weight:{type:Number,required:true},
    imageUrl:{type:String,required:false},
    status:{type:String,required:true,default:"Available",enum:["Available","Out of Stock","Discontinued"]},
    isReplaceable:{type:Boolean,required:true,default:true,enum:[true,false]},
    createdAt:Date,
    updatedAt:Date
});
bookSchema.plugin(timestamps,{index:true});
module.exports=mongoose.model('Book',bookSchema);
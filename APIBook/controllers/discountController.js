const Discount=require('../models/discount');

async function getDiscount(req,res) {
    try {
        let discount=new Discount(req.body);
        await discount.save();
        res.status(200).send({success:true,message:"Discount Added Successfully"})
    } catch (error) {
        res.status(400).send({success:false,message:error})
    }
}

module.exports={
    getDiscount
}
 


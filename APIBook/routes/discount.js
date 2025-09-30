const express=require('express');
const router=express.Router();
const discountController=require('../controllers/discountController');
const bodyparse=require('body-parser')
router.use(bodyparse.json());
router.use(bodyparse.urlencoded({
    extended:false
}))

router.post('/getDiscount',(req,res)=>{
    discountController.getDiscount(req,res);
})

module.exports=router;

const express=require('express');
const router=express.Router();
const discountController=require('../controllers/discountController');
const bodyparse=require('body-parser')
router.use(bodyparse.json());
router.use(bodyparse.urlencoded({
    extended:false
}))

router.post('/addDiscount',(req,res)=>{
    discountController.getDiscount(req,res);
})
router.get('/getAllDiscounts',(req,res)=>{
    discountController.getAllDiscount(req,res);
})

module.exports=router;

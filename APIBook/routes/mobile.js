const express= require('express');
const multer=require('multer');
const bodyparse=require('body-parser')
const router=express.Router();
router.use(bodyparse.json());
router.use(bodyparse.urlencoded({
    extended:false
}))

const uploader=multer({
    storage:multer.diskStorage({}),
    limits:{fileSize:10*1024*1024}
});

const mobileController=require('../controllers/mobileController');


router.post('/addMobile',uploader.single("image"),(req,res)=>{
    console.log("hello")
    mobileController.addMobile(req,res);
});
router.get('/mobiles',(req,res)=>{
    mobileController.getALlMobiles(req,res);
});

router.delete('/deleteMobile',(req,res)=>{
    console.log("Delete kro")
    mobileController.deleteMobile(req,res);
})

router.get('/getMobile/:id',(req,res)=>{
    mobileController.getMobileById(req,res);
})

router.post('/editMobile/:id',uploader.single("image"),(req,res)=>{
    mobileController.editMobile(req,res);
})
module.exports=router;
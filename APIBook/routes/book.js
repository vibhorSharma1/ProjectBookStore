const express= require('express');
const multer=require('multer');
const bodyparse=require('body-parser')
const router=express.Router();
router.use(bodyparse.json());
router.use(bodyparse.urlencoded({
    extended:false
}))
const bookController=require('../controllers/bookController');

const uploader=multer({
    storage:multer.diskStorage({}),
    limits:{fileSize:10*1024*1024}
});

router.post('/addBook',uploader.single("imageUrl"),(req,res)=>{
    console.log("hello")
    bookController.addBook(req,res);
});
router.get('/books',(req,res)=>{
    bookController.getALlBooks(req,res);
})
module.exports=router;
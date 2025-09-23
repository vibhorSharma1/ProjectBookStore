const cloudnary = require('cloudinary').v2
const { uploadImage } = require('../Config/cloudanry');
const Book = require('../models/Book')

async function addBook(req, res) {
    try {
        let upload;
        

        if (req.file) {
            upload=await uploadImage(req.file.path)
        }
        let book = new Book(req.body);
        if (req.file && upload) {
            book.imageUrl = upload.secure_url;
        }
        await book.save();
        res.status(200).send({ success: true, message: 'Data Saved Successfully' })
    } catch (err) {
        console.log(err);
        res.status(404).send({ success: false, message: 'Something went Wrong' })

    }
}

async function getALlBooks(req,res) {
    try {
        let books=await Book.find({});
         console.log(books)
         res.status(200).send({success:true,data:books})
    } catch (error) {
        res.status(400).send({success:false,message:"something went wrong"})
    }
}

module.exports = {

    addBook,
    getALlBooks
}
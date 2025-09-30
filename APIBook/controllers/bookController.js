const { uploadImage } = require('../Config/cloudanry');
const Book = require('../models/Book');

async function addBook(req, res) {
    try {
        let upload;


        if (req.file) {
            upload = await uploadImage(req.file.path)
        }
        let book = new Book(req.body);
        if (req.file && upload) {
            // console.log(upload.secure_url);
            book.imageUrl = upload.secure_url;

        }
        console.log(book.imageUrl)
        await book.save();
        res.status(200).send({ success: true, message: 'Data Saved Successfully' })
    } catch (err) {
        console.log(err);
        res.status(404).send({ success: false, message: 'Something went Wrong' })

    }
}

async function getALlBooks(req, res) {
    try {
        let books = await Book.find({});
        //  console.log(books)
        res.status(200).send({ success: true, data: books })
    } catch (error) {
        res.status(400).send({ success: false, message: "something went wrong" })
    }
}
async function deleteBook(req, res) {
    try {
        let id = req.body.id;
        console.log(id)
        let book = await Book.findByIdAndDelete(id);
        res.status(200).send({ success: true, data: book })
    } catch (error) {
        res.status(400).send({ success: false, message: "something went wrong" })
    }
}
async function getBookById(req, res) {
    try {
        let id = req.params.id;
        let book = await Book.findById(id);
        res.status(200).send({ success: true, data: book })
    } catch (error) {
        res.status(400).send({ success: false, message: "something went wrong" })
    }
}

async function editBook(req, res) {
    try {
        let upload;
        let id = req.params.id
        console.log(id)

        if (req.file) {
            upload = await uploadImage(req.file.path)
        }
        let imageUrl;
        // console.log(book)
        if (req.file && upload) {
            // console.log(upload.secure_url);
            imageUrl = upload.secure_url;

        }

        const updatedWith = { ...req.body, imageUrl }
        console.log({ updatedWith,body:req.body })
        console.log("Update hone ja rha hai ")
        await Book.findByIdAndUpdate(id, updatedWith);
        console.log("Data Updated Successfully")
        res.status(200).send({ success: true, mgs: "Data Updated Successfully" })
    } catch (error) {
        console.log(error)
        res.status(505).send({ success: false, mgs: "Smothing went wrong" })

    }
}

async function searchBook(req, res) {

    try {
        let name = req.params.term;
        console.log(name)
        let book =await Book.find({booktitle:{$regex:name,$options:"i"}});
        console.log(book)
        res.status(200).send({ success: true, data: book })
    } catch (error) {
        res.status(400).send({ success: false, message: "something went wrong" })
    }
}
async function getBookNames(req,res){
    try{
        let books=await Book.find({},{booktitle:1});
    res.status(200).send({success:true,data:books})
    }catch(err){
        console.log(err)
        res.status(404).send({success:false,message:err})
    }
}

module.exports = {

    addBook,
    getALlBooks,
    deleteBook,
    getBookById,
    editBook,
    searchBook,
    getBookNames
}
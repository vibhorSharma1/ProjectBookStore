const { uploadImage } = require('../Config/cloudanry');
const Mobile = require('../models/Mobile');

async function getALlMobiles(req, res) {
    try {
        let mobiles = await Mobile.find({});
        //  console.log(books)
        res.status(200).send({ success: true, data: mobiles })
    } catch (error) {
        res.status(400).send({ success: false, message: "something went wrong" })
    }
}

async function addMobile(req, res) {
    console.log(req.body)
    console.log(req.file)
    try {
        let upload;


        if (req.file) {
            upload = await uploadImage(req.file.path)
        }
        let mobile = new Mobile(req.body);
        if (req.file && upload) {
            // console.log(upload.secure_url);
            mobile.image = upload.secure_url;

        }
        console.log(mobile.image)
        await mobile.save();
        res.status(200).send({ success: true, message: 'Data Saved Successfully' })
    } catch (err) {
        console.log(err);
        res.status(404).send({ success: false, message: 'Something went Wrong' })

    }
}
async function getMobileById(req, res) {
    try {
        let id = req.params.id;
        let mobile = await Mobile.findById(id);
        res.status(200).send({ success: true, data: mobile })
    } catch (error) {
        res.status(400).send({ success: false, message: "something went wrong" })
    }
}
async function deleteMobile(req, res) {
    try {
        let id = req.body.id;
        console.log(id)
        let mobile = await Mobile.findByIdAndDelete(id);
        res.status(200).send({ success: true, data: mobile })
    } catch (error) {
        res.status(400).send({ success: false, message: "something went wrong" })
    }
}

async function editMobile(req, res) {
    try {
        let upload;
        let id = req.params.id
        console.log(id)

        if (req.file) {
            upload = await uploadImage(req.file.path)
        }
        let image;
        // console.log(book)
        if (req.file && upload) {
            // console.log(upload.secure_url);
            image = upload.secure_url;

        }

        const updatedWith = { ...req.body, image }
        console.log({ updatedWith, body: req.body })
        console.log("Update hone ja rha hai ")
        await Mobile.findByIdAndUpdate(id, updatedWith);
        console.log("Data Updated Successfully")
        res.status(200).send({ success: true, mgs: "Data Updated Successfully" })
    } catch (error) {
        console.log(error)
        res.status(505).send({ success: false, mgs: "Smothing went wrong" })

    }
}
module.exports = { getALlMobiles, addMobile, getMobileById, deleteMobile, editMobile }
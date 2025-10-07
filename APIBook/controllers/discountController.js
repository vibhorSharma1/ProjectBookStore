const Discount = require('../models/discount');
async function getDiscount(req, res) {
    try {
        let discount = new Discount(req.body);
        console.log(discount)
        await discount.save();
        res.status(200).send({ success: true, message: "Discount Added Successfully" })
    } catch (error) {
        res.status(400).send({ success: false, message: error })
    }
}
async function getAllDiscount(req, res) {
    try {
        let discounts = await Discount.find({}).populate("book", "booktitle authorName originalPrice");
        discounts = discounts.map(d => ({
            ...d._doc,
            finalPrice: d.book.originalPrice - (d.discountType === "percentage"
                ? (d.book.originalPrice * d.discountValue) / 100
                : d.discountValue)
        }));

        res.status(200).send({ success: true, data: discounts })
    } catch (error) {
        res.status(400).send({ success: false, message: error })
    }
}

module.exports = {
    getDiscount,
    getAllDiscount
}



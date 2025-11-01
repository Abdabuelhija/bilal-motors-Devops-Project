const mongoose = require("mongoose");
let Car = new mongoose.Schema(
    {
        carNumber: String,
        Name: String,
        Year: String,
        Hand: Number,
        Capacity: Number,
        EntranceDate: Date,
        isSold: Boolean,
        CustomerName: String,
        SellingDate: Date,
        Notes: String,
        Img1: String,
        Img2: String,
        Img3: String,
        Img4: String,
        Price: Number,
        Km: Number,
    },
    {
        collection:"Cars",
        versionKey: false
    }
);

module.exports = mongoose.model("Cars",Car);

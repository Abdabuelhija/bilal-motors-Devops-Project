const mongoose = require("mongoose");
let Admin = new mongoose.Schema(
    {
        Email : {
            type: String,
            unique: true
        },
        Password: String
    },
    {
        collection:"Admin",
        versionKey: false
    }
);
module.exports = mongoose.model("Admin",Admin);
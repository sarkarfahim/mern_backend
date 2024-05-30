const mongoose = require("mongoose");

const SchemaDatabase = mongoose.Schema(
    {
        userID :{type:mongoose.Schema.Types.ObjectId, required:true },
        productID :{type:mongoose.Schema.Types.ObjectId, required:true },

        color: { type: String,  require: true },
        size: { type: String,  require: true },
        qtz: { type: String,  require: true },
    },
    { timestamps: true, versionKey: false }
);

const   CartslistModel = mongoose.model("carts", SchemaDatabase);

module.exports = CartslistModel;
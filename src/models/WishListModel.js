const mongoose = require("mongoose");

const SchemaDatabase = mongoose.Schema(
    {
       productID :{type:mongoose.Schema.Types.ObjectId, required:true },
        userID :{type:mongoose.Schema.Types.ObjectId, required:true },
    },
    { timestamps: true, versionKey: false }
);

const   WishListModel = mongoose.model("wishes", SchemaDatabase);

module.exports = WishListModel;
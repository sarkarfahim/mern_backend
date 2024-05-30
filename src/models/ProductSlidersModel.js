const mongoose = require("mongoose");

const SchemaDatabase = mongoose.Schema(
    {
        title: { type: String,  require: true },
        shortDes: { type: String,  require: true },
        price: {type: String,  require: true },
        image: { type: String,  require: true },
       productID:{type:mongoose.Schema.Types.ObjectId, require:true},
    },
    { timestamps: true, versionKey: false }
);

const ProductSlidersModel = mongoose.model("productsliders", SchemaDatabase);

module.exports = ProductSlidersModel;
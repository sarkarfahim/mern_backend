const mongoose = require("mongoose");

const SchemaDatabase = mongoose.Schema(
    {
        title: { type: String,  require: true },
        shortDes: { type: String,  require: true },
        price: {type: String,  require: true },
        discount: { type: Boolean,  require: true },
        discountPrice: {type: String,  require: true },
        image: { type: String,  require: true },
        stock: { type:Boolean,  require: true },
        start: { type: String,  require: true },
        remark: { type: String,  require: true },
        categoryID :{type:mongoose.Schema.Types.ObjectId, require:true},
        brandID:{type:mongoose.Schema.Types.ObjectId, require:true},
    },
    { timestamps: true, versionKey: false }
);

const ProductsModel = mongoose.model("products", SchemaDatabase);

module.exports = ProductsModel;

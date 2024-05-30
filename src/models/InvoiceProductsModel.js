const mongoose = require("mongoose");

const SchemaDatabase = mongoose.Schema(
    {
       userID :{type:mongoose.Schema.Types.ObjectId, required:true },
        invoiceID :{type:mongoose.Schema.Types.ObjectId, required:true },
        productID :{type:mongoose.Schema.Types.ObjectId, required:true },
        qtz: { type: String,  require: true },
        price: { type: String,  require: true },
       color: { type: String,  require: true },
        size: { type: String,  require: true },
    },
    { timestamps: true, versionKey: false }
);

const   InvoiceProductsModel = mongoose.model("invoiceproducts", SchemaDatabase);

module.exports = InvoiceProductsModel;